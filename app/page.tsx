import { DashboardNav } from "@/components/dashboard-nav"
import { StatsOverview } from "@/components/stats-overview"
import { MarketChart } from "@/components/market-chart"
import { RealTimeStatus } from "@/components/real-time-status"
import { PriceAlerts } from "@/components/price-alerts"
import { LivePriceTicker } from "@/components/live-price-ticker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cryptoConfig } from "@/lib/crypto-config"
import { Shield, ExternalLink, Copy } from "lucide-react"

export default function CryptoPlatform() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="flex-1">
          {/* Header */}
          <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
            <div className="px-4 py-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                  <p className="text-muted-foreground">Monitor cryptocurrency verification and market data</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Live Data
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="px-4 py-6 lg:px-8 space-y-8">
            {/* Live Price Ticker */}
            <LivePriceTicker />

            {/* Stats Overview */}
            <StatsOverview />

            {/* Real-time Components Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Market Analysis</h2>
                  <MarketChart />
                </div>
              </div>
              <div className="space-y-6">
                <RealTimeStatus />
                <PriceAlerts />
              </div>
            </div>

            {/* Contract Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contract Details</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Verified Contract Information
                  </CardTitle>
                  <CardDescription>Detailed information about the verified smart contract</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Contract Address</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono break-all">
                            {cryptoConfig.contractAddress}
                          </code>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Token Symbol</label>
                        <p className="mt-1 text-lg font-semibold">{cryptoConfig.defaultSymbol}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Deployment Information</label>
                        <div className="mt-1 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Deploy Key:</span>
                            <code className="text-sm font-mono">{cryptoConfig.deployKey}</code>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Deploy ID:</span>
                            <code className="text-sm font-mono">{cryptoConfig.deployId}</code>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Deploy Date:</span>
                            <span className="text-sm">{cryptoConfig.deployDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Publish Date:</span>
                            <span className="text-sm">{cryptoConfig.publishDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Verification Status</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Verified & Secure
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
