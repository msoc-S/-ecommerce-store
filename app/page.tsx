import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/hero-section";
import { ProductGridHeader } from "@/components/product-grid-header";
import { ProductCard } from "@/components/product-card";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        include: { discounts: true },
    });

    return (
        <main className="min-h-screen bg-background">
            <HeroSection />

            <section className="container py-12 space-y-8">
                <ProductGridHeader />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} isAuthenticated={!!session?.user} />
                    ))}
                </div>
            </section>
        </main>
    );
}
