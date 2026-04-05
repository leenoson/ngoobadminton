"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
)

export default function DashboardPage() {
  const supabase = createClient()

  const [last7Days, setLast7Days] = useState([])
  const [last30Days, setLast30Days] = useState([])

  function getPastDates(days) {
    const arr = []

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)

      arr.push(d.toISOString().split("T")[0])
    }

    return arr
  }

  useEffect(() => {
    async function load() {
      const dates30 = getPastDates(30)
      const startDate = dates30[0]

      const { data } = await supabase
        .from("attendance")
        .select("attend_date")
        .gte("attend_date", startDate)

      const counts = {}

      data?.forEach((row) => {
        counts[row.attend_date] = (counts[row.attend_date] || 0) + 1
      })

      const stats30 = dates30.map((date) => ({
        date,
        count: counts[date] || 0,
      }))

      const stats7 = stats30.slice(-7)

      setLast30Days(stats30)
      setLast7Days(stats7)
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chart7Data = {
    labels: last7Days.map((d) => d.date),
    datasets: [
      {
        label: "Attendance",
        data: last7Days.map((d) => d.count),
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  }

  const chart30Data = {
    labels: last30Days.map((d) => d.date),
    datasets: [
      {
        label: "Attendance",
        data: last30Days.map((d) => d.count),
      },
    ],
  }

  return (
    <section className="">
      <h2 className="">Dashboard</h2>

      <article className="">
        <h3>Thống kê điểm danh 7 ngày gần nhất</h3>
        {/* <Line data={chart7Data} /> */}
      </article>

      <article className="">
        <h3>Thống kê điểm danh 30 ngày gần nhất</h3>
        {/* <Bar data={chart30Data} /> */}
      </article>
    </section>
  )
}
