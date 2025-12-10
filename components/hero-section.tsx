"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";

export function HeroSection() {
    const { dict } = useI18n();

    return (
        <section className="relative overflow-hidden bg-background py-20 md:py-32">
            <div className="container flex flex-col items-center text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    {dict.storeName} <br className="hidden sm:inline" />
                    {dict.storeSlogan}
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    {dict.storeDesc}
                </p>
                <div className="flex gap-4">
                    <Button size="lg" className="rounded-full px-8">
                        {dict.shopNow}
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full px-8">
                        {dict.learnMore}
                    </Button>
                </div>
            </div>
        </section>
    );
}
