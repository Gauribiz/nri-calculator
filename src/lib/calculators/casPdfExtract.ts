// Client-only PDF text extraction for the CAS diff tool, via pdfjs-dist
// (Mozilla's PDF.js). Runs entirely in the browser -- the PDF file never
// leaves the device, consistent with this site having no backend and CAS
// statements containing full portfolio holdings. Only imported dynamically
// from inside a client component's event handler, the same pattern this
// codebase already uses for jsPDF/xlsx (see DownloadResultsButton.tsx).
//
// Text-based PDFs only: this reconstructs lines from pdf.js's text-layer
// item positions, which works for the selectable/searchable text CAS PDFs
// normally are. A scanned/image-only PDF has no text layer and will
// extract to an empty string -- surfaced as a parse error, not a guess.

export class CasPdfPasswordRequiredError extends Error {
  constructor() {
    super("This PDF is password-protected.");
    this.name = "CasPdfPasswordRequiredError";
  }
}

export class CasPdfWrongPasswordError extends Error {
  constructor() {
    super("That password didn't open the PDF.");
    this.name = "CasPdfWrongPasswordError";
  }
}

export class CasPdfParseError extends Error {
  constructor(message = "Couldn't read this PDF.") {
    super(message);
    this.name = "CasPdfParseError";
  }
}

function reconstructLines(items: unknown[]): string {
  const lineBuckets = new Map<number, { x: number; str: string }[]>();

  for (const entry of items) {
    const item = entry as { str?: string; transform?: number[] };
    if (!item.str || !item.str.trim() || !item.transform) continue;
    const y = Math.round(item.transform[5]);
    const x = item.transform[4];
    const bucket = lineBuckets.get(y) ?? [];
    bucket.push({ x, str: item.str });
    lineBuckets.set(y, bucket);
  }

  const orderedYs = [...lineBuckets.keys()].sort((a, b) => b - a);
  return orderedYs
    .map((y) =>
      lineBuckets
        .get(y)!
        .sort((a, b) => a.x - b.x)
        .map((part) => part.str)
        .join(" ")
    )
    .join("\n");
}

export async function extractCasPdfText(
  file: File,
  password?: string
): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const data = await file.arrayBuffer();

  let doc;
  try {
    doc = await pdfjsLib.getDocument({ data, password }).promise;
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "PasswordException" &&
      "code" in error
    ) {
      const code = (error as unknown as { code: number }).code;
      if (code === pdfjsLib.PasswordResponses.NEED_PASSWORD) {
        throw password
          ? new CasPdfWrongPasswordError()
          : new CasPdfPasswordRequiredError();
      }
      if (code === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
        throw new CasPdfWrongPasswordError();
      }
    }
    throw new CasPdfParseError();
  }

  try {
    const pageTexts: string[] = [];
    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const page = await doc.getPage(pageNum);
      const content = await page.getTextContent();
      pageTexts.push(reconstructLines(content.items));
    }
    return pageTexts.join("\n");
  } catch {
    throw new CasPdfParseError();
  }
}
