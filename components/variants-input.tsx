"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface Variant {
    name: string;
    values: string; // Comma separated values
}

export function VariantsInput({ onUpdate }: { onUpdate: (variants: string) => void }) {
    const [variants, setVariants] = useState<Variant[]>([]);

    const addVariant = () => {
        setVariants([...variants, { name: "", values: "" }]);
    };

    const removeVariant = (index: number) => {
        const newVariants = [...variants];
        newVariants.splice(index, 1);
        setVariants(newVariants);
        onUpdate(JSON.stringify(newVariants));
    };

    const updateVariant = (index: number, field: keyof Variant, value: string) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
        onUpdate(JSON.stringify(newVariants));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Variants (e.g. Size, Color)</label>
                <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                    <Plus className="h-4 w-4 mr-2" /> Add Variant
                </Button>
            </div>
            {variants.map((variant, index) => (
                <div key={index} className="flex gap-2 items-start">
                    <Input
                        placeholder="Name (e.g. Size)"
                        value={variant.name}
                        onChange={(e) => updateVariant(index, "name", e.target.value)}
                        className="w-1/3"
                    />
                    <Input
                        placeholder="Values (e.g. S, M, L)"
                        value={variant.values}
                        onChange={(e) => updateVariant(index, "values", e.target.value)}
                        className="flex-1"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
