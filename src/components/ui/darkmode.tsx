"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (e: React.MouseEvent) => {
    // Determine the new theme based on current state
    // If it's system, we default to light or dark? 
    // Usually standard toggles cycle Light <-> Dark.
    const newTheme = theme === "dark" ? "light" : "dark"

    // Check if view transitions are supported
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    const x = e.clientX
    const y = e.clientY

    // Calculate distance to the furthest corner to ensure full coverage
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      setTheme(newTheme)
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]

      // We animate the NEW view expanding over the OLD view
      document.documentElement.animate(
        {
          clipPath: [clipPath[0], clipPath[1]],
        },
        {
          duration: 1000,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Premium 'natural' ease-out
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:border-primary/50 group"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-orange-500 group-hover:text-orange-400" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-500 group-hover:text-blue-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
