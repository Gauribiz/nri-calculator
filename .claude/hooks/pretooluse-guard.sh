#!/usr/bin/env bash
#
# PreToolUse guard — the enforcement layer for the orchestrator's security
# model. This is NOT prompt instructions; it is a hook, so its deny decision
# holds even in bypass-permission modes.
#
# Claude Code invokes PreToolUse hooks with a JSON payload on stdin, e.g.:
#   {"tool_name":"Bash","tool_input":{"command":"git push origin main"}}
#   {"tool_name":"Write","tool_input":{"file_path":"financial-data-real/x.json"}}
#
# Exit code contract (Claude Code hook spec):
#   0  -> allow
#   2  -> BLOCK. stderr is surfaced back to Claude as the reason.
#   *  -> non-blocking error (treated as allow, logged as a hook failure)
#
# This script does NOT send notifications itself (a bash hook has no clean
# way to reach Gmail). It only denies + logs to violations.log. The routine's
# own CLAUDE.md instructs the orchestrator to check that log at the end of
# each run and draft a Gmail summary via the Gmail MCP tool if it's non-empty.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DENY_FILE="$SCRIPT_DIR/deny-patterns.json"
LOG_FILE="$SCRIPT_DIR/violations.log"

INPUT_JSON="$(cat)"

TOOL_NAME=$(echo "$INPUT_JSON" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT_JSON" | jq -r '.tool_input.command // empty')
FILE_PATH=$(echo "$INPUT_JSON" | jq -r '.tool_input.file_path // .tool_input.path // empty')

block() {
  local id="$1" reason="$2" matched_on="$3"
  echo "$(date -u +%FT%TZ) | tool=$TOOL_NAME | rule=$id | matched=\"$matched_on\" | reason=$reason" >> "$LOG_FILE"
  echo "BLOCKED by PreToolUse guard [$id]: $reason" >&2
  exit 2
}

# --- Bash command checks ---
# v3: field extraction no longer combines id/pattern/reason into one
# delimited string at all. v1's `@tsv` double-escaped backslashes so
# every \s/\b pattern silently stopped matching. v2 switched to
# join("") + IFS=$'\x01' read, which fixed the escaping but
# silently extracted nothing on stock macOS bash 3.2.57 -- 0x01 is
# CTLESC, a byte bash's own word-expansion machinery treats specially,
# so field-splitting on it does not behave the same as any other IFS
# byte on that build. v3 avoids delimiter/IFS parsing entirely: index
# into the deny-list by position and pull each field with its own jq
# call. Slightly more subprocesses, but there is nothing left for any
# shell's internals to silently mishandle.
if [[ "$TOOL_NAME" == "Bash" && -n "$COMMAND" ]]; then
  BASH_PATTERN_COUNT=$(jq '.bash_deny_patterns | length' "$DENY_FILE")
  for ((_i = 0; _i < BASH_PATTERN_COUNT; _i++)); do
    pattern=$(jq -r ".bash_deny_patterns[$_i].pattern" "$DENY_FILE")
    [[ -z "$pattern" || "$pattern" == "null" ]] && continue
    if echo "$COMMAND" | grep -qiE "$pattern"; then
      id=$(jq -r ".bash_deny_patterns[$_i].id" "$DENY_FILE")
      reason=$(jq -r ".bash_deny_patterns[$_i].reason" "$DENY_FILE")
      block "$id" "$reason" "$COMMAND"
    fi
  done

  # Supabase migrations: handled here, not via regex lookahead, because
  # negative lookahead ((?!...)) is PCRE-only and breaks under plain ERE
  # grep (GNU grep -E, BSD grep, and ugrep all reject it in -E mode).
  # Rule: any supabase db push/reset/migration is blocked UNLESS the
  # command explicitly references "staging".
  if echo "$COMMAND" | grep -qiE "supabase[[:space:]]+(db[[:space:]]+(push|reset)|migration[[:space:]]+(up|repair))"; then
    if ! echo "$COMMAND" | grep -qi "staging"; then
      block "supabase-prod-migration" "Production Supabase migration/reset requires explicit human approval. Only commands referencing staging are allowed unattended." "$COMMAND"
    fi
  fi
fi

# --- File path checks (Write / Edit / Read tools) ---
if [[ -n "$FILE_PATH" ]]; then
  FILE_PATTERN_COUNT=$(jq '.file_path_deny_patterns | length' "$DENY_FILE")
  for ((_i = 0; _i < FILE_PATTERN_COUNT; _i++)); do
    pattern=$(jq -r ".file_path_deny_patterns[$_i].pattern" "$DENY_FILE")
    [[ -z "$pattern" || "$pattern" == "null" ]] && continue
    if echo "$FILE_PATH" | grep -qiE "$pattern"; then
      id=$(jq -r ".file_path_deny_patterns[$_i].id" "$DENY_FILE")
      reason=$(jq -r ".file_path_deny_patterns[$_i].reason" "$DENY_FILE")
      block "$id" "$reason" "$FILE_PATH"
    fi
  done
fi

exit 0
