import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const email = "admin@store.com";
        const password = await bcrypt.hash("admin123", 10);

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                password,
                name: "Super Admin",
                role: "SUPER_ADMIN",
                phone: "070000000",
                address: "Admin HQ"
            }
        });

        return NextResponse.json({ message: "Admin created", user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
