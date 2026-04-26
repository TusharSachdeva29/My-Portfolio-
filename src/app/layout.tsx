import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProviderElement from "@/lib/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PortFolio",
  description: "Tushar-PortFolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProviderElement>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" className="rounded-full"/>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <div className="w-full bg-yellow-400 text-black text-center py-4 px-2 text-xl sm:text-2xl font-black uppercase tracking-wider shadow-lg border-b-4 border-yellow-600">
            ⚠️ Warning: This portfolio has been under construction for 2 years… expected completion before my B.Tech degree expires. ,,
          </div> */}
          {children}
        </body>
      </html>
    </ProviderElement>
  );
}
