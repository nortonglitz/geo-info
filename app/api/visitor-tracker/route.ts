import { getUserLocationByIp } from "@/services/ipinfo"
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for")
    let ip =
      typeof forwardedFor === "string"
        ? forwardedFor.split(",")[0].trim() // Obtém o primeiro IP da lista
        : "127.0.0.1" // Alternativa para o IP local

    if (ip === "::1") {
      ip = "127.0.0.1"
    }

    const visitorExists = await prisma.visitor.findUnique({
      where: { ip }
    })

    if (visitorExists) {
      await prisma.visitor.update({
        where: { ip },
        data: {
          visitCount: { increment: 1 }
        }
      })
    } else {
      const { city, region, country } = await getUserLocationByIp(ip)
      await prisma.visitor.create({
        data: { ip, city, region, country }
      })
    }

    return NextResponse.json({ message: "Visitante processado com sucesso." }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Não foi possível processar visitante." }, { status: 500 })
  }
}
