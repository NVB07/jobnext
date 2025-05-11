import { NextResponse } from "next/server";

export function middleware(request) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const uid = request.cookies.get("uid")?.value;
    const protectedRoutes = ["/user", "/jobs", "/new-blog", "/cv"];
    const url = request.nextUrl.clone();

    const isProtected = protectedRoutes.some((route) => url.pathname.startsWith(route));

    if (!accessToken && isProtected) {
        url.pathname = "/login";
        url.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }
    if (accessToken && url.pathname.startsWith("/user") && url.pathname.endsWith("/update")) {
        const pathSegments = url.pathname.split("/");
        const uidPathName = pathSegments[2];

        if (uidPathName && uidPathName !== uid) {
            return NextResponse.redirect(new URL(`/user/${uid}/update`, request.url));
        }
    }
    if (accessToken && url.pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path*", "/jobs/:path*", "/new-blog", "/login", "/cv"],
};
