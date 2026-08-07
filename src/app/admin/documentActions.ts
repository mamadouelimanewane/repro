'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import crypto from 'crypto'
import { put, del } from '@vercel/blob'

export async function saveDocumentToDb(data: { name: string, url: string, mimetype: string, size: number }) {
  await prisma.document.create({
    data: {
      name: data.name,
      filename: data.name,
      url: data.url,
      mimetype: data.mimetype,
      size: data.size,
    }
  })
  revalidatePath('/admin')
  revalidatePath('/')
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
  const doc = await prisma.document.findUnique({ where: { id: documentId } })
  if (doc?.url) {
    try {
      await del(doc.url)
    } catch (e) {
      // Ignore if blob already deleted
    }
  }
  await prisma.document.delete({
    where: { id: documentId }
  })
  revalidatePath('/admin')
}
