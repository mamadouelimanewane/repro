import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { join } from 'path'
import { readFile } from 'fs/promises'

const UPLOAD_DIR = join(process.cwd(), 'private_uploads')

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
  
  if (!access) {
    return new NextResponse('Code invalide', { status: 403 })
  }
  
  const document = access.document
  const filePath = join(UPLOAD_DIR, document.filename)
  
  try {
    const fileBuffer = await readFile(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': document.mimetype,
        'Content-Disposition': `attachment; filename="${document.name}"`,
      }
    })
  } catch (error) {
    return new NextResponse('Erreur de lecture du fichier', { status: 500 })
  }
}
