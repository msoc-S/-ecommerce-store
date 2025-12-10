import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const envCheck = {
            hasAuthSecret: !!process.env.AUTH_SECRET,
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            databaseUrlStart: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 10) + "..." : "MISSING",
            nodeEnv: process.env.NODE_ENV,
        };

        // Try to connect to DB
        let dbStatus = "Checking...";
        let userCount = -1;
        try {
            userCount = await prisma.user.count();
            dbStatus = "Connected ✅";
        } catch (e: any) {
            dbStatus = "Failed ❌: " + e.message;
        }

        return NextResponse.json({
            status: "Diagnostic Report",
            environment: envCheck,
            database: {
                status: dbStatus,
                userCount,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "Critical Failure",
            error: error.message,
        }, { status: 500 });
    }
}
