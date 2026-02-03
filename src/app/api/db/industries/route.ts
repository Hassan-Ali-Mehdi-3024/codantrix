import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const industries = [
        { name: "Manufacturing", slug: "manufacturing", description: "High-throughput production AI." },
        { name: "Agriculture", slug: "agriculture", description: "Precision crop health monitoring." },
        { name: "Logistics", slug: "logistics", description: "Smart sorting and route optimization." },
        { name: "Real Estate", slug: "real-estate", description: "Retail occupancy intelligence." },
        { name: "Retail", slug: "retail", description: "Customer experience and bottleneck analysis." },
        { name: "Warehousing", slug: "warehousing", description: "Bespoke AI infrastructure." }
    ]

    return NextResponse.json(industries)
}
