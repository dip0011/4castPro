import { NextRequest, NextResponse } from "next/server";
import { API_BASE, DATASETS } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json(
      { error: "Missing 'from' and 'to' query parameters" },
      { status: 400 }
    );
  }

  const url = `${API_BASE}/datasets/${DATASETS.ACTUALS}/stream?fuelType=WIND&settlementDateFrom=${from}&settlementDateTo=${to}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Elexon API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const points = data.map((d: { startTime: string; generation: number }) => ({
      startTime: d.startTime,
      generation: d.generation,
    }));

    return NextResponse.json(points, {
      headers: {
        "Cache-Control": "public, s-maxage=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch actuals: ${err}` },
      { status: 500 }
    );
  }
}
