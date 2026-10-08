import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { GITHUB_USER } from "@/lib/site";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${GITHUB_USER.toLowerCase()}.github.io`),
  title: "Durjoy Saha — AI/ML student who ships",
  description:
    "Portfolio of Durjoy Saha: audio deepfake and vishing detection research, applied NLP, and LLM tooling. Final-year CSE student in Dhaka, open to ML and backend internships.",
  openGraph: {
    title: "Durjoy Saha — AI/ML student who ships",
    description:
      "Audio deepfake detection research, applied NLP and LLM tooling. Final-year CSE student, open to ML and backend internships.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${grotesk.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full text-fg">{children}</body>
    </html>
  );
}
