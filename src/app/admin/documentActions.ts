'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'
import QRCode from 'qrcode'

const UPLOAD_DIR = join(process.cwd(), 'private_uploads')

const ensureUploadDir = async () => {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
  } catch (error) {}
}

export async function uploadDocument(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) return;
  
  await ensureUploadDir()
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const uniqueFilename = `${crypto.randomUUID()}-${file.name}`
  const filepath = join(UPLOAD_DIR, uniqueFilename)
  
  await writeFile(filepath, buffer)
  
  await prisma.document.create({
    data: {
      name: file.name,
      filename: uniqueFilename,
      mimetype: file.type,
      size: file.size,
    }
  })
  
  revalidatePath('/admin')
}

export async function generateAccess(documentId: string, host: string) {
  const password = crypto.randomBytes(3).toString('hex').toUpperCase()
  
  await prisma.access.create({
    data: {
      documentId,
      password,
    }
  })
  
  revalidatePath('/admin')
}

export async function deleteDocument(documentId: string) {
  await prisma.document.delete({
    where: { id: documentId }
  })
  revalidatePath('/admin')
}
