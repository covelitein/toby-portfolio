import "./globals.css";
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Toby Gospel Iwarifgha - Mobile App Developer",
  description:
    "Portfolio of Toby Gospel Iwarifgha, a Mobile App Developer specializing in cross-platform development using Flutter.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" className="dark" suppressHydrationWarning>
    <body className={cn("antialiased bg-[#0a0a0a] text-white", inter.variable, firaCode.variable)}>
      <main className="relative z-10">{children}</main>
    </body>
  </html>
);

export default RootLayout;
