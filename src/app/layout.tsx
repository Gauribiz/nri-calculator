import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { categories } from "@/lib/categories";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NRI Calculator — US-India NRI Financial Information",
    template: "%s | NRI Calculator",
  },
  description:
    "General financial information for NRIs on the US-India corridor: DTAA & tax residency, NRE/NRO interest & TDS, investments & repatriation, and real estate capital gains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 text-sm">
            <Link href="/" className="font-semibold">
              NRI Calculator
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {category.shortTitle}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-zinc-200 px-6 py-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} NRI Calculator. General
              information only, US-India corridor.
            </p>
            <Link href="/disclaimer" className="underline hover:no-underline">
              Disclaimer
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
