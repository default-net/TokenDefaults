"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, Zap, Target, BarChart3 } from "lucide-react"

const technicalIndicators = [
  { name: "RSI (14)", value: 65.4, signal: "neutral", description: "Relative Strength Index" },
  { name: "MACD", value: 0.0012, signal: "bullish", description: "Moving Average Convergence Divergence" },
  { name: "Bollinger Bands", value: "Upper", signal: "overbought", description: "Price near upper band" },
  { name: "SMA (20)", value: 1.0008, signal: "bullish", description: "Simple Moving Average" },
  { name: "EMA (12)", value: 1.0011, signal: "bullish", description: "Exponential Moving Average" },
  { name: "Stochastic", value: 72.3, signal: "overbought", description: "Stochastic Oscillator" },
]

const marketSentiment = [
  { metric: "Fear & Greed Index", value: 68, max: 100, status: "greed" },
  { metric: "Social Sentiment", value: 75, max: 100, status: "positive" },
  { metric: "News Sentiment", value: 82, max: 100, status: "very positive" },
  { metric: "Technical Analysis", value: 65, max: 100, status: "bullish" },
]

export function MarketIndicators() {
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "bullish":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-100"
      case "bearish":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-100"
      case "overbought":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-100"
      case "oversold":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getSentimentColor = (status: string) => {
    switch (status) {
      case "very positive":
      case "greed":
        return "bg-green-500"
      case "positive":
      case "bullish":
        return "bg-green-400"
      case "neutral":
        return "bg-yellow-400"
      case "negative":
        return "bg-red-400"
      case "very negative":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Technical Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Technical Indicators
          </CardTitle>
          <CardDescription>Real-time technical analysis signals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {technicalIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{indicator.name}</span>
                  <Badge className={getSignalColor(indicator.signal)}>{indicator.signal}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{indicator.description}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold">
                  {typeof indicator.value === "number" ? indicator.value.toFixed(4) : indicator.value}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Market Sentiment
          </CardTitle>
          <CardDescription>Overall market mood and sentiment analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketSentiment.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.metric}</span>
                <span className="text-sm text-muted-foreground">
                  {item.value}/{item.max}
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={(item.value / item.max) * 100} className="h-2" />
                <div className="flex items-center justify-between">
                  <Badge className={`${getSentimentColor(item.status)} text-white`}>{item.status}</Badge>
                  <span className="text-xs text-muted-foreground">{((item.value / item.max) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Price Targets
          </CardTitle>
          <CardDescription>Analyst predictions and support/resistance levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-950">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">Resistance 2</span>
              </div>
              <span className="font-semibold text-green-600">$1.0025</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 dark:bg-green-950">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium">Resistance 1</span>
              </div>
              <span className="font-semibold text-green-600">$1.0015</span>
            </div>
            <div className="flex items-center justify-between p-3 border-2 border-accent rounded-lg bg-accent/10">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="font-medium">Current Price</span>
              </div>
              <span className="font-semibold text-accent">$1.0001</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 dark:bg-red-950">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="font-medium">Support 1</span>
              </div>
              <span className="font-semibold text-red-600">$0.9995</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 dark:bg-red-950">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="font-medium">Support 2</span>
              </div>
              <span className="font-semibold text-red-600">$0.9985</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Market Statistics
          </CardTitle>
          <CardDescription>Key market metrics and performance data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h High</span>
              <span className="font-semibold text-green-600">$1.0025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h Low</span>
              <span className="font-semibold text-red-600">$0.9990</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">24h Volume</span>
              <span className="font-semibold">45.2M POL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Market Cap Rank</span>
              <span className="font-semibold">#15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Circulating Supply</span>
              <span className="font-semibold">134B POL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Supply</span>
              <span className="font-semibold">10T POL</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">All-Time High</span>
              <span className="font-semibold">$2.92</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">All-Time Low</span>
              <span className="font-semibold">$0.0031</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
