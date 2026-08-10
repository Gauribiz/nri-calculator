import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { categories } from "@/lib/categories";
import BackToTop from "@/components/BackToTop";
import SiteSearch from "@/components/SiteSearch";
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-stone-200 bg-white dark:border-primary-900 dark:bg-primary-950">
          <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4 text-sm">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-semibold tracking-tight text-primary-900 dark:text-primary-50"
            >
              NRI Calculator
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-gold-500"
              />
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="text-stone-600 transition-colors hover:text-primary-800 dark:text-primary-200/70 dark:hover:text-primary-50"
              >
                {category.shortTitle}
              </Link>
            ))}
            <Link
              href="/blog"
              className="text-stone-600 transition-colors hover:text-primary-800 dark:text-primary-200/70 dark:hover:text-primary-50"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-stone-600 transition-colors hover:text-primary-800 dark:text-primary-200/70 dark:hover:text-primary-50"
            >
              FAQ
            </Link>
            <Link
              href="/tools"
              className="text-stone-600 transition-colors hover:text-primary-800 dark:text-primary-200/70 dark:hover:text-primary-50"
            >
              Tools
            </Link>
            <div className="ml-auto">
              <SiteSearch />
            </div>
          </nav>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-stone-200 bg-white px-6 py-6 text-sm text-stone-500 dark:border-primary-900 dark:bg-primary-950 dark:text-primary-200/60">
          <div className="mx-auto flex max-w-4xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} NRI Calculator. General
              information only, US-India corridor.
            </p>
            <Link
              href="/disclaimer"
              className="text-gold-700 underline hover:no-underline dark:text-gold-300"
            >
              Disclaimer
            </Link>
          </div>
        </footer>
        <BackToTop />
      </body>
    </html>
  );
}
