import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const city = searchParams.get("city") || "Ho Chi Minh"

    const apiKey = process.env.OPENWEATHER_API_KEY

    // 👉 STEP 1: convert city → lat/lon
    const geoRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
    )

    const geoData = await geoRes.json()

    if (!geoData.length) {
      return NextResponse.json({ error: "City not found" }, { status: 404 })
    }

    const { lat, lon } = geoData[0]

    // 👉 STEP 2: gọi One Call API v3
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${apiKey}`,
      {
        next: { revalidate: 60 },
      },
    )

    if (!weatherRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather" },
        { status: weatherRes.status },
      )
    }

    const data = await weatherRes.json()

    return NextResponse.json({
      city,
      lat,
      lon,
      ...data,
    })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
