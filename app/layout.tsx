import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PeptideScaling — Performance Marketing for Peptide Brands & Telehealth Clinics",
  description:
    "Performance marketing agency for RUO peptide brands and telehealth clinics. We scale ad campaigns, fix banned accounts, and build compliant infrastructure that survives Meta restrictions.",
  keywords: [
    "peptide marketing agency",
    "RUO peptide ads",
    "telehealth marketing",
    "medspa advertising",
    "Meta ads for peptide brands",
    "peptide scaling",
  ],
  openGraph: {
    title: "PeptideScaling — Performance Marketing for Peptide Brands & Telehealth Clinics",
    description:
      "Performance marketing agency for RUO peptide brands and telehealth clinics. We scale ad campaigns, fix banned accounts, and build compliant infrastructure.",
    siteName: "PeptideScaling",
    url: "https://www.peptidescaling.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeptideScaling — Performance Marketing for Peptide Brands & Telehealth Clinics",
    description:
      "Performance marketing agency for RUO peptide brands and telehealth clinics.",
  },
  robots: {
    index: true,
    follow: true,
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
