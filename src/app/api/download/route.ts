import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  if (!code) {
    return new NextResponse('Code manquant', { status: 400 })
  }
  
  const access = await prisma.access.findFirst({
    where: { password: code },
    include: { document: true }
  })
  
  if (!access || !access.document.url) {
    return new NextResponse('Code invalide ou document introuvable', { status: 403 })
  }
  
  return NextResponse.redirect(access.document.url)
}
