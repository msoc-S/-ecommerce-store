import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import Link from "next/link";

async function getStats() {
    const productCount = await prisma.product.count();
    const orderCount = await prisma.order.count();
    const userCount = await prisma.user.count();
    const totalRevenue = await prisma.order.aggregate({
        _sum: {
            total: true,
        },
    });

    return {
        productCount,
        orderCount,
        userCount,
        totalRevenue: totalRevenue._sum.total || 0,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="container py-10 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">
                            Lifetime revenue
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.productCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Active products
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.orderCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Total orders placed
                        </p>
                    </CardContent>
                </Card>
                <Link href="/admin/users">
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.userCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Registered accounts
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div >
    );
}
