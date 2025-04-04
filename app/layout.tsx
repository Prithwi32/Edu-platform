import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduLearn - Educational Platform",
  description: "Modern educational platform for JEE/NEET preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            containerId="toast-container"
            style={{ zIndex: 9999 }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Providers } from "./providers";
