"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, WifiOff, RefreshCw, Clock, Activity } from "lucide-react"
import { useRealTimeData } from "@/hooks/use-real-time-data"

export function RealTimeStatus() {
  const { isConnected, connectionStatus, reconnect, lastUpdate } = useRealTimeData()

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "connecting":
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "connecting":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "disconnected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    }
  }

  const formatLastUpdate = (timestamp: number) => {
    const now = Date.now()
    const diff = Math.floor((now - timestamp) / 1000)

    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="text-sm font-medium capitalize">{connectionStatus}</span>
          </div>
          <Badge className={getStatusColor()}>
            {connectionStatus === "connected" && (
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            )}
            {connectionStatus}
          </Badge>
        </div>

        {isConnected && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Last update: {formatLastUpdate(lastUpdate)}</span>
            </div>
          </div>
        )}

        {connectionStatus === "disconnected" && (
          <Button onClick={reconnect} size="sm" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reconnect
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
