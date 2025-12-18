import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * Seed Route - Creates Super Admin User
 * مسار إنشاء السوبر أدمن
 * 
 * Access this route after deployment to create your first admin user:
 * استخدم هذا المسار بعد النشر لإنشاء أول مستخدم أدمن:
 * GET /api/seed
 */
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
            }
        });

        return NextResponse.json({
            success: true,
            message: "✅ Super Admin user created successfully!",
            credentials: {
                email: "admin@store.com",
                password: "admin123",
                note: "⚠️ Please change the password after first login!"
            },
            accessUrls: {
                login: "/api/auth/signin",
                adminDashboard: "/admin",
                superAdminDashboard: "/admin/super"
            },
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            tip: "Make sure DATABASE_URL is correctly set in environment variables"
        }, { status: 500 });
    }
}
