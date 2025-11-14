"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MapPin, Wifi, Signal, ChevronRight, ChevronDown, Navigation, Clock, Users, Zap, TrendingUp, Building2 } from 'lucide-react'

export const campusLocations = [
  // Red - Congested areas
  {
    id: 1,
    name: "Student Union",
    shortName: "SU",
    category: "Campus Events",
    floor: 2,
    status: "congested" as const,
    wifi: 42,
    cellular: 65,
    devices: 387,
    latency: 94,
    position: { x: 35, y: 50 },
    throughput: "125 Mbps",
  },
  {
    id: 2,
    name: "Jonsson Academic Center",
    shortName: "JSOM",
    category: "Academic & Administrative",
    floor: 3,
    status: "congested" as const,
    wifi: 38,
    cellular: 58,
    devices: 412,
    latency: 108,
    position: { x: 28, y: 35 },
    throughput: "98 Mbps",
  },
  {
    id: 3,
    name: "Dining Hall",
    shortName: "DINING",
    category: "Dining",
    floor: 1,
    status: "congested" as const,
    wifi: 45,
    cellular: 62,
    devices: 298,
    latency: 87,
    position: { x: 20, y: 65 },
    throughput: "142 Mbps",
  },
  
  // Green - Optimal areas
  {
    id: 4,
    name: "Eugene McDermott Library",
    shortName: "LIBRARY",
    category: "Academic & Administrative",
    floor: 4,
    status: "optimal" as const,
    wifi: 94,
    cellular: 91,
    devices: 156,
    latency: 11,
    position: { x: 55, y: 30 },
    throughput: "845 Mbps",
  },
  {
    id: 5,
    name: "Engineering Building North",
    shortName: "ENGR N",
    category: "Academic & Administrative",
    floor: 3,
    status: "optimal" as const,
    wifi: 89,
    cellular: 87,
    devices: 134,
    latency: 15,
    position: { x: 48, y: 55 },
    throughput: "756 Mbps",
  },
  {
    id: 6,
    name: "Natural Science Building",
    shortName: "NSB",
    category: "Academic & Administrative",
    floor: 5,
    status: "optimal" as const,
    wifi: 91,
    cellular: 88,
    devices: 98,
    latency: 13,
    position: { x: 72, y: 25 },
    throughput: "812 Mbps",
  },
  {
    id: 7,
    name: "Callier Center",
    shortName: "CALLIER",
    category: "Academic & Administrative",
    floor: 2,
    status: "optimal" as const,
    wifi: 88,
    cellular: 86,
    devices: 67,
    latency: 16,
    position: { x: 78, y: 50 },
    throughput: "734 Mbps",
  },
  
  // Blue - High-capacity areas
  {
    id: 8,
    name: "Activity Center",
    shortName: "AC",
    category: "Recreation",
    floor: 2,
    status: "high-capacity" as const,
    wifi: 98,
    cellular: 97,
    devices: 28,
    latency: 6,
    position: { x: 22, y: 30 },
    throughput: "1.2 Gbps",
  },
  {
    id: 9,
    name: "Research Operations Center",
    shortName: "ROC",
    category: "Academic & Administrative",
    floor: 3,
    status: "high-capacity" as const,
    wifi: 97,
    cellular: 96,
    devices: 34,
    latency: 7,
    position: { x: 68, y: 65 },
    throughput: "1.1 Gbps",
  },
  {
    id: 10,
    name: "Engineering South",
    shortName: "ENGR S",
    category: "Academic & Administrative",
    floor: 2,
    status: "high-capacity" as const,
    wifi: 96,
    cellular: 95,
    devices: 19,
    latency: 8,
    position: { x: 42, y: 70 },
    throughput: "1.0 Gbps",
  },
  {
    id: 11,
    name: "ECSW Building",
    shortName: "ECSW",
    category: "Academic & Administrative",
    floor: 4,
    status: "high-capacity" as const,
    wifi: 95,
    cellular: 94,
    devices: 42,
    latency: 9,
    position: { x: 62, y: 45 },
    throughput: "982 Mbps",
  },
]

const categories = [
  { name: "Academic & Administrative", icon: "🎓", count: 8 },
  { name: "Campus Events", icon: "📅", count: 1 },
  { name: "Dining", icon: "🍽️", count: 1 },
  { name: "Recreation", icon: "⚽", count: 2 },
]

