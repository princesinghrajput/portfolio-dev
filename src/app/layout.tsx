import type { Metadata } from "next";
import { Rubik, Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import GlobalCursor from "@/components/GlobalCursor";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: '--font-quicksand',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: '--font-rubik',
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
    <html lang="en" suppressHydrationWarning className={`${quicksand.variable} ${rubik.variable}`}>
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
