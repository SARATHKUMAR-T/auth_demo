// import { NextResponse } from "next/server";

import { auth } from "./auth"


// export function middleware(request) {

//   return NextResponse.redirect(new URL("/about", request.url))

// }
// if (session?.user?.email && request.nextUrl.pathname == '/login') {
//   return NextResponse.redirect(new URL("/account", request.url))
// }

export { auth as middleware } from "@/auth"
export const config = {
  matcher: ["/account", "/login"]
}


