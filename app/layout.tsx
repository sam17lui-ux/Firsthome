import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FirstHome",
  description: "Your trusted companion for buying your first home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans [--font-geist-sans:system-ui,-apple-system,sans-serif] [--font-geist-mono:ui-monospace,monospace]">
        {children}
      </body>
    </html>
  );
}
