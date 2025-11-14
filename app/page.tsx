"use client"

import { useState } from "react"
import { StudentView } from "@/components/student-view"
import { ITDashboard } from "@/components/it-dashboard"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone } from 'lucide-react'

export default function Home() {
  const [view, setView] = useState<"student" | "it">("student")

  return (
    <div className="min-h-screen bg-background">
      {/* View Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-card border border-border rounded-lg p-1 shadow-lg">
        <Button
          variant={view === "student" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("student")}
          className="gap-2"
        >
          <Smartphone className="h-4 w-4" />
          Student View
        </Button>
        <Button
          variant={view === "it" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("it")}
          className="gap-2"
        >
          <Monitor className="h-4 w-4" />
          IT Dashboard
        </Button>
      </div>

      {view === "student" ? <StudentView /> : <ITDashboard />}
    </div>
  )
}
