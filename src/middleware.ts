// =====================================================
// The Hub - Middleware
// للتحكم في الوصول والـ Authentication
// =====================================================

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// =====================================================
// المسارات المحمية (تحتاج تسجيل دخول)
// =====================================================
const protectedRoutes = [
    '/admin',
    '/profile',
    '/booking',
    '/store',
    '/tools/somaida',
    '/tools/notes',
];

// =====================================================
// مسارات الأدمن فقط
// =====================================================
const adminRoutes = ['/admin'];

// =====================================================
// مسارات السوبر أدمن فقط
// =====================================================
const superAdminRoutes = [
    '/admin/employees',
    '/admin/statistics',
    '/admin/settings',
];

// =====================================================
// Middleware Function
// =====================================================
// =====================================================
// Middleware Function (Auth Disabled)
// =====================================================
export async function middleware(request: NextRequest) {
    return NextResponse.next();
}

// =====================================================
// Config - المسارات التي تطبق عليها الـ Middleware
// =====================================================
export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         * - api routes (API)
         */
        '/((?!_next/static|_next/image|favicon.ico|icons|images|sw.js|manifest.json|offline.html).*)',
    ],
};
