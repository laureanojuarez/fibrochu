"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "./store";

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
    <Provider store={store}>
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased grid min-h-screen grid-rows-[auto,1fr,auto]`}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
