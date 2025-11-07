import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const [users, accounts, tsx] = await Promise.all([
    prisma.user.count(),
    prisma.account.count(),
    prisma.transaction.count(),
  ])

  return NextResponse.json({ ok: true, users, accounts, transactions: tsx })
}
