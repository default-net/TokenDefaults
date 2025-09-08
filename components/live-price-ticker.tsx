"use client"

import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useRealTimeData } from "@/hooks/use-real-time-data"
import { usePriceAlerts } from "@/hooks/use-price-alerts"
import { formatPrice } from "@/lib/crypto-config"

export function LivePriceTicker() {
  const { data, isConnected } = useRealTimeData()
  const { checkAlerts } = usePriceAlerts()

  const currentPrice = data.prices[0]

  useEffect(() => {
    if (currentPrice) {
      checkAlerts(currentPrice.price, currentPrice.symbol)
    }
  }, [currentPrice, checkAlerts])

  if (!isConnected || !currentPrice) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        <Activity className="h-4 w-4 animate-pulse" />
        <span className="text-sm">Connecting to live data...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4 p-3 bg-card border rounded-lg">
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="bg-accent text-accent-foreground">
          {currentPrice.symbol}
        </Badge>
        <span className="font-semibold text-lg">{formatPrice(currentPrice.price)}</span>
      </div>

      <div className={`flex items-center space-x-1 ${currentPrice.change >= 0 ? "text-green-600" : "text-red-600"}`}>
        {currentPrice.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span className="text-sm font-medium">{currentPrice.changePercent}</span>
      </div>

      <div className="text-xs text-muted-foreground">Vol: {(currentPrice.volume / 1e6).toFixed(1)}M</div>

      <div className="flex items-center space-x-1">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
    </div>
  )
}
