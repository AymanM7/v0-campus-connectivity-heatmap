"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MapPin, Wifi, Signal, ChevronRight, ChevronDown, Navigation, Clock, Users, Zap, TrendingUp, Building2, Activity } from 'lucide-react'

export const campusLocations = [
  // High-traffic congested buildings (Red)
  {
    id: 1,
    name: "Student Union",
    shortName: "SU",
    category: "Campus Events",
    status: "congested" as const,
    wifi: 73,
    cellular: 78,
    devices: 542,
    latency: 87,
    position: { x: 50, y: 52 }, // Center of campus
    throughput: "312 Mbps",
  },
  {
    id: 2,
    name: "Jonsson School of Engineering & Computer Science West",
    shortName: "ECSW",
    category: "Academic & Administrative",
    status: "congested" as const,
    wifi: 69,
    cellular: 74,
    devices: 498,
    latency: 92,
    position: { x: 35, y: 48 }, // West side
    throughput: "285 Mbps",
  },
  {
    id: 3,
    name: "Dining Hall West",
    shortName: "DHW",
    category: "Dining",
    status: "congested" as const,
    wifi: 71,
    cellular: 76,
    devices: 387,
    latency: 89,
    position: { x: 28, y: 65 }, // Southwest residential area
    throughput: "298 Mbps",
  },
  {
    id: 4,
    name: "Naveen Jindal School of Management",
    shortName: "JSOM",
    category: "Academic & Administrative",
    status: "congested" as const,
    wifi: 75,
    cellular: 79,
    devices: 456,
    latency: 85,
    position: { x: 70, y: 58 }, // Southeast
    throughput: "325 Mbps",
  },
  
  // Well-optimized buildings (Green)
  {
    id: 5,
    name: "Eugene McDermott Library",
    shortName: "LIBRARY",
    category: "Academic & Administrative",
    status: "optimal" as const,
    wifi: 91,
    cellular: 89,
    devices: 234,
    latency: 18,
    position: { x: 58, y: 38 }, // Northeast academic
    throughput: "785 Mbps",
  },
  {
    id: 6,
    name: "Frankford Hall (Residence)",
    shortName: "FH",
    category: "Residence",
    status: "optimal" as const,
    wifi: 88,
    cellular: 86,
    devices: 178,
    latency: 22,
    position: { x: 25, y: 48 }, // West residential
    throughput: "698 Mbps",
  },
  {
    id: 7,
    name: "Natural Science & Engineering Research Lab",
    shortName: "NSERL",
    category: "Academic & Administrative",
    status: "optimal" as const,
    wifi: 90,
    cellular: 87,
    devices: 156,
    latency: 20,
    position: { x: 42, y: 32 }, // North academic
    throughput: "742 Mbps",
  },
  
  // High-capacity low-usage (Blue)
  {
    id: 8,
    name: "Activity Center (Recreation)",
    shortName: "AC",
    category: "Recreation",
    status: "high-capacity" as const,
    wifi: 95,
    cellular: 94,
    devices: 67,
    latency: 12,
    position: { x: 65, y: 70 }, // Southeast recreation
    throughput: "1.08 Gbps",
  },
  {
    id: 9,
    name: "Callier Center for Communication Disorders",
    shortName: "CALLIER",
    category: "Academic & Administrative",
    status: "high-capacity" as const,
    wifi: 96,
    cellular: 95,
    devices: 52,
    latency: 10,
    position: { x: 75, y: 42 }, // East side
    throughput: "1.15 Gbps",
  },
  {
    id: 10,
    name: "Synergy Park North",
    shortName: "SPN",
    category: "Research",
    status: "high-capacity" as const,
    wifi: 97,
    cellular: 96,
    devices: 38,
    latency: 8,
    position: { x: 50, y: 22 }, // North campus
    throughput: "1.24 Gbps",
  },
  {
    id: 11,
    name: "Green Center (Conference)",
    shortName: "GREEN",
    category: "Conference",
    status: "high-capacity" as const,
    wifi: 94,
    cellular: 93,
    devices: 45,
    latency: 14,
    position: { x: 38, y: 62 }, // Southwest
    throughput: "982 Mbps",
  },
]

