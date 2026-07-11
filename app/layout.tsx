import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PeptideScaling — Growth Marketing Agency",
  description:
    "The only performance marketing agency built specifically for peptide brands and telehealth peptide clinics.",
  openGraph: {
    title: "PeptideScaling — Growth Marketing Agency",
    description:
      "The only performance marketing agency built specifically for peptide brands and telehealth peptide clinics.",
    siteName: "PeptideScaling",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
