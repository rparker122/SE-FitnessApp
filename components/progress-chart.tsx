"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data - in a real app, this would come from an API or database
const generateData = () => {
  const data = []
  const now = new Date()

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate some random progress data
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weight: Math.floor(Math.random() * 10) + 140,
      strength: Math.floor(Math.random() * 15) + 70,
      endurance: Math.floor(Math.random() * 20) + 60,
    })
  }

  return data
}

export function ProgressChart() {
  const [data, setData] = useState<any[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setData(generateData())
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="flex items-center justify-center h-full">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
        <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.5)" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "8px",
            color: "white",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="strength" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="endurance" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

