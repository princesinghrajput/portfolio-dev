import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

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
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building beautiful, performant, and scalable applications.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Prince Kumar" }],
  openGraph: {
    title: "Prince Kumar | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
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
