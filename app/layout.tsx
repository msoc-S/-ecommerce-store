import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/components/cart-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Store",
    description: "Premium E-Commerce Store",
};

import { I18nProvider } from "@/components/i18n-provider";
import { AlertProvider } from "@/components/alert-provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
                <I18nProvider>
                    <AlertProvider>
                        <CartProvider>
                            <Navbar />
                            <main className="flex-1">
                                {children}
                            </main>
                        </CartProvider>
                    </AlertProvider>
                </I18nProvider>
            </body>
        </html>
    );
}
