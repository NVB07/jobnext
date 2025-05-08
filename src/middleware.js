import { NextResponse } from "next/server";

export function middleware(request) {
    const currentUser = request.cookies.get("accessToken")?.value;
    const protectedRoutes = ["/user", "/jobs", "/new-blog", "/cv"];
    const url = request.nextUrl.clone();

    const isProtected = protectedRoutes.some((route) => url.pathname.startsWith(route));

    if (!currentUser && isProtected) {
        url.pathname = "/login";
        url.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    if (currentUser && url.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*", "/jobs/:path*", "/new-blog", "/login", "/cv"],
};
