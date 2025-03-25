import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;
  
  // Determine destination based on hostname
  if (hostname === 'test-b2c.petermenocal.com') {
    // Avoid rewriting already rewritten paths
    if (!pathname.startsWith('/b2c')) {
      const url = request.nextUrl.clone();
      url.pathname = `/b2c${pathname}`;
      return NextResponse.rewrite(url);
    }
  } else if (hostname === 'test-b2b.petermenocal.com') {
    if (!pathname.startsWith('/b2b')) {
      const url = request.nextUrl.clone();
      url.pathname = `/b2b${pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}