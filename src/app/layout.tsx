import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastContainer } from "@/components/layout/ToastContainer";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Green Bites | Fresh Corporate Lunch & Grocery Delivery",
  description: "Blinkit-inspired daily lunch & fresh grocery delivery with corporate allowance auto-deduction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8FAF9] text-slate-900 selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
};
