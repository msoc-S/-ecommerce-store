import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container py-10 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Image</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle">
                                        <img src={product.imageUrl} alt={product.title} className="h-10 w-10 rounded-md object-cover" />
                                    </td>
                                    <td className="p-4 align-middle font-medium">{product.title}</td>
                                    <td className="p-4 align-middle">{formatCurrency(product.price)}</td>
                                    <td className="p-4 align-middle">{product.stock}</td>
                                    <td className="p-4 align-middle">
                                        <form action={deleteProduct.bind(null, product.id)}>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
