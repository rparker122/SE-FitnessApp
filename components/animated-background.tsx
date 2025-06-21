"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // More vibrant colors
    const colors = [
      "rgba(239, 68, 68, 0.7)", // red-500
      "rgba(249, 115, 22, 0.7)", // orange-500
      "rgba(234, 179, 8, 0.7)", // yellow-500
      "rgba(132, 204, 22, 0.7)", // lime-500
      "rgba(34, 197, 94, 0.7)", // green-500
      "rgba(16, 185, 129, 0.7)", // emerald-500
      "rgba(6, 182, 212, 0.7)", // cyan-500
      "rgba(14, 165, 233, 0.7)", // sky-500
      "rgba(59, 130, 246, 0.7)", // blue-500
      "rgba(99, 102, 241, 0.7)", // indigo-500
      "rgba(139, 92, 246, 0.7)", // violet-500
      "rgba(168, 85, 247, 0.7)", // purple-500
      "rgba(217, 70, 239, 0.7)", // fuchsia-500
      "rgba(236, 72, 153, 0.7)", // pink-500
      "rgba(244, 63, 94, 0.7)", // rose-500
    ]

    // Blob parameters
    const blobs = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 200 + 100,
      xSpeed: (Math.random() - 0.5) * 2,
      ySpeed: (Math.random() - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseAmount: Math.random() * 0.3 + 0.1,
      pulseOffset: Math.random() * Math.PI * 2,
    }))

    // Wave parameters with more movement
    const waves = [
      { y: height * 0.2, length: 0.008, amplitude: 80, speed: 0.04, color: "rgba(239, 68, 68, 0.2)" },
      { y: height * 0.4, length: 0.01, amplitude: 70, speed: 0.03, color: "rgba(16, 185, 129, 0.2)" },
      { y: height * 0.6, length: 0.015, amplitude: 60, speed: 0.05, color: "rgba(59, 130, 246, 0.2)" },
      { y: height * 0.8, length: 0.02, amplitude: 50, speed: 0.02, color: "rgba(168, 85, 247, 0.2)" },
    ]

    // Particle system for extra movement
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 3,
      speedY: (Math.random() - 0.5) * 3,
      color: colors[Math.floor(Math.random() * colors.length)].replace("0.7", "0.5"),
    }))

    let angle = 0
    let time = 0

    // Animation loop
    function animate() {
      if (!ctx) return

      // Create dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#0f172a") // slate-900
      gradient.addColorStop(1, "#0f172a") // slate-900

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw blobs
      for (const blob of blobs) {
        // Update position
        blob.x += blob.xSpeed
        blob.y += blob.ySpeed

        // Bounce off edges
        if (blob.x < -blob.radius) blob.x = width + blob.radius
        if (blob.x > width + blob.radius) blob.x = -blob.radius
        if (blob.y < -blob.radius) blob.y = height + blob.radius
        if (blob.y > height + blob.radius) blob.y = -blob.radius

        // Pulsing effect
        const pulseScale = 1 + Math.sin(time * blob.pulseSpeed + blob.pulseOffset) * blob.pulseAmount

        // Draw blob
        ctx.beginPath()

        // Create radial gradient for each blob
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius * pulseScale)

        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.arc(blob.x, blob.y, blob.radius * pulseScale, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw waves with more movement
      for (const wave of waves) {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        for (let x = 0; x < width; x += 5) {
          const y =
            wave.y +
            Math.sin(x * wave.length + angle * wave.speed) * wave.amplitude +
            Math.sin(x * wave.length * 0.5 + angle * wave.speed * 1.5) * wave.amplitude * 0.5
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        ctx.fillStyle = wave.color
        ctx.fill()
      }

      // Draw particles
      for (const particle of particles) {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.fillStyle = particle.color
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add some random sparkles for extra vibrancy
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * 2 + 1

        ctx.beginPath()
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      angle += 0.01
      time += 0.01
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      <motion.div
        className="fixed inset-0 z-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(239, 68, 68, 0.1), rgba(16, 185, 129, 0.1))",
            "linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
            "linear-gradient(to bottom right, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
            "linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(239, 68, 68, 0.1))",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </>
  )
}

