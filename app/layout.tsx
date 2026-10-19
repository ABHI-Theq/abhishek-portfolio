import type { Metadata } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// ── Fonts (next/font — no runtime third-party requests) ────────
const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ── Default Metadata ───────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://abhisheksharma.dev"),
  title: {
    default: "Abhishek Sharma — Software Developer & AI Enthusiast",
    template: "%s | Abhishek Sharma",
  },
  description:
    "Portfolio of Abhishek Sharma — full-stack developer and AI enthusiast building intelligent systems and developer tools.",
  openGraph: {
    title: "Abhishek Sharma — Software Developer & AI Enthusiast",
    description:
      "Portfolio of Abhishek Sharma — full-stack developer and AI enthusiast building intelligent systems and developer tools.",
    url: "https://abhisheksharma.dev",
    siteName: "Abhishek Sharma",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhishek Sharma — Software Developer & AI Enthusiast",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// ── Root Layout ────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-main text-text-primary antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
