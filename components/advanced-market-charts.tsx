"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, PieChartIcon } from "lucide-react"

const priceData = [
  { time: "00:00", price: 1.0001, volume: 2400, high: 1.0015, low: 0.9995 },
  { time: "02:00", price: 1.0008, volume: 1800, high: 1.002, low: 1.0001 },
  { time: "04:00", price: 1.0015, volume: 1398, high: 1.0025, low: 1.0008 },
  { time: "06:00", price: 1.0012, volume: 2100, high: 1.0018, low: 1.0005 },
  { time: "08:00", price: 0.9998, volume: 9800, high: 1.0012, low: 0.999 },
  { time: "10:00", price: 1.0005, volume: 4200, high: 1.001, low: 0.9998 },
  { time: "12:00", price: 1.0008, volume: 3908, high: 1.0015, low: 1.0002 },
  { time: "14:00", price: 1.0018, volume: 5600, high: 1.0025, low: 1.0008 },
  { time: "16:00", price: 1.0012, volume: 4800, high: 1.002, low: 1.001 },
  { time: "18:00", price: 1.0009, volume: 3200, high: 1.0015, low: 1.0005 },
  { time: "20:00", price: 1.0001, volume: 3800, high: 1.0012, low: 0.9998 },
  { time: "22:00", price: 1.0006, volume: 2900, high: 1.001, low: 1.0001 },
]

const marketCapData = [
  { name: "POL", value: 134000000000, color: "hsl(var(--chart-1))" },
  { name: "ETH", value: 280000000000, color: "hsl(var(--chart-2))" },
  { name: "BTC", value: 580000000000, color: "hsl(var(--chart-3))" },
  { name: "Others", value: 200000000000, color: "hsl(var(--chart-4))" },
]

const tradingPairs = [
  { pair: "POL/USDT", price: 1.0001, change: -0.01, volume: "2.4M", high: 1.0025, low: 0.999 },
  { pair: "POL/ETH", price: 0.0003, change: 0.15, volume: "1.8M", high: 0.0003, low: 0.0002 },
  { pair: "POL/BTC", price: 0.000015, change: -0.05, volume: "950K", high: 0.000016, low: 0.000014 },
]

export function AdvancedMarketCharts() {
  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.2M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Dominance</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11.2%</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -0.3%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Traders</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.2%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Trade Size</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,347</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.1%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Market Analysis</CardTitle>
          <CardDescription>Comprehensive price and volume analysis with technical indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="price">Price Chart</TabsTrigger>
              <TabsTrigger value="volume">Volume Analysis</TabsTrigger>
              <TabsTrigger value="ohlc">OHLC Data</TabsTrigger>
              <TabsTrigger value="distribution">Market Cap</TabsTrigger>
            </TabsList>

            <TabsContent value="price" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Price Movement (24H)</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    1H
                  </Button>
                  <Button variant="outline" size="sm">
                    4H
                  </Button>
                  <Button variant="default" size="sm">
                    1D
                  </Button>
                  <Button variant="outline" size="sm">
                    1W
                  </Button>
                  <Button variant="outline" size="sm">
                    1M
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs fill-muted-foreground" />
                  <YAxis domain={["dataMin - 0.0005", "dataMax + 0.0005"]} className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [`$${value}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="volume" className="space-y-4">
              <h3 className="text-lg font-semibold">Trading Volume Analysis</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [`${value}`, "Volume"]}
                  />
                  <Bar dataKey="volume" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="ohlc" className="space-y-4">
              <h3 className="text-lg font-semibold">OHLC (Open, High, Low, Close)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs fill-muted-foreground" />
                  <YAxis domain={["dataMin - 0.0005", "dataMax + 0.0005"]} className="text-xs fill-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="high" stroke="hsl(var(--chart-2))" strokeWidth={1} dot={false} />
                  <Line type="monotone" dataKey="low" stroke="hsl(var(--chart-3))" strokeWidth={1} dot={false} />
                  <Line type="monotone" dataKey="price" stroke="hsl(var(--accent))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="distribution" className="space-y-4">
              <h3 className="text-lg font-semibold">Market Cap Distribution</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketCapData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {marketCapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: any) => [`$${(value / 1e9).toFixed(1)}B`, "Market Cap"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {marketCapData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">${(item.value / 1e9).toFixed(1)}B</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Trading Pairs */}
      <Card>
        <CardHeader>
          <CardTitle>Active Trading Pairs</CardTitle>
          <CardDescription>Real-time trading data for POL pairs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tradingPairs.map((pair, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold">{pair.pair}</p>
                    <p className="text-sm text-muted-foreground">
                      H: {pair.high} L: {pair.low}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">${pair.price}</p>
                    <div
                      className={`flex items-center text-sm ${pair.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {pair.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {pair.change >= 0 ? "+" : ""}
                      {pair.change}%
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{pair.volume}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Trade
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
