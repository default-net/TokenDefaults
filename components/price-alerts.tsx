"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { usePriceAlerts } from "@/hooks/use-price-alerts"
import { cryptoConfig } from "@/lib/crypto-config"

export function PriceAlerts() {
  const { alerts, addAlert, removeAlert, toggleAlert } = usePriceAlerts()
  const [newAlertPrice, setNewAlertPrice] = useState("")
  const [newAlertCondition, setNewAlertCondition] = useState<"above" | "below">("above")

  const handleAddAlert = () => {
    const price = Number.parseFloat(newAlertPrice)
    if (isNaN(price) || price <= 0) return

    addAlert(cryptoConfig.defaultSymbol, price, newAlertCondition)
    setNewAlertPrice("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          Price Alerts
        </CardTitle>
        <CardDescription>Set up notifications for price movements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Alert */}
        <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
          <h4 className="font-medium text-sm">Create New Alert</h4>
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <Label htmlFor="alert-price" className="text-xs">
                Target Price
              </Label>
              <Input
                id="alert-price"
                type="number"
                step="0.0001"
                placeholder="1.0000"
                value={newAlertPrice}
                onChange={(e) => setNewAlertPrice(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Condition</Label>
              <Select
                value={newAlertCondition}
                onValueChange={(value: "above" | "below") => setNewAlertCondition(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Above</SelectItem>
                  <SelectItem value="below">Below</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Symbol</Label>
              <Input value={cryptoConfig.defaultSymbol} disabled />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddAlert} size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Active Alerts ({alerts.filter((a) => a.isActive).length})</h4>
          {alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No price alerts set. Create one above to get notified of price movements.
            </p>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {alert.condition === "above" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className="font-medium text-sm">
                        {alert.symbol} {alert.condition} ${alert.targetPrice}
                      </span>
                    </div>
                    <Badge variant={alert.isActive ? "default" : "secondary"}>
                      {alert.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={alert.isActive} onCheckedChange={() => toggleAlert(alert.id)} />
                    <Button variant="outline" size="sm" onClick={() => removeAlert(alert.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
