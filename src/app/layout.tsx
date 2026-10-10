import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { ClientShell } from "@/components/layout/ClientShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusHustle | Nigeria's #1 Student Campus Marketplace & Escrow",
  description: "Discover verified student products, services, and trainings on your campus with Paystack Escrow protection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-surface-light text-stone-900 dark:bg-surface-dark dark:text-stone-100`}>
        <AppProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </AppProvider>
      </body>
    </html>
  );
}
