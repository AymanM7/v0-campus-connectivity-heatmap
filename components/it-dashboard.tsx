"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, AlertTriangle, TrendingUp, TrendingDown, Wifi, Signal, Server, Users, Clock, Download, Upload, RefreshCcw, Zap, Radio, DatabaseZap } from 'lucide-react'
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { campusLocations } from "./student-view"

const buildingStats = campusLocations.map(loc => ({
  name: loc.shortName,
  wifi: loc.wifi,
  cellular: loc.cellular,
  devices: loc.devices,
  status: loc.status,
  latency: loc.latency,
  throughput: parseInt(loc.throughput),
}))

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
    message: `${building.name} - ${building.wifi}% Wi-Fi capacity, ${building.devices} active devices`,
    action: building.latency > 100 ? "Access point check needed" : "Load balance recommended",
    time: `${idx + 2} min ago`,
    building: building.name,
  })),
  ...highCapacityBuildings.slice(0, 2).map((building, idx) => ({
    id: congestedBuildings.length + idx + 1,
    severity: "low" as const,
    message: `${building.name} performing at optimal levels (${building.wifi}% Wi-Fi)`,
    action: "No action required",
    time: `${congestedBuildings.length + idx + 8} min ago`,
    building: building.name,
  })),
]

export function ITDashboard() {
  const totalThroughput = campusLocations.reduce((acc, loc) => {
    const value = parseFloat(loc.throughput)
    return acc + (loc.throughput.includes('Gbps') ? value * 1000 : value)
  }, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <div className="h-7 w-7 border-2 border-primary-foreground rounded flex items-center justify-center">
                  <div className="h-2.5 w-2.5 bg-primary-foreground rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground leading-tight">Network Command Center</h1>
                <p className="text-[10px] text-muted-foreground leading-tight">Powered by Verizon 5G Edge + AWS Wavelength</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1.5 bg-green-500/10 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 px-2.5 py-1 text-[10px]">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold">System Online</span>
              </Badge>
              <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
                <Download className="h-3 w-3" />
                Export
              </Button>
              <Button size="sm" className="gap-1.5 shadow-md h-8 text-xs">
                <RefreshCcw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Average Wi-Fi Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{avgWifi}%</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                    <TrendingDown className="h-2.5 w-2.5 text-red-500" />
                    <span className="text-red-500 font-semibold">-5%</span> from last hour
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                  <Wifi className="h-5 w-5 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">5G Network Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{avgCellular}%</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="h-2.5 w-2.5 text-green-500" />
                    <span className="text-green-500 font-semibold">+2%</span> from last hour
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                  <Signal className="h-5 w-5 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Active Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{totalDevices.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                    <TrendingUp className="h-2.5 w-2.5 text-blue-500" />
                    <span className="text-blue-500 font-semibold">Across {campusLocations.length} buildings</span>
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-4/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-chart-4" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">Average Latency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-foreground">{avgLatency}ms</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                    {avgLatency > 50 ? (
                      <>
                        <TrendingDown className="h-2.5 w-2.5 text-red-500" />
                        <span className="text-red-500 font-semibold">Needs attention</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-2.5 w-2.5 text-green-500" />
                        <span className="text-green-500 font-semibold">Excellent</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-primary" />
                Network Performance Trends
              </CardTitle>
              <CardDescription className="text-[10px]">Real-time Wi-Fi, 5G over the last hour</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  wifi: {
                    label: "Wi-Fi Performance",
                    color: "hsl(var(--chart-2))",
                  },
                  cellular: {
                    label: "5G Performance",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[260px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={networkData}>
                    <defs>
                      <linearGradient id="wifiGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-wifi)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--color-wifi)" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="cellularGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-cellular)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--color-cellular)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border opacity-50" />
                    <XAxis dataKey="time" className="text-[10px]" />
                    <YAxis className="text-[10px]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="wifi" stroke="var(--color-wifi)" fill="url(#wifiGradient)" strokeWidth={2} name="Wi-Fi %" />
                    <Area type="monotone" dataKey="cellular" stroke="var(--color-cellular)" fill="url(#cellularGradient)" strokeWidth={2} name="5G %" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-primary" />
                Building Performance Overview
              </CardTitle>
              <CardDescription className="text-[10px]">Current Wi-Fi and 5G signal by location</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  wifi: {
                    label: "Wi-Fi",
                    color: "hsl(var(--chart-2))",
                  },
                  cellular: {
                    label: "5G",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[260px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={buildingStats}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border opacity-50" />
                    <XAxis dataKey="name" className="text-[10px]" angle={-45} textAnchor="end" height={70} />
                    <YAxis className="text-[10px]" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="wifi" fill="var(--color-wifi)" name="Wi-Fi %" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="cellular" fill="var(--color-cellular)" name="5G %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Alerts */}
          <Card className="lg:col-span-2 border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                    Real-Time Alerts
                  </CardTitle>
                  <CardDescription className="text-[10px]">Network status updates from campus buildings</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[10px]">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-3">
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg border-2 border-border hover:bg-accent/50 transition-all duration-200 group"
                    >
                      <div
                        className={`p-1.5 rounded-lg ${
                          alert.severity === "high"
                            ? "bg-red-500/10"
                            : alert.severity === "medium"
                            ? "bg-yellow-500/10"
                            : "bg-green-500/10"
                        }`}
                      >
                        <AlertTriangle
                          className={`h-3.5 w-3.5 ${
                            alert.severity === "high"
                              ? "text-red-500"
                              : alert.severity === "medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <p className="text-[11px] font-semibold text-foreground leading-tight">{alert.message}</p>
                          <Badge
                            variant="outline"
                            className={`shrink-0 text-[9px] px-1.5 py-0 ${
                              alert.severity === "high"
                                ? "bg-red-500/10 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700"
                                : alert.severity === "medium"
                                ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700"
                                : "bg-green-500/10 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700"
                            }`}
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-[9px] text-muted-foreground mb-0.5">{alert.action}</p>
                        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                          <span>{alert.time}</span>
                          <span>•</span>
                          <span className="font-medium">{alert.building}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <DatabaseZap className="h-4 w-4 text-primary" />
                Network Metrics
              </CardTitle>
              <CardDescription className="text-[10px]">Current system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Server className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">Access Points</span>
                  </div>
                  <span className="text-base font-bold text-foreground">{campusLocations.length * 8}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Activity className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">Throughput</span>
                  </div>
                  <span className="text-base font-bold text-foreground">{(totalThroughput / 1000).toFixed(1)} Gbps</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Download className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">Avg Download</span>
                  </div>
                  <span className="text-base font-bold text-foreground">{Math.round(totalThroughput / campusLocations.length)} Mbps</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Upload className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">Avg Upload</span>
                  </div>
                  <span className="text-base font-bold text-foreground">{Math.round(totalThroughput / campusLocations.length / 2)} Mbps</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Radio className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-foreground">5G Edge Nodes</span>
                  </div>
                  <span className="text-base font-bold text-foreground">8</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-semibold text-muted-foreground">Packet Loss Rate</span>
                    <span className="text-[11px] font-bold text-foreground">0.03%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden border border-border">
                    <div className="h-full w-[3%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Excellent network health</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
