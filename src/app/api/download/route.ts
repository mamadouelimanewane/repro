import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const docId = searchParams.get('id')
  
  if (!docId) {
    return new NextResponse('ID manquant', { status: 400 })
  }
  
  const document = await prisma.document.findUnique({
    where: { id: docId }
  })
  
  if (!document || !document.url) {
    return new NextResponse('Document introuvable', { status: 404 })
  }
  
  return NextResponse.redirect(document.url)
}
