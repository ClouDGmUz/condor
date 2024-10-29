import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

// Log all queries with correct typing
prisma.$on('query' as never, (e: Prisma.QueryEvent) => {
  console.log('Query:', e.query)
  console.log('Params:', e.params)
  console.log('Duration:', `${e.duration}ms`)
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Test database connection and log database version
prisma.$connect()
  .then(async () => {
    console.log('Successfully connected to database')
    // Get PostgreSQL version
    const version = await prisma.$queryRaw`SELECT version()`
    console.log('Database version:', version)
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error)
  })
