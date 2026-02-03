import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import GlobalCursor from "@/components/GlobalCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Prince Kumar | Full Stack Developer",
  description: "A calm, curious engineer who enjoys building systems, studying people and cultures, and exploring ideas beyond the obvious. Full Stack Developer specializing in React, Next.js, Node.js.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Portfolio", "Prince Kumar"],
  authors: [{ name: "Prince Kumar" }],
  openGraph: {
    title: "Prince Kumar | Full Stack Developer",
    description: "A calm, curious engineer who enjoys building systems, studying people and cultures, and exploring ideas beyond the obvious.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-background min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Cursor + Pet - desktop only */}
          <GlobalCursor />

          <Toaster />
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
