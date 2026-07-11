import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  
  title: "PeptideScaling — Performance Marketing for Peptide Brands & Telehealth Clinics",
  description:
    "Performance marketing agency for RUO peptide brands and telehealth clinics. We scale ad campaigns, fix banned accounts, and build compliant infrastructure that survives Meta restrictions.",
  keywords: [
  // Core service keywords
  "peptide marketing agency",
  "peptide performance marketing",
  "peptide brand scaling",
  "RUO peptide ads",
  "RUO brand marketing",
  "RUO peptide marketing agency",
  
  // Banned account keywords (high intent)
  "banned Meta ad account recovery",
  "Meta ad account banned peptide",
  "Facebook ad account banned recovery",
  "restore banned Facebook ad account",
  "peptide Facebook ads banned",
  "Meta account disabled peptide brand",
  "how to run ads after ban",
  
  // Telehealth & clinic keywords
  "telehealth marketing agency",
  "telehealth peptide clinic ads",
  "medspa advertising agency",
  "medspa patient acquisition",
  "medspa performance marketing",
  "peptide clinic marketing",
  "telehealth clinic scaling",
  "medspa Meta ads",
  "peptide therapy marketing",
  "compounded peptide marketing",
  
  // Compliance keywords
  "compliant peptide advertising",
  "peptide ad compliance",
  "LegitScript peptide marketing",
  "compliant medspa ads",
  "gray market peptide marketing",
  "peptide marketing compliance",
  
  // Performance & scaling keywords
  "scale peptide brand",
  "peptide ecommerce scaling",
  "peptide revenue growth",
  "peptide brand growth agency",
  "peptide paid media agency",
  "peptide funnel optimization",
  "peptide conversion optimization",
  "peptide lead generation",
  
  // Meta/Facebook specific
  "Meta ads peptide brand",
  "Facebook ads medspa",
  "Meta ads telehealth",
  "peptide Facebook marketing",
  "Meta ads banned account help",
  "run peptide ads on Meta",
  
  // Competitor/comparison keywords
  "best peptide marketing agency",
  "top peptide advertising agency",
  "peptide agency USA",
  "peptide marketing expert",
  "hire peptide marketing agency",
  
  // Problem-aware keywords
  "peptide ads keep getting banned",
  "how to advertise peptides online",
  "peptide brand cant run ads",
  "alternative to Meta ads peptides",
  "peptide advertising solutions",
  "peptide marketing without getting banned",
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
  verification: {
  google: "1eEVPZwrGHpNGtSOU4vrRZ5F94fpTSx-d03o2v8vR98",
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
