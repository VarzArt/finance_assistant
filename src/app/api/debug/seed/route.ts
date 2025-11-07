import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  const email = 'demo@user.dev'
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Demo User',
    },
  })

  const account = await prisma.account.upsert({
    where: { id: `${user.id}-demo-account` },
    update: {},
    create: {
      id: `${user.id}-demo-account`,
      userId: user.id,
      type: 'REGULAR',
      name: 'Кошелек',
      currency: 'RUB',
      balance: 1000,
    },
  })

  const category = await prisma.category.upsert({
    where: { userId_name_type: { userId: user.id, name: 'Продукты', type: 'EXPENSE' } },
    update: {},
    create: {
      userId: user.id,
      type: 'EXPENSE',
      name: 'Продукты',
      color: '#16a34a',
    },
  })

  await prisma.transaction.create({
    data: {
      userId: user.id,
      accountId: account.id,
      categoryId: category.id,
      amount: -1200,
      currency: 'RUB',
      occurredAt: new Date(),
      note: 'Обед',
    },
  })

  return NextResponse.json({ ok: true, userId: user.id, accountId: account.id })
}
