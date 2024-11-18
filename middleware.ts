import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { URLS } from './src/config/urls'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired
  const { data: { session } } = await supabase.auth.getSession()

  // Check if accessing dashboard without auth
  if (request.nextUrl.pathname.startsWith(URLS.ADMIN.DASHBOARD)) {
    if (!session) {
      return NextResponse.redirect(new URL(URLS.AUTH.LOGIN, request.url))
    }

    // Check if user has admin role
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single()

    if (userRole?.role !== 'admin') {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL(URLS.AUTH.LOGIN, request.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
}
