"use client"

import { useState } from "react"
import { StudentView } from "@/components/student-view"
import { ITDashboard } from "@/components/it-dashboard"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, ArrowLeft, MapIcon } from 'lucide-react'

export default function Home() {
  const [view, setView] = useState<"student" | "it">("student")

  return (
    <div className="min-h-screen bg-background">
      {/* View Toggle */}
      <div className="fixed top-4 right-4 z-[100] flex gap-2 bg-white/90 dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-2xl backdrop-blur-md">
        <Button
          variant={view === "student" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("student")}
          className={`gap-2 ${view === "student" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          <MapIcon className="h-4 w-4" />
          Campus Map
        </Button>
        <Button
          variant={view === "it" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("it")}
          className={`gap-2 ${view === "it" ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}
        >
          <Monitor className="h-4 w-4" />
          IT Dashboard
        </Button>
      </div>

      {/* Back Button - Only show on IT Dashboard */}
      {view === "it" && (
        <div className="fixed top-20 left-4 z-50">
          <Button
            onClick={() => setView("student")}
            size="lg"
            className="gap-2 bg-white dark:bg-slate-900 border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 shadow-2xl backdrop-blur-md rounded-xl font-bold"
            variant="outline"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Campus Map
          </Button>
        </div>
      )}

      {view === "student" ? <StudentView /> : <ITDashboard />}
    </div>
  )
}
