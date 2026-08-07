import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  // L'authentification est temporairement désactivée
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
