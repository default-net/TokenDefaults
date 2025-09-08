import { DashboardNav } from "@/components/dashboard-nav"
import { AdvancedMarketCharts } from "@/components/advanced-market-charts"
import { MarketIndicators } from "@/components/market-indicators"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, RefreshCw, Download } from "lucide-react"

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <div className="lg:pl-64">
        <main className="flex-1">
          {/* Header */}
          <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <div className="px-4 py-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Market Data</h1>
                  <p className="text-muted-foreground">Comprehensive cryptocurrency market analysis and insights</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Real-time Data
                  </Badge>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Market Content */}
          <div className="px-4 py-6 lg:px-8 space-y-8">
            {/* Advanced Charts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Market Analysis
                </h2>
              </div>
              <AdvancedMarketCharts />
            </div>

            {/* Market Indicators */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Technical Analysis & Sentiment</h2>
              <MarketIndicators />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
