import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function InvoicePage({ params }: { params: { id: string } }) {
    const order = await prisma.order.findUnique({
        where: { id: params.id },
        include: { user: true, items: { include: { product: true } } },
    });

    if (!order) return notFound();

    return (
        <div className="container max-w-3xl py-10 bg-white text-black min-h-screen">
            <div className="flex justify-between items-start border-b pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">INVOICE</h1>
                    <p className="text-gray-500 mt-2">#{order.id.slice(0, 8)}</p>
                </div>
                <div className="text-right">
                    <h2 className="font-bold text-xl">Store Name</h2>
                    <p className="text-sm text-gray-500">123 Commerce St.</p>
                    <p className="text-sm text-gray-500">City, Country</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="font-bold mb-2">Bill To:</h3>
                    <p>{order.user.name || "Guest"}</p>
                    <p>{order.user.email}</p>
                    <p>{order.user.phone}</p>
                    <p>{order.shippingAddress || "No address provided"}</p>
                </div>
                <div className="text-right">
                    <h3 className="font-bold mb-2">Order Details:</h3>
                    <p>Date: {order.createdAt.toLocaleDateString()}</p>
                    <p>Status: {order.status}</p>
                </div>
            </div>

            <table className="w-full mb-8">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="text-left py-2">Item</th>
                        <th className="text-center py-2">Quantity</th>
                        <th className="text-right py-2">Price</th>
                        <th className="text-right py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="py-2">
                                <p className="font-medium">{item.product.title}</p>
                            </td>
                            <td className="text-center py-2">{item.quantity}</td>
                            <td className="text-right py-2">{formatCurrency(item.price)}</td>
                            <td className="text-right py-2">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end">
                <div className="w-1/3 space-y-2">
                    <div className="flex justify-between font-bold text-xl border-t-2 border-black pt-2">
                        <span>Total</span>
                        <span>{formatCurrency(order.total)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-20 text-center text-sm text-gray-500 print:hidden">
                <p>Press Cmd+P or Ctrl+P to print this invoice.</p>
            </div>
        </div>
    );
}
