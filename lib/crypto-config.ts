export interface CryptoConfig {
  defaultPrice: number
  defaultRate: number
  defaultSymbol: string
  defaultChange: string
  defaultMarketCap: number
  defaultPercent1: string
  defaultPercent2: string
  defaultStatus1: string
  defaultStatus2: string
  contractAddress: string
  publishDate: string
  deployDate: string
  deployKey: string
  deployId: number
}

export const cryptoConfig: CryptoConfig = {
  defaultPrice: 1.0001,
  defaultRate: 3.472847,
  defaultSymbol: "POL",
  defaultChange: "< -0.01%",
  defaultMarketCap: 134000000000,
  defaultPercent1: "5.56%",
  defaultPercent2: "3.44%",
  defaultStatus1: "Fixed",
  defaultStatus2: "Fixed",
  contractAddress: "0x472dbd86732d57a3a0d9db441c6df91a3e0f298e",
  publishDate: "2024-05-31",
  deployDate: "2025-09-04",
  deployKey: "K",
  deployId: 99,
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
  }).format(price)
}

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`
  }
  return `$${marketCap.toLocaleString()}`
}

export const isValidContractAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
