"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CartSheet } from "@/components/cart-sheet";
import { useCart } from "@/components/cart-provider";
import { useI18n } from "@/components/i18n-provider";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { items } = useCart();
    const { dict, language, setLanguage } = useI18n();

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "ar" : "en");
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="me-6 flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-xl font-bold">{dict.store}</span>
                    </Link>

                    <div className="hidden md:flex flex-1 mx-6">
                        <Search />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                        <Link href="/search?q=Men" className="text-sm font-medium hover:text-primary transition-colors">{dict.men}</Link>
                        <Link href="/search?q=Women" className="text-sm font-medium hover:text-primary transition-colors">{dict.women}</Link>
                        <Link href="/search?q=Kids" className="text-sm font-medium hover:text-primary transition-colors">{dict.kids}</Link>
                        <Link href="/search?q=Accessories" className="text-sm font-medium hover:text-primary transition-colors">{dict.accessories}</Link>

                        <div className="h-4 w-px bg-border mx-2" />

                        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-bold">
                            {language === "en" ? "عربي" : "English"}
                        </Button>

                        <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                            {dict.admin}
                        </Link>
                        <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag className="h-5 w-5" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </Button>
                        <Link href="/profile">
                            <Button variant="ghost" size="icon">
                                <UserIcon className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="font-bold">
                            {language === "en" ? "عربي" : "En"}
                        </Button>
                        <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
                            <ShoppingBag className="h-5 w-5" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </Button>
                        <button
                            className="p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-b bg-background"
                        >
                            <div className="container py-4 flex flex-col space-y-4">
                                <div className="mb-4">
                                    <Search />
                                </div>
                                <Link href="/products" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>
                                    {dict.shop}
                                </Link>
                                <Link href="/admin" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>
                                    {dict.admin}
                                </Link>
                                <Link href="/login" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={() => setIsOpen(false)}>
                                    {dict.signIn}
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
