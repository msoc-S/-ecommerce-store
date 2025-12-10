"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { BuyButton } from "@/components/buy-button";
import { useI18n } from "@/components/i18n-provider";
import { calculatePrice } from "@/lib/price";

interface ProductCardProps {
    product: any; // Using any for simplicity, but should be typed properly
    isAuthenticated: boolean;
}

export function ProductCard({ product, isAuthenticated }: ProductCardProps) {
    const { dict } = useI18n();
    const { finalPrice, originalPrice } = calculatePrice(product.price, product.discounts);

    return (
        <Link href={`/products/${product.id}`} className="group relative rounded-xl bg-card border transition-all hover:shadow-lg overflow-hidden">
            <div className="aspect-square overflow-hidden bg-muted/20 relative">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                {originalPrice && (
                    <div className="absolute top-2 end-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
                        {dict.sale}
                    </div>
                )}
            </div>
            <div className="p-4 space-y-2">
                <h3 className="font-semibold leading-none tracking-tight">{product.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="font-medium">{formatCurrency(finalPrice)}</span>
                        {originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">{formatCurrency(originalPrice)}</span>
                        )}
                    </div>
                    <BuyButton product={product} isAuthenticated={isAuthenticated} />
                </div>
            </div>
        </Link>
    );
}
