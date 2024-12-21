import { canViewOrganization } from "@/permissions";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORGANIZATION_ACCEPT_INVITE_ROUTE,
  ORGANIZATION_ROUTE,
  SEARCH_ROUTE,
  SIGN_UP_ROUTE,
} from "@/routes";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(
  request: NextRequest,
  response: NextResponse,
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Redirect root '/' to '/nova-pesquisa' if user is logged in
  if (pathname === HOME_ROUTE.url && user) {
    const url = request.nextUrl.clone();
    url.pathname = SEARCH_ROUTE.url;
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to the login page
  if (
    !user &&
    !pathname.includes(LOGIN_ROUTE.url) &&
    !pathname.includes(SIGN_UP_ROUTE.url) &&
    !pathname.includes(ORGANIZATION_ACCEPT_INVITE_ROUTE.url) &&
    !pathname.includes("/api/organizations/accept-invite")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_ROUTE.url;
    return NextResponse.redirect(url);
  }

  // Restrict access to '/internal' route to super admin users
  if (
    request.nextUrl.pathname.startsWith("/internal") &&
    !(user?.user_metadata?.is_super_admin === true)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = SEARCH_ROUTE.url;
    return NextResponse.redirect(url);
  }

  if (
    pathname.includes(ORGANIZATION_ROUTE.url) &&
    !canViewOrganization(user?.user_metadata.current_organization.role)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = SEARCH_ROUTE.url;

    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return response;
}
