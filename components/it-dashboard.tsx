"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, AlertTriangle, TrendingUp, TrendingDown, Wifi, Signal, Server, Users, Clock, Download, Upload, RefreshCcw, Zap, Radio, DatabaseZap, Building2, AlertCircle, CheckCircle2, Cpu } from 'lucide-react'
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { campusLocations } from "./student-view"

const buildingStats = campusLocations.map(loc => ({
  name: loc.shortName,
  fullName: loc.name,
  wifi: loc.wifi,
  cellular: loc.cellular,
  devices: loc.devices,
  status: loc.status,
  latency: loc.latency,
  throughput: parseInt(loc.throughput),
})).sort((a, b) => b.devices - a.devices)

const top5BusiestBuildings = buildingStats.slice(0, 5)

const avgWifi = Math.round(campusLocations.reduce((acc, l) => acc + l.wifi, 0) / campusLocations.length)
const avgCellular = Math.round(campusLocations.reduce((acc, l) => acc + l.cellular, 0) / campusLocations.length)
const totalDevices = campusLocations.reduce((acc, l) => acc + l.devices, 0)
const avgLatency = Math.round(campusLocations.reduce((acc, l) => acc + l.latency, 0) / campusLocations.length)

const networkData = [
  { time: "10:00", wifi: avgWifi + 11, cellular: avgCellular + 7, devices: totalDevices - 850 },
  { time: "10:15", wifi: avgWifi + 8, cellular: avgCellular + 4, devices: totalDevices - 820 },
  { time: "10:30", wifi: avgWifi + 4, cellular: avgCellular + 2, devices: totalDevices - 780 },
  { time: "10:45", wifi: avgWifi + 1, cellular: avgCellular - 1, devices: totalDevices - 740 },
  { time: "11:00", wifi: avgWifi - 2, cellular: avgCellular - 3, devices: totalDevices - 720 },
  { time: "11:15", wifi: avgWifi - 6, cellular: avgCellular - 6, devices: totalDevices - 680 },
  { time: "11:30", wifi: avgWifi, cellular: avgCellular, devices: totalDevices },
]

const congestedBuildings = campusLocations.filter(l => l.status === 'congested')
const optimalBuildings = campusLocations.filter(l => l.status === 'optimal')
const highCapacityBuildings = campusLocations.filter(l => l.status === 'high-capacity')

const alerts = [
  ...congestedBuildings.map((building, idx) => ({
    id: idx + 1,
    severity: "high" as const,
    message: `${building.name} congested`,
    detail: `${building.wifi}% Wi-Fi capacity • ${building.devices} devices connected`,
    action: building.latency > 100 ? "Access point check needed" : "Load balance recommended",
    time: `${idx + 2}m ago`,
    building: building.name,
    icon: AlertCircle,
  })),
  {
    id: congestedBuildings.length + 1,
    severity: "warning" as const,
    message: `Device spike in Engineering Building`,
    detail: `Unusual activity detected • +127 devices in last 15 minutes`,
    action: "Monitor bandwidth allocation",
    time: `8m ago`,
    building: "Engineering Building North",
    icon: TrendingUp,
  },
  ...highCapacityBuildings.slice(0, 1).map((building, idx) => ({
    id: congestedBuildings.length + idx + 2,
    severity: "low" as const,
    message: `${building.name} performing optimally`,
    detail: `${building.wifi}% Wi-Fi capacity • Low latency ${building.latency}ms`,
    action: "No action required",
    time: `${congestedBuildings.length + idx + 15}m ago`,
    building: building.name,
    icon: CheckCircle2,
  })),
]

