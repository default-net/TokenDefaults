"use client"

import { useState, useEffect, useCallback } from "react"
import { cryptoConfig } from "@/lib/crypto-config"

export interface RealTimePrice {
  symbol: string
  price: number
  change: number
  changePercent: string
  volume: number
  timestamp: number
}

export interface RealTimeMarketData {
  prices: RealTimePrice[]
  marketCap: number
  totalVolume: number
  activeTraders: number
  avgTradeSize: number
  lastUpdate: number
}

export function useRealTimeData() {
  const [data, setData] = useState<RealTimeMarketData>({
    prices: [
      {
        symbol: cryptoConfig.defaultSymbol,
        price: cryptoConfig.defaultPrice,
        change: -0.01,
        changePercent: cryptoConfig.defaultChange,
        volume: 45200000,
        timestamp: Date.now(),
      },
    ],
    marketCap: cryptoConfig.defaultMarketCap,
    totalVolume: 45200000,
    activeTraders: 8432,
    avgTradeSize: 5347,
    lastUpdate: Date.now(),
  })

  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")

  const generateRandomUpdate = useCallback(() => {
    const basePrice = cryptoConfig.defaultPrice
    const priceVariation = (Math.random() - 0.5) * 0.002 // ±0.1% variation
    const newPrice = Math.max(0, basePrice + priceVariation)
    const change = ((newPrice - basePrice) / basePrice) * 100

    return {
      symbol: cryptoConfig.defaultSymbol,
      price: Number(newPrice.toFixed(6)),
      change: Number(change.toFixed(4)),
      changePercent: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
      volume: Math.floor(45000000 + Math.random() * 10000000),
      timestamp: Date.now(),
    }
  }, [])

  const updateMarketData = useCallback(() => {
    const newPriceData = generateRandomUpdate()

    setData((prevData) => ({
      ...prevData,
      prices: [newPriceData],
      totalVolume: newPriceData.volume,
      activeTraders: Math.floor(8000 + Math.random() * 1000),
      avgTradeSize: Math.floor(5000 + Math.random() * 1000),
      lastUpdate: Date.now(),
    }))
  }, [generateRandomUpdate])

  useEffect(() => {
    // Simulate connection process
    const connectTimer = setTimeout(() => {
      setIsConnected(true)
      setConnectionStatus("connected")
    }, 1000)

    return () => clearTimeout(connectTimer)
  }, [])

  useEffect(() => {
    if (!isConnected) return

    // Update data every 3 seconds
    const interval = setInterval(updateMarketData, 3000)

    return () => clearInterval(interval)
  }, [isConnected, updateMarketData])

  const reconnect = useCallback(() => {
    setConnectionStatus("connecting")
    setIsConnected(false)

    setTimeout(() => {
      setIsConnected(true)
      setConnectionStatus("connected")
    }, 2000)
  }, [])

  return {
    data,
    isConnected,
    connectionStatus,
    reconnect,
    lastUpdate: data.lastUpdate,
  }
}
