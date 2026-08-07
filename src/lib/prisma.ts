import { PrismaClient } from '@prisma/client'
import Database from 'better-sqlite3'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'path'

const prismaClientSingleton = () => {
  const dbPath = path.join(process.cwd(), 'dev.db')
  const db = new Database(dbPath)
  const adapter = new PrismaBetterSqlite3(db as any)
  return new PrismaClient({ adapter })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
