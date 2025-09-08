"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export interface PriceAlert {
  id: string
  symbol: string
  targetPrice: number
  condition: "above" | "below"
  isActive: boolean
  createdAt: number
}

export function usePriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([])
  const { toast } = useToast()

  const addAlert = useCallback(
    (symbol: string, targetPrice: number, condition: "above" | "below") => {
      const newAlert: PriceAlert = {
        id: Math.random().toString(36).substr(2, 9),
        symbol,
        targetPrice,
        condition,
        isActive: true,
        createdAt: Date.now(),
      }

      setAlerts((prev) => [...prev, newAlert])

      toast({
        title: "Price Alert Created",
        description: `Alert set for ${symbol} ${condition} $${targetPrice}`,
      })
    },
    [toast],
  )

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }, [])

  const toggleAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, isActive: !alert.isActive } : alert)))
  }, [])

  const checkAlerts = useCallback(
    (currentPrice: number, symbol: string) => {
      alerts.forEach((alert) => {
        if (!alert.isActive || alert.symbol !== symbol) return

        const shouldTrigger =
          (alert.condition === "above" && currentPrice >= alert.targetPrice) ||
          (alert.condition === "below" && currentPrice <= alert.targetPrice)

        if (shouldTrigger) {
          toast({
            title: "Price Alert Triggered!",
            description: `${symbol} is now ${alert.condition} $${alert.targetPrice} (Current: $${currentPrice})`,
            variant: "default",
          })

          // Deactivate the alert after triggering
          setAlerts((prev) => prev.map((a) => (a.id === alert.id ? { ...a, isActive: false } : a)))
        }
      })
    },
    [alerts, toast],
  )

  return {
    alerts,
    addAlert,
    removeAlert,
    toggleAlert,
    checkAlerts,
  }
}
