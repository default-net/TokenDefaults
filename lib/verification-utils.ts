export interface ContractMetadata {
  name?: string
  symbol?: string
  decimals?: number
  totalSupply?: string
  owner?: string
  implementation?: string
}

export interface SecurityAnalysis {
  riskLevel: "low" | "medium" | "high"
  vulnerabilities: string[]
  recommendations: string[]
  auditStatus: "audited" | "unaudited" | "pending"
}

export const analyzeContract = async (address: string): Promise<SecurityAnalysis> => {
  // Simulate contract analysis
  const riskFactors = Math.random()

  if (riskFactors < 0.3) {
    return {
      riskLevel: "low",
      vulnerabilities: [],
      recommendations: ["Contract appears secure", "Regular monitoring recommended"],
      auditStatus: "audited",
    }
  } else if (riskFactors < 0.7) {
    return {
      riskLevel: "medium",
      vulnerabilities: ["Centralized ownership", "No timelock on critical functions"],
      recommendations: ["Consider decentralizing ownership", "Implement timelock mechanisms"],
      auditStatus: "unaudited",
    }
  } else {
    return {
      riskLevel: "high",
      vulnerabilities: ["Unverified source code", "Potential reentrancy issues", "No access controls"],
      recommendations: ["Verify source code", "Conduct security audit", "Implement proper access controls"],
      auditStatus: "unaudited",
    }
  }
}

export const calculateTrustScore = (
  isVerified: boolean,
  hasSourceCode: boolean,
  isAudited: boolean,
  riskLevel: string,
  communityTrust = 50,
): number => {
  let score = 0

  if (isVerified) score += 30
  if (hasSourceCode) score += 25
  if (isAudited) score += 25

  switch (riskLevel) {
    case "low":
      score += 15
      break
    case "medium":
      score += 8
      break
    case "high":
      score += 0
      break
  }

  score += Math.min(communityTrust * 0.05, 5)

  return Math.min(Math.max(score, 0), 100)
}

export const formatContractAddress = (address: string): string => {
  if (address.length !== 42) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const getExplorerUrl = (address: string, network = "ethereum"): string => {
  const explorers = {
    ethereum: "https://etherscan.io/address/",
    polygon: "https://polygonscan.com/address/",
    bsc: "https://bscscan.com/address/",
  }

  return `${explorers[network as keyof typeof explorers] || explorers.ethereum}${address}`
}
