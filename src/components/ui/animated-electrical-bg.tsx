"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Zap,
  Wrench,
  Plug,
  Cable,
  Lightbulb,
  CircuitBoard,
  Cpu,
  Gauge,
  Sun,
  Battery,
  Fan,
  Camera,
  Shield,
  Hammer,
  ScanLine,
  type LucideIcon,
} from "lucide-react"

interface FloatingItem {
  id: number
  Icon: LucideIcon
  x: number
  y: number
  size: number
  duration: number
  delay: number
  rotation: number
  opacity: number
}

const electricalIcons: LucideIcon[] = [
  Zap,
  Wrench,
  Plug,
  Cable,
  Lightbulb,
  CircuitBoard,
  Cpu,
  Gauge,
  Sun,
  Battery,
  Fan,
  Camera,
  Shield,
  Hammer,
  ScanLine,
]

function generateItems(count: number): FloatingItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    Icon: electricalIcons[i % electricalIcons.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 24 + Math.random() * 28, // 24-52px
    duration: 18 + Math.random() * 22, // 18-40s float cycle
    delay: Math.random() * -30, // staggered start
    rotation: Math.random() * 360,
    opacity: 0.12 + Math.random() * 0.13, // visible on blue bg: 0.12-0.25
  }))
}

export function AnimatedElectricalBackground() {
  const [items, setItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    setItems(generateItems(22))
  }, [])

  if (items.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-white"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            rotate: [item.rotation, item.rotation + 60, item.rotation - 30, item.rotation + 90, item.rotation],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <item.Icon
            style={{ width: item.size, height: item.size }}
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* Subtle electrical spark lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 20}%`,
            top: `${15 + i * 18}%`,
          }}
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="text-white"
            style={{ opacity: 0.12 }}
            animate={{
              opacity: [0.08, 0.2, 0.08, 0.14, 0.08],
              scale: [1, 1.15, 0.95, 1.1, 1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3,
            }}
          >
            {/* Lightning bolt path */}
            <path
              d="M60 10 L45 55 L65 50 L50 110 L75 55 L55 60 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  )
}
