"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Shield, Activity, DollarSign, CheckCircle, AlertTriangle } from "lucide-react"
import { cryptoConfig, formatPrice, formatMarketCap } from "@/lib/crypto-config"
import { useRealTimeData } from "@/hooks/use-real-time-data"

export function StatsOverview() {
  const { data } = useRealTimeData()
  const currentPrice = data.prices[0] || {
    price: cryptoConfig.defaultPrice,
    changePercent: cryptoConfig.defaultChange,
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Price Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Price</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(currentPrice.price)}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingDown className="h-3 w-3 mr-1 text-destructive" />
            {currentPrice.changePercent}
          </div>
        </CardContent>
      </Card>

      {/* Market Cap Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatMarketCap(data.marketCap)}</div>
          <p className="text-xs text-muted-foreground">Rate: {cryptoConfig.defaultRate}</p>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verification</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Verified</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Contract validated</p>
        </CardContent>
      </Card>

      {/* Activity Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Network Status</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Active</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Status 1 Performance</span>
              <span className="font-medium">{cryptoConfig.defaultPercent1}</span>
            </div>
            <Progress value={85} className="h-2" />
            <Badge variant="secondary" className="text-xs">
              {cryptoConfig.defaultStatus1}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Status 2 Performance</span>
              <span className="font-medium">{cryptoConfig.defaultPercent2}</span>
            </div>
            <Progress value={65} className="h-2" />
            <Badge variant="secondary" className="text-xs">
              {cryptoConfig.defaultStatus2}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Contract Verified</p>
                <p className="text-xs text-muted-foreground">{cryptoConfig.contractAddress.slice(0, 10)}...</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {cryptoConfig.deployDate}
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="h-4 w-4 text-blue-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Price Update</p>
                <p className="text-xs text-muted-foreground">{formatPrice(currentPrice.price)}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Market Alert</p>
                <p className="text-xs text-muted-foreground">Volume threshold reached</p>
              </div>
              <Badge variant="outline" className="text-xs">
                2h ago
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
