import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value || request.cookies.get('accessToken')?.value;
  
  if (!token && !request.nextUrl.pathname.startsWith('/login') && request.nextUrl.pathname !== '/') {
    const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL || 'http://localhost:3001/login';
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
