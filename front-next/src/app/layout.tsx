import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/components/sidebar";
import { ClientToaster } from "@/components/client-toaster";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desafio Muralis",
  description: "Feito com Next JS",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${inter.variable} antialiased bg-zinc-50 flex flex-col md:flex-row`} cz-shortcut-listen="false">
            <SideBar />
              <div className="w-full">
                {children}
              </div>
            <ClientToaster />
        </body>
      </ReactQueryProvider>
    </html>
  );
}
