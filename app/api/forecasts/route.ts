import { NextRequest, NextResponse } from "next/server";
import { API_BASE, DATASETS, FORECAST_FETCH_BUFFER_HOURS } from "@/lib/constants";

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

  // Expand window backward to capture forecasts published before the range
  const expandedFrom = new Date(
    new Date(from).getTime() - FORECAST_FETCH_BUFFER_HOURS * 60 * 60 * 1000
  );
  const expandedFromStr = expandedFrom.toISOString();
  const toDate = new Date(to);
  // Add 1 day to 'to' to include the full end date
  toDate.setDate(toDate.getDate() + 1);
  const toStr = toDate.toISOString();

  const url = `${API_BASE}/datasets/${DATASETS.FORECASTS}/stream?publishDateTimeFrom=${expandedFromStr}&publishDateTimeTo=${toStr}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: `Elexon API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const points = data.map(
      (d: { startTime: string; publishTime: string; generation: number }) => ({
        startTime: d.startTime,
        publishTime: d.publishTime,
        generation: d.generation,
      })
    );

    return NextResponse.json(points, {
      headers: {
        "Cache-Control": "public, s-maxage=86400",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch forecasts: ${err}` },
      { status: 500 }
    );
  }
}