const categories = [
  { name: "Academic & Administrative", icon: "🎓", count: 5 },
  { name: "Campus Events", icon: "📅", count: 1 },
  { name: "Dining", icon: "🍽️", count: 1 },
  { name: "Recreation", icon: "⚽", count: 1 },
  { name: "Residence", icon: "🏠", count: 1 },
  { name: "Research", icon: "🔬", count: 1 },
  { name: "Conference", icon: "🏢", count: 1 },
]

export function StudentView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof campusLocations)[0] | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Academic & Administrative")

  const getStatusColor = (status: "optimal" | "congested" | "high-capacity") => {
    switch (status) {
      case "optimal":
        return "bg-green-500"
      case "congested":
        return "bg-red-500"
      case "high-capacity":
        return "bg-blue-500"
    }
  }

  const getStatusRingColor = (status: "optimal" | "congested" | "high-capacity") => {
    switch (status) {
      case "optimal":
        return "ring-green-500/30"
      case "congested":
        return "ring-red-500/30"
      case "high-capacity":
        return "ring-blue-500/30"
    }
  }

  const getStatusText = (status: "optimal" | "congested" | "high-capacity") => {
    switch (status) {
      case "optimal":
        return "Optimal"
      case "congested":
        return "Congested"
      case "high-capacity":
        return "High Capacity"
    }
  }

  const getStatusBgColor = (status: "optimal" | "congested" | "high-capacity") => {
    switch (status) {
      case "optimal":
        return "from-green-500/25 to-green-600/10"
      case "congested":
        return "from-red-500/30 to-red-600/10"
      case "high-capacity":
        return "from-blue-500/35 to-blue-600/10"
    }
  }

  const filteredLocations = campusLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    congested: campusLocations.filter(l => l.status === 'congested').length,
    optimal: campusLocations.filter(l => l.status === 'optimal').length,
    highCapacity: campusLocations.filter(l => l.status === 'high-capacity').length,
    avgWifi: Math.round(campusLocations.reduce((acc, l) => acc + l.wifi, 0) / campusLocations.length),
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Sidebar */}
      <div className="w-96 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-slate-900 shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
              <div className="relative">
                <MapPin className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent leading-none mb-1">
                Campus Connect
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Find the best connectivity on campus
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search buildings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-10 text-sm"
            />
          </div>
        </div>

        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Wifi className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Avg Wi-Fi</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.avgWifi}%</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Best Spots</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.highCapacity}</p>
            </div>
          </div>
          
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">Network Status</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/20 rounded-xl px-3 py-2 border border-red-200 dark:border-red-900/50">
              <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-red-700 dark:text-red-400 leading-tight">Congested</p>
              </div>
              <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-0 text-xs px-2 py-0.5">
                {stats.congested}
              </Badge>
            </div>
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/20 rounded-xl px-3 py-2 border border-green-200 dark:border-green-900/50">
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-green-700 dark:text-green-400 leading-tight">Optimal</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0 text-xs px-2 py-0.5">
                {stats.optimal}
              </Badge>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 border border-blue-200 dark:border-blue-900/50">
              <div className="h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 leading-tight">High Capacity</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0 text-xs px-2 py-0.5">
                {stats.highCapacity}
              </Badge>
            </div>
          </div>
        </div>

        {/* Categories */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Locations</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs px-3 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedLocation(null)
                }}
              >
                CLEAR
              </Button>
            </div>

            {categories.map((category) => {
              const categoryLocations = filteredLocations.filter(loc => loc.category === category.name)
              if (categoryLocations.length === 0) return null
              
              return (
                <div key={category.name} className="mb-2">
                  <button
                    onClick={() =>
                      setExpandedCategory(expandedCategory === category.name ? null : category.name)
                    }
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{category.icon}</div>
                      <div className="text-left">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white block leading-tight">{category.name}</span>
                      </div>
                    </div>
                    {expandedCategory === category.name ? (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                  </button>

                  {expandedCategory === category.name && (
                    <div className="ml-11 mt-1 space-y-1">
                      {categoryLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 text-left border ${
                            selectedLocation?.id === location.id
                              ? 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/50'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${getStatusColor(location.status)} ${
                              location.status === 'congested' ? 'animate-pulse' : ''
                            }`} />
                            <span className="text-sm text-slate-900 dark:text-white font-medium">{location.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Wifi className="h-3 w-3 text-slate-400" />
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{location.wifi}%</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 overflow-hidden">
        
        {/* Campus Roads */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5] opacity-35" xmlns="http://www.w3.org/2000/svg">
          {/* Main circular drive around campus center */}
          <circle cx="50" cy="52" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-400 dark:text-slate-700" />
          
          {/* Primary roads - Campbell Road equivalent */}
          <line x1="10%" y1="48%" x2="90%" y2="48%" stroke="currentColor" strokeWidth="4" className="text-slate-300 dark:text-slate-700" />
          
          {/* Secondary horizontal roads */}
          <line x1="15%" y1="58%" x2="85%" y2="58%" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 dark:text-slate-700" />
          <line x1="20%" y1="38%" x2="80%" y2="38%" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 dark:text-slate-700" />
          
          {/* Vertical connecting roads */}
          <line x1="28%" y1="20%" x2="28%" y2="75%" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 dark:text-slate-700" />
          <line x1="50%" y1="18%" x2="50%" y2="72%" stroke="currentColor" strokeWidth="3" className="text-slate-300 dark:text-slate-700" />
          <line x1="72%" y1="25%" x2="72%" y2="75%" stroke="currentColor" strokeWidth="2.5" className="text-slate-300 dark:text-slate-700" />
          
          {/* Parking structures */}
          <rect x="18%" y="62%" width="7%" height="8%" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" className="text-slate-400 dark:text-slate-700" opacity="0.6" />
          <rect x="75%" y="62%" width="7%" height="8%" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2" className="text-slate-400 dark:text-slate-700" opacity="0.6" />
          
          {/* Campus boundary */}
          <rect x="12" y="16" width="76" height="62" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" className="text-orange-400/50 dark:text-orange-800/40" />
        </svg>

        {/* Central Campus Circle - Iconic UTD feature */}
        <div className="absolute left-[50%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-[18%] aspect-square rounded-full bg-gradient-to-br from-orange-300/40 to-orange-400/30 dark:from-orange-900/20 dark:to-orange-800/15 shadow-2xl border-4 border-orange-400/40 dark:border-orange-700/25 z-[6] pointer-events-none">
          <div className="absolute inset-[12%] rounded-full bg-green-300/35 dark:bg-green-900/15 shadow-inner border-2 border-green-400/30 dark:border-green-700/20" />
          <div className="absolute inset-[28%] rounded-full bg-orange-200/50 dark:bg-orange-950/20 shadow-inner" />
          <div className="absolute inset-[42%] rounded-full bg-orange-100/60 dark:bg-orange-950/25 flex items-center justify-center">
            <Activity className="h-6 w-6 text-orange-500 dark:text-orange-400 opacity-40" />
          </div>
        </div>

        {/* Green Spaces - Quads and lawns */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {/* North academic quad */}
          <div className="absolute left-[42%] top-[28%] w-[20%] h-[10%] bg-gradient-to-br from-green-200/35 to-green-300/25 dark:from-green-950/15 dark:to-green-900/10 rounded-[35px] shadow-inner" />
          
          {/* West residential green */}
          <div className="absolute left-[25%] top-[55%] w-[16%] h-[14%] bg-gradient-to-br from-green-200/35 to-green-300/25 dark:from-green-950/15 dark:to-green-900/10 rounded-[30px] shadow-inner" />
          
          {/* East academic green */}
          <div className="absolute left-[65%] top-[50%] w-[14%] h-[16%] bg-gradient-to-br from-green-200/35 to-green-300/25 dark:from-green-950/15 dark:to-green-900/10 rounded-[28px] shadow-inner" />
          
          {/* South recreation green */}
          <div className="absolute left-[52%] top-[68%] w-[12%] h-[10%] bg-gradient-to-br from-green-200/35 to-green-300/25 dark:from-green-950/15 dark:to-green-900/10 rounded-[25px] shadow-inner" />
        </div>

        {/* Building Structures - Actual UTD Buildings */}
        <div className="absolute inset-0 pointer-events-none z-[8]">
          {/* Student Union - Center (large complex) */}
          <div className="absolute left-[50%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-[9%] h-[9%]">
            <div className="w-full h-full bg-gradient-to-br from-orange-800 to-orange-900 dark:from-orange-700 dark:to-orange-800 rounded-lg shadow-2xl border-2 border-orange-600/50">
              <div className="grid grid-cols-4 gap-0.5 p-1 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-amber-100/70 dark:bg-amber-400/50 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* ECSW - West (large engineering complex) */}
          <div className="absolute left-[35%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-[7.5%] h-[8.5%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 rounded-lg shadow-xl border border-slate-600/50">
              <div className="grid grid-cols-4 gap-0.5 p-1 h-full">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="bg-blue-200/60 dark:bg-blue-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Dining Hall West - Southwest */}
          <div className="absolute left-[28%] top-[65%] -translate-x-1/2 -translate-y-1/2 w-[6%] h-[5.5%]">
            <div className="w-full h-full bg-gradient-to-br from-red-700 to-red-800 dark:from-red-600 dark:to-red-700 rounded-xl shadow-xl border border-red-600/50">
              <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-yellow-100/70 dark:bg-yellow-300/50 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* JSOM - Southeast (modern business school) */}
          <div className="absolute left-[70%] top-[58%] -translate-x-1/2 -translate-y-1/2 w-[7%] h-[8%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-lg shadow-xl border border-slate-500/50">
              <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-amber-200/60 dark:bg-amber-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* McDermott Library - Northeast (tall) */}
          <div className="absolute left-[58%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-[6%] h-[10%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-lg shadow-2xl border border-slate-500/50">
              <div className="grid grid-cols-2 gap-0.5 p-1 h-full">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="bg-cyan-200/60 dark:bg-cyan-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Frankford Hall - West residential */}
          <div className="absolute left-[25%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-[5.5%] h-[7%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-xl shadow-xl border border-slate-500/50">
              <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-teal-200/60 dark:bg-teal-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* NSERL - North academic/research */}
          <div className="absolute left-[42%] top-[32%] -translate-x-1/2 -translate-y-1/2 w-[6.5%] h-[7%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-xl border border-slate-600/50">
              <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-green-200/60 dark:bg-green-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Activity Center - Southeast recreation (wide) */}
          <div className="absolute left-[65%] top-[70%] -translate-x-1/2 -translate-y-1/2 w-[8%] h-[5.5%]">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-2xl shadow-xl border border-blue-500/50">
              <div className="grid grid-cols-4 gap-0.5 p-1 h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-cyan-100/70 dark:bg-cyan-300/50 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Callier Center - East */}
          <div className="absolute left-[75%] top-[42%] -translate-x-1/2 -translate-y-1/2 w-[5.5%] h-[6.5%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-lg shadow-xl border border-slate-500/50">
              <div className="grid grid-cols-2 gap-0.5 p-1 h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-purple-200/60 dark:bg-purple-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Synergy Park North - Far north research */}
          <div className="absolute left-[50%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-[6%] h-[6%]">
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-lg shadow-xl border border-slate-600/50">
              <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-indigo-200/60 dark:bg-indigo-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Green Center - Southwest conference */}
          <div className="absolute left-[38%] top-[62%] -translate-x-1/2 -translate-y-1/2 w-[6%] h-[5.5%]">
            <div className="w-full h-full bg-gradient-to-br from-green-700 to-green-800 dark:from-green-600 dark:to-green-700 rounded-lg shadow-xl border border-green-600/50">
              <div className="grid grid-cols-3 gap-0.5 p-1 h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-emerald-200/60 dark:bg-emerald-400/40 rounded-sm" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Heatmap zones - subtle background glow */}
        {campusLocations.map((location) => (
          <div
            key={`zone-${location.id}`}
            className="absolute pointer-events-none z-0"
            style={{
              left: `${location.position.x}%`,
              top: `${location.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`absolute rounded-full blur-[80px] transition-all duration-1000 ${getStatusBgColor(location.status)} ${
                location.status === 'congested' ? 'animate-pulse' : ''
              }`}
              style={{
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                opacity: 0.25,
              }}
            />
          </div>
        ))}

        {campusLocations.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 pointer-events-auto"
            style={{
              left: `${location.position.x}%`,
              top: `${location.position.y}%`,
            }}
          >
            {selectedLocation?.id === location.id && (
              <div className={`absolute inset-0 rounded-full ring-3 ring-white/50 dark:ring-white/40 animate-ping`}
                style={{ width: '80px', height: '80px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
              />
            )}
            
            <div className={`relative ${getStatusColor(location.status)} rounded-xl px-4 py-2.5 shadow-xl transition-all duration-300 border-2 border-white/40 backdrop-blur-sm ${
              selectedLocation?.id === location.id ? 'scale-115 ring-3 ring-white/40 shadow-2xl' : 'group-hover:scale-105'
            }`}>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-white drop-shadow-lg" strokeWidth={2.5} />
                <span className="text-white font-bold text-sm drop-shadow-lg tracking-tight whitespace-nowrap">{location.shortName}</span>
              </div>
              
              {location.status === "congested" && (
                <div className="absolute inset-0 bg-red-400 rounded-xl animate-ping opacity-20" />
              )}
            </div>
            
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2.5 shadow-xl whitespace-nowrap">
                <p className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">{location.name}</p>
                <div className="flex items-center gap-3 text-xs mb-1.5">
                  <div className="flex items-center gap-1">
                    <Wifi className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                    <span className="text-slate-900 dark:text-white font-semibold">{location.wifi}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                    <span className="text-slate-900 dark:text-white font-semibold">{location.cellular}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                    <span className="text-slate-900 dark:text-white font-semibold">{location.devices}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(location.status)} text-white border-0 text-[10px] px-2.5 py-0.5`}>
                  {getStatusText(location.status)}
                </Badge>
              </div>
            </div>
          </button>
        ))}

        {selectedLocation && (
          <Card className="absolute bottom-24 left-6 right-6 md:left-6 md:right-auto md:w-[540px] p-6 shadow-2xl border-2 border-slate-200 dark:border-slate-800 backdrop-blur-md bg-white/98 dark:bg-slate-900/98 animate-in slide-in-from-bottom-4 duration-300 z-20 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedLocation.name}</h3>
                  <Badge className={`${getStatusColor(selectedLocation.status)} text-white border-0 shadow-lg px-3 py-1 text-sm`}>
                    {getStatusText(selectedLocation.status)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{selectedLocation.category}</p>
              </div>
              <Button size="sm" className="gap-2 shadow-md bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                <Navigation className="h-4 w-4" />
                Navigate
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="space-y-1.5 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Wifi className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase">Wi-Fi</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedLocation.wifi}%</p>
              </div>

              <div className="space-y-1.5 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Signal className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase">5G Signal</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedLocation.cellular}%</p>
              </div>

              <div className="space-y-1.5 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase">Devices</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedLocation.devices}</p>
              </div>

              <div className="space-y-1.5 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase">Latency</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedLocation.latency}ms</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm bg-gradient-to-r from-orange-50 to-green-50 dark:from-orange-950/20 dark:to-green-950/20 rounded-xl px-4 py-3 border border-orange-200 dark:border-orange-900/50">
              <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Throughput:</span>
              <span className="font-bold text-slate-900 dark:text-white">{selectedLocation.throughput}</span>
            </div>
          </Card>
        )}

        <div className="absolute top-6 left-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-orange-400/30 z-30">
          <div className="h-3 w-3 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
          <span className="text-sm font-bold tracking-wide">Live Network Data</span>
        </div>

        {/* UTD Campus Label */}
        <div className="absolute bottom-6 left-6 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-30 border-2 border-orange-400/50">
          <div className="flex items-center gap-3">
            <Building2 className="h-7 w-7" strokeWidth={2.5} />
            <div>
              <h3 className="text-xl font-bold tracking-tight leading-none mb-1">UT Dallas</h3>
              <p className="text-xs text-orange-100 font-semibold">Campus Connectivity Map</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-30 px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Congested</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Optimal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">High Capacity</span>
            </div>
          </div>
        </div>

        {/* Compass */}
        <div className="absolute top-24 right-6 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-2 border-slate-200 dark:border-slate-800 rounded-full shadow-2xl overflow-hidden z-30 p-3">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xs font-bold text-orange-600 dark:text-orange-400">N</div>
            </div>
            <svg className="w-full h-full" viewBox="0 0 48 48">
              <polygon points="24,8 28,24 24,20 20,24" fill="currentColor" className="text-orange-500" />
              <polygon points="24,40 20,24 24,28 28,24" fill="currentColor" className="text-slate-400" />
            </svg>
          </div>
        </div>

        {/* Campus Name Label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl px-6 py-3 z-30">
          <div className="text-center">
            <p className="text-lg font-bold bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
              University of Texas at Dallas
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Campus Connectivity Map</p>
          </div>
        </div>

        {/* Verizon Badge */}
        <div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 border border-white/10 z-30">
          <div className="font-bold text-red-600 text-lg">V</div>
          <div className="border-l border-white/20 pl-2">
            <span className="text-xs font-bold">Powered by Verizon 5G</span>
          </div>
        </div>
      </div>
    </div>
  )
}
