import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastContainer } from "@/components/layout/ToastContainer";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: "DC Stores | Aesthetic Tumblers, Stationery, Books & Gifts (Shajapur, MP)",
  description: "A Product by Anuradha Mehta Enterprises. Shop aesthetic tumblers, leather journals, books, and gift hampers with 30-45 mins express delivery in Shajapur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-slate-900 selection:bg-[#d4af37] selection:text-[#0F1219] pb-20 md:pb-0">
        <AppProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
          <MobileBottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