export function ITDashboard() {
  const totalThroughput = campusLocations.reduce((acc, loc) => {
    const value = parseFloat(loc.throughput)
    return acc + (loc.throughput.includes('Gbps') ? value * 1000 : value)
  }, 0)

  const avgThroughput = Math.round(totalThroughput / campusLocations.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header with UTD + Verizon Branding */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-[1800px] mx-auto">
            <div className="flex items-center gap-4">
              {/* UTD Logo Area */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>
                  <div className="relative">
                    <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent leading-none mb-1">
                    Campus Connectivity Heatmap
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    UT Dallas Network Operations • Powered by Verizon 5G
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700 px-3 py-1.5">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                <span className="font-semibold text-sm">All Systems Operational</span>
              </Badge>
              <Button variant="outline" size="sm" className="gap-2 border-slate-300 dark:border-slate-700">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md shadow-orange-500/20">
                <RefreshCcw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-[1800px] mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Wifi className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Avg WiFi</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{avgWifi}%</p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-red-600 dark:text-red-400 font-semibold">-5%</span>
                    <span className="text-slate-500 dark:text-slate-400">from last hour</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <Signal className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Avg Latency</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{avgLatency}ms</p>
                  <div className="flex items-center gap-1.5 text-sm">
                    {avgLatency < 30 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 dark:text-green-400 font-semibold">Excellent</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-orange-600 dark:text-orange-400 font-semibold">Needs attention</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Avg Throughput</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{avgThroughput}<span className="text-2xl text-slate-500 dark:text-slate-400 ml-1">Mbps</span></p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 font-semibold">+12%</span>
                    <span className="text-slate-500 dark:text-slate-400">peak performance</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Connected Devices</p>
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{totalDevices.toLocaleString()}</p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-400 font-medium">across {campusLocations.length} buildings</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 5 Busiest Buildings + Real-Time Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top 5 Busiest Buildings */}
          <Card className="lg:col-span-1 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Top 5 Busiest Buildings</CardTitle>
                    <CardDescription className="text-xs">Highest device density</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {top5BusiestBuildings.map((building, index) => (
                  <div
                    key={building.name}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{building.fullName}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-500" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{building.devices}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Wifi className="h-3 w-3 text-slate-500" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{building.wifi}%</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 ${
                            building.status === 'congested'
                              ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
                              : building.status === 'optimal'
                              ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700'
                              : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700'
                          }`}
                        >
                          {building.status === 'congested' ? 'Congested' : building.status === 'optimal' ? 'Optimal' : 'High Capacity'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-Time Alerts */}
          <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Real-Time Alerts</CardTitle>
                    <CardDescription className="text-xs">Campus network status updates</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[280px] pr-2">
                <div className="space-y-2">
                  {alerts.map((alert) => {
                    const Icon = alert.icon
                    return (
                      <div
                        key={alert.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                          alert.severity === "high"
                            ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50"
                            : alert.severity === "warning"
                            ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/50"
                            : "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            alert.severity === "high"
                              ? "bg-red-100 dark:bg-red-900/30"
                              : alert.severity === "warning"
                              ? "bg-orange-100 dark:bg-orange-900/30"
                              : "bg-green-100 dark:bg-green-900/30"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              alert.severity === "high"
                                ? "text-red-600 dark:text-red-400"
                                : alert.severity === "warning"
                                ? "text-orange-600 dark:text-orange-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{alert.message}</p>
                            <Badge
                              variant="outline"
                              className={`shrink-0 text-[10px] px-2 py-0.5 font-bold uppercase ${
                                alert.severity === "high"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
                                  : alert.severity === "warning"
                                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700"
                                  : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
                              }`}
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{alert.detail}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                              <Clock className="h-3 w-3" />
                              <span>{alert.time}</span>
                              <span>•</span>
                              <span className="font-medium">{alert.building}</span>
                            </div>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{alert.action}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Network Performance Trends</CardTitle>
                  <CardDescription className="text-xs">Wi-Fi & 5G performance over last hour</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  wifi: {
                    label: "Wi-Fi",
                    color: "hsl(217, 91%, 60%)",
                  },
                  cellular: {
                    label: "5G",
                    color: "hsl(142, 71%, 45%)",
                  },
                }}
                className="h-[280px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkData}>
                    <defs>
                      <linearGradient id="wifiGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="cellularGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="time" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                    <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Area type="monotone" dataKey="wifi" stroke="hsl(217, 91%, 60%)" fill="url(#wifiGradient)" strokeWidth={3} name="Wi-Fi %" />
                    <Area type="monotone" dataKey="cellular" stroke="hsl(142, 71%, 45%)" fill="url(#cellularGradient)" strokeWidth={3} name="5G %" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Building Performance Overview</CardTitle>
                  <CardDescription className="text-xs">Wi-Fi & 5G signal strength by location</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  wifi: {
                    label: "Wi-Fi",
                    color: "hsl(217, 91%, 60%)",
                  },
                  cellular: {
                    label: "5G",
                    color: "hsl(142, 71%, 45%)",
                  },
                }}
                className="h-[280px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={buildingStats}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="name" className="text-xs" angle={-45} textAnchor="end" height={80} stroke="hsl(var(--muted-foreground))" />
                    <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="wifi" fill="hsl(217, 91%, 60%)" name="Wi-Fi %" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="cellular" fill="hsl(142, 71%, 45%)" name="5G %" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Network Metrics & Device Density */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <DatabaseZap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Network Infrastructure</CardTitle>
                  <CardDescription className="text-xs">Current system metrics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Server className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Access Points</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{campusLocations.length * 8}</p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Throughput</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{(totalThroughput / 1000).toFixed(1)}<span className="text-xl text-slate-500 dark:text-slate-400 ml-1">Gbps</span></p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <Download className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Avg Download</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{avgThroughput}<span className="text-xl text-slate-500 dark:text-slate-400 ml-1">Mbps</span></p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Radio className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">5G Edge Nodes</span>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">8</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl border border-green-200 dark:border-green-900/50 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-slate-900/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Network Health</span>
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 text-xs">
                    Excellent
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">Packet Loss Rate</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">0.03%</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[3%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Device Density Heatmap</CardTitle>
                  <CardDescription className="text-xs">Connected devices per building</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {buildingStats.slice(0, 8).map((building) => {
                  const maxDevices = Math.max(...buildingStats.map(b => b.devices))
                  const widthPercent = (building.devices / maxDevices) * 100
                  
                  return (
                    <div key={building.name} className="flex items-center gap-3">
                      <div className="w-32 flex-shrink-0">
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{building.fullName}</p>
                      </div>
                      <div className="flex-1 relative">
                        <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative">
                          <div
                            className={`h-full rounded-lg flex items-center justify-end px-2 transition-all duration-500 ${
                              building.status === 'congested'
                                ? 'bg-gradient-to-r from-red-500 to-red-400'
                                : building.status === 'optimal'
                                ? 'bg-gradient-to-r from-green-500 to-green-400'
                                : 'bg-gradient-to-r from-blue-500 to-blue-400'
                            }`}
                            style={{ width: `${Math.max(widthPercent, 15)}%` }}
                          >
                            <span className="text-xs font-bold text-white drop-shadow">
                              {building.devices}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 w-24 justify-end">
                        <Wifi className="h-3 w-3 text-slate-500" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{building.wifi}%</span>
                        <Signal className="h-3 w-3 text-slate-500 ml-1" />
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{building.cellular}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verizon Branding Footer */}
        <div className="mt-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center">
                <div className="font-bold text-red-600 text-lg">V</div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Powered by Verizon 5G Ultra Wideband</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Enterprise Network Solutions • AWS Wavelength Integration</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700">
              v2.4.1
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
