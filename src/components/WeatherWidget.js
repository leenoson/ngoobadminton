"use client"

import { useEffect, useState } from "react"

export default function WeatherWidget() {
  const [city, setCity] = useState("Ho Chi Minh City")
  const [data, setData] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => {
      fetch(`/api/weather?city=${city}`)
        .then((res) => res.json())
        .then(setData)
        .catch(console.error)
    }, 500)

    return () => clearTimeout(t)
  }, [city])

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather v3</h1>

      <input value={city} onChange={(e) => setCity(e.target.value)} />

      {!data ? (
        <p>Loading...</p>
      ) : data.error ? (
        <p>{data.error}</p>
      ) : (
        <div>
          <h2>{data.city}</h2>

          {/* current */}
          <p>{data.current?.temp}°C</p>
          <p>{data.current?.weather?.[0]?.description}</p>

          {/* daily */}
          <h3>Next days</h3>
          {data.daily?.slice(0, 3).map((day, i) => (
            <div key={i}>
              <p>{new Date(day.dt * 1000).toDateString()}</p>
              <p>{day.temp.day}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
