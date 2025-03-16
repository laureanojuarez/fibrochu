import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import CartTab from "@/components/Cart/CartTab";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen justify-between`}
      >
        <Suspense>
          <CartProvider>
            <Header />
            <CartTab />
            {children}
            <Footer />
          </CartProvider>
        </Suspense>
      </body>
    </html>
  );
}
