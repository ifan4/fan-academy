// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.



    function middleware(req:any) {
    
    // console.log("token: ", req.nextauth.token.role.id);
    
    
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role?.id !== 1){
        return NextResponse.redirect(
            new URL("/auth/login?message=You Are Not Authorized!", req.url)
        );
    }
    else if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth){
        return NextResponse.redirect(
            new URL("/auth/login?message=You Are Not Authorized!", req.url)
        );
    }
    else if (req.nextUrl.pathname.startsWith("/myData") && (req.nextauth.token?.role?.id === 1 || req.nextauth.token?.role?.id === 2  ) ){
        return NextResponse.next();
    }
    else{
        return NextResponse.next();
    }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
  matcher: ["/admin/:path*", "/myData/:path*", "/dashboard/:path*"],
};
