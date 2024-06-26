import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Website para gerenciar tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="pt-br" suppressHydrationWarning>
        <body className={cn("antialiased min-h-screen", inter.className)}>
          {children}
          <Toaster richColors closeButton />
        </body>
      </html>
    </QueryProvider>
  );
}
