"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { createOrder } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { useAlert } from "@/components/alert-provider";
import { getAddresses } from "@/actions/profile";
import { AddressManager } from "@/components/profile/address-manager";
import { Address } from "@prisma/client";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentPhone, setPaymentPhone] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const { showAlert } = useAlert();

    useEffect(() => {
        getAddresses().then(setAddresses);
    }, []);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedAddress = addresses.find(a => a.id === selectedAddressId);
        if (!selectedAddress) {
            showAlert({
                title: "Error",
                message: "Please select a shipping address.",
                type: "error"
            });
            return;
        }

        setLoading(true);

        const fullAddress = `${selectedAddress.label}: ${selectedAddress.state}, ${selectedAddress.city}, ${selectedAddress.landmark || ''} ${selectedAddress.notes ? `(${selectedAddress.notes})` : ''}`;

        try {
            await createOrder(
                items.map(i => ({ productId: i.productId, quantity: i.quantity })),
                paymentPhone,
                fullAddress,
                recipientName
            );
            setSuccess(true);
            clearCart();
        } catch (error) {
            showAlert({
                title: "Error",
                message: "Order failed. Please try again.",
                type: "error"
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container py-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-4xl">🎉</span>
                </div>
                <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
                <p className="text-muted-foreground">Your order is pending payment verification.</p>
                <p className="text-sm">We will notify you once we verify your transfer.</p>
                <Button asChild className="mt-4">
                    <a href="/orders">View My Orders</a>
                </Button>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button asChild><a href="/">Go Shopping</a></Button>
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-4xl grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span>{item.title} x {item.quantity}</span>
                                <span>{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Payment Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                            {/* Placeholder for Barcode */}
                            <div className="h-24 w-full bg-black/10 flex items-center justify-center mb-2">
                                <span className="font-mono tracking-widest text-xl">||| |||| || |||||</span>
                            </div>
                            <p className="font-mono font-bold text-lg">MasterCard: 5555-4444-3333-2222</p>
                        </div>
                        <div className="text-sm text-blue-800 space-y-2">
                            <p>1. Transfer the total amount to the MasterCard above.</p>
                            <p>2. Take a screenshot of the transfer.</p>
                            <p>3. Send the screenshot to WhatsApp: <strong>070000000</strong></p>
                            <p>4. Enter the phone number you sent the message from below.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Checkout Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Recipient Name</label>
                                <Input
                                    required
                                    placeholder="Who is receiving this order?"
                                    value={recipientName}
                                    onChange={e => setRecipientName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Shipping Address</label>
                                <AddressManager
                                    addresses={addresses}
                                    onSelect={(addr) => setSelectedAddressId(addr.id)}
                                    selectedId={selectedAddressId}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Sender Phone Number</label>
                                <Input
                                    required
                                    placeholder="The number you used for WhatsApp"
                                    value={paymentPhone}
                                    onChange={e => setPaymentPhone(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">We use this to verify your payment.</p>
                            </div>

                            <Button className="w-full" size="lg" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Complete Order"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