export function StudentView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<(typeof campusLocations)[0] | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Academic & Administrative")
  const [selectedFloor, setSelectedFloor] = useState(0)

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
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-96 border-r border-border bg-card flex flex-col shadow-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-transparent shrink-0">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <div className="h-6 w-6 border-2 border-primary-foreground rounded flex items-center justify-center">
                <div className="h-2 w-2 bg-primary-foreground rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">Campus Connect</h1>
              <p className="text-[9px] text-muted-foreground font-medium leading-tight">Powered by Verizon 5G</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search buildings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-background/50 backdrop-blur h-8 text-xs"
            />
          </div>
        </div>

        <div className="p-3.5 border-b border-border bg-muted/20 shrink-0">
          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <div className="bg-card rounded-lg p-2 border border-border">
              <div className="flex items-center gap-1 mb-0.5">
                <Wifi className="h-3 w-3 text-primary" />
                <span className="text-[9px] text-muted-foreground font-medium">Avg Wi-Fi</span>
              </div>
              <p className="text-base font-bold text-foreground">{stats.avgWifi}%</p>
            </div>
            <div className="bg-card rounded-lg p-2 border border-border">
              <div className="flex items-center gap-1 mb-0.5">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-[9px] text-muted-foreground font-medium">Best Spots</span>
              </div>
              <p className="text-base font-bold text-foreground">{stats.highCapacity}</p>
            </div>
          </div>
          
          <h3 className="text-[9px] font-semibold text-foreground mb-1.5 uppercase tracking-wider">Network Status</h3>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 bg-red-500/10 rounded-lg px-2 py-1.5 border border-red-500/20">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-red-700 dark:text-red-300 leading-tight">Congested</p>
              </div>
              <Badge variant="secondary" className="bg-red-500/20 text-red-700 dark:text-red-300 border-0 text-[10px] px-1.5 py-0">
                {stats.congested}
              </Badge>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 rounded-lg px-2 py-1.5 border border-green-500/20">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-green-700 dark:text-green-300 leading-tight">Optimal</p>
              </div>
              <Badge variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300 border-0 text-[10px] px-1.5 py-0">
                {stats.optimal}
              </Badge>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 rounded-lg px-2 py-1.5 border border-blue-500/20">
              <div className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 leading-tight">High Capacity</p>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-0 text-[10px] px-1.5 py-0">
                {stats.highCapacity}
              </Badge>
            </div>
          </div>
        </div>

        {/* Categories */}
        <ScrollArea className="flex-1">
          <div className="p-3.5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[10px] font-semibold text-foreground uppercase tracking-wider">Locations</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 text-[10px] px-2"
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
                <div key={category.name} className="mb-1.5">
                  <button
                    onClick={() =>
                      setExpandedCategory(expandedCategory === category.name ? null : category.name)
                    }
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-base">{category.icon}</div>
                      <div className="text-left">
                        <span className="text-[11px] font-medium text-foreground block leading-tight">{category.name}</span>
                      </div>
                    </div>
                    {expandedCategory === category.name ? (
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>

                  {expandedCategory === category.name && (
                    <div className="ml-7 mt-1 space-y-0.5">
                      {categoryLocations.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => setSelectedLocation(location)}
                          className={`w-full flex items-center justify-between p-1.5 rounded-lg transition-all duration-200 text-left ${
                            selectedLocation?.id === location.id
                              ? 'bg-primary/10 border border-primary/30'
                              : 'hover:bg-accent/50'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(location.status)} ${
                              location.status === 'congested' ? 'animate-pulse' : ''
                            }`} />
                            <span className="text-[10px] text-foreground font-medium">{location.name}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Wifi className="h-2.5 w-2.5 text-muted-foreground" />
                            <span className="text-[10px] font-semibold text-foreground">{location.wifi}%</span>
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
              className={`absolute rounded-full blur-[60px] transition-all duration-1000 bg-gradient-radial ${getStatusBgColor(location.status)} ${
                location.status === 'congested' ? 'animate-pulse' : ''
              }`}
              style={{
                width: location.status === 'high-capacity' ? '280px' : location.status === 'optimal' ? '240px' : '260px',
                height: location.status === 'high-capacity' ? '280px' : location.status === 'optimal' ? '240px' : '260px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
              }}
            />
            
            <div
              className={`absolute rounded-full blur-[30px] transition-all duration-700 bg-gradient-radial ${getStatusBgColor(location.status)}`}
              style={{
                width: location.status === 'high-capacity' ? '160px' : location.status === 'optimal' ? '140px' : '150px',
                height: location.status === 'high-capacity' ? '160px' : location.status === 'optimal' ? '140px' : '150px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%',
                opacity: 0.7,
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
              <div className={`absolute inset-0 rounded-full ring-4 ring-white/40 dark:ring-white/30 animate-ping`}
                style={{ width: '70px', height: '70px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
              />
            )}
            
            <div className={`relative ${getStatusColor(location.status)} rounded-xl px-3.5 py-2.5 shadow-xl transition-all duration-300 border-2 border-white/40 backdrop-blur-sm ${
              selectedLocation?.id === location.id ? 'scale-110 ring-4 ring-white/40 shadow-2xl' : 'group-hover:scale-105'
            }`}>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-white drop-shadow-lg" />
                <span className="text-white font-bold text-xs drop-shadow-lg tracking-tight whitespace-nowrap">{location.shortName}</span>
              </div>
              
              {location.status === "congested" && (
                <div className="absolute inset-0 bg-red-400 rounded-xl animate-ping opacity-30" />
              )}
              
              {location.status === "high-capacity" && (
                <div className="absolute inset-0 bg-blue-300 rounded-xl blur-lg opacity-40 animate-pulse" />
              )}
            </div>
            
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
              <div className="bg-card/98 backdrop-blur-md border-2 border-border rounded-xl px-4 py-3 shadow-2xl whitespace-nowrap">
                <p className="text-sm font-bold text-foreground mb-2">{location.name}</p>
                <div className="flex items-center gap-4 text-xs mb-2">
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-foreground font-semibold">{location.wifi}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Signal className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-foreground font-semibold">{location.cellular}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-foreground font-semibold">{location.devices}</span>
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
          <Card className="absolute bottom-6 left-6 right-6 md:right-auto md:w-[540px] p-5 shadow-2xl border-2 backdrop-blur-md bg-card/98 animate-in slide-in-from-bottom-4 duration-300 z-20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h3 className="text-xl font-bold text-foreground">{selectedLocation.name}</h3>
                  <Badge className={`${getStatusColor(selectedLocation.status)} text-white border-0 shadow-lg text-xs px-2.5 py-0.5`}>
                    {getStatusText(selectedLocation.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{selectedLocation.category}</p>
              </div>
              <Button size="sm" className="gap-2 shadow-md bg-primary hover:bg-primary/90">
                <Navigation className="h-4 w-4" />
                Navigate
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
              <div className="space-y-1 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-3 border border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Wifi className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Wi-Fi</span>
                </div>
                <p className="text-xl font-bold text-foreground">{selectedLocation.wifi}%</p>
              </div>

              <div className="space-y-1 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-3 border border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Signal className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">5G Signal</span>
                </div>
                <p className="text-xl font-bold text-foreground">{selectedLocation.cellular}%</p>
              </div>

              <div className="space-y-1 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-3 border border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Devices</span>
                </div>
                <p className="text-xl font-bold text-foreground">{selectedLocation.devices}</p>
              </div>

              <div className="space-y-1 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-3 border border-border">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">Latency</span>
                </div>
                <p className="text-xl font-bold text-foreground">{selectedLocation.latency}ms</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm bg-primary/10 rounded-lg px-4 py-2.5 border border-primary/20">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground font-medium">Throughput:</span>
              <span className="font-bold text-foreground">{selectedLocation.throughput}</span>
            </div>
          </Card>
        )}

        <div className="absolute right-6 top-6 bg-card/98 backdrop-blur-md border-2 border-border rounded-xl shadow-2xl overflow-hidden z-30">
          <div className="px-3 py-1.5 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
            <span className="text-[10px] font-bold text-foreground tracking-wider">FLOOR</span>
          </div>
          <div className="p-1 space-y-0.5">
            {[3, 2, 1, 0, -1].map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`w-10 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  floor === selectedFloor
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40 scale-105'
                    : 'hover:bg-accent text-foreground hover:scale-105'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 border-2 border-primary-foreground/20 z-30">
          <div className="h-2 w-2 bg-primary-foreground rounded-full animate-pulse shadow-lg shadow-primary-foreground/50" />
          <span className="text-xs font-bold tracking-wide">Live Network Data</span>
        </div>
      </div>
    </div>
  )
}
