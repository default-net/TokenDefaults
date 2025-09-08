"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  Clock,
  FileText,
  Zap,
} from "lucide-react"
import { isValidContractAddress } from "@/lib/crypto-config"

interface VerificationResult {
  address: string
  isVerified: boolean
  trustScore: number
  contractName?: string
  compiler?: string
  optimization?: boolean
  runs?: number
  sourceCode?: boolean
  abi?: boolean
  timestamp: string
  risks: string[]
  features: string[]
}

const mockVerificationResults: VerificationResult[] = [
  {
    address: "0x472dbd86732d57a3a0d9db441c6df91a3e0f298e",
    isVerified: true,
    trustScore: 95,
    contractName: "POL Token",
    compiler: "v0.8.19+commit.7dd6d404",
    optimization: true,
    runs: 200,
    sourceCode: true,
    abi: true,
    timestamp: "2024-05-31T10:30:00Z",
    risks: [],
    features: ["ERC-20", "Mintable", "Pausable", "Ownable"],
  },
  {
    address: "0x1234567890123456789012345678901234567890",
    isVerified: false,
    trustScore: 45,
    timestamp: "2024-09-04T15:20:00Z",
    risks: ["Unverified source code", "No audit found", "High complexity"],
    features: [],
  },
]

export function ContractVerification() {
  const [address, setAddress] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState("")

  const handleVerify = async () => {
    setError("")
    setVerificationResult(null)

    if (!address) {
      setError("Please enter a contract address")
      return
    }

    if (!isValidContractAddress(address)) {
      setError("Invalid contract address format")
      return
    }

    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      const result = mockVerificationResults.find((r) => r.address.toLowerCase() === address.toLowerCase()) || {
        address,
        isVerified: false,
        trustScore: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString(),
        risks: ["Unknown contract", "No verification data"],
        features: [],
      }

      setVerificationResult(result)
      setIsVerifying(false)
    }, 2000)
  }

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrustScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100 dark:bg-green-900"
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-900"
    return "bg-red-100 dark:bg-red-900"
  }

  return (
    <div className="space-y-6">
      {/* Verification Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Contract Verification
          </CardTitle>
          <CardDescription>Enter a contract address to verify its authenticity and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contract-address">Contract Address</Label>
            <div className="flex space-x-2">
              <Input
                id="contract-address"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono"
              />
              <Button onClick={handleVerify} disabled={isVerifying}>
                {isVerifying ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isVerifying && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Verification Progress</span>
                <span>Analyzing contract...</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Results */}
      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {verificationResult.isVerified ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                Verification Results
              </div>
              <Badge className={getTrustScoreBg(verificationResult.trustScore)}>
                <span className={getTrustScoreColor(verificationResult.trustScore)}>
                  Trust Score: {verificationResult.trustScore}%
                </span>
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contract Address</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono break-all">
                        {verificationResult.address}
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
                    <Label className="text-sm font-medium text-muted-foreground">Verification Status</Label>
                    <div className="mt-1">
                      {verificationResult.isVerified ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle className="h-3 w-3 mr-1" />
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Trust Score</Label>
                  <div className="mt-2 space-y-2">
                    <Progress value={verificationResult.trustScore} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      Based on code verification, audit status, and community trust
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                {verificationResult.isVerified ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Contract Name</Label>
                        <p className="mt-1 font-medium">{verificationResult.contractName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Compiler Version</Label>
                        <p className="mt-1 font-mono text-sm">{verificationResult.compiler}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Optimization</Label>
                        <div className="mt-1 flex items-center space-x-2">
                          {verificationResult.optimization ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            {verificationResult.optimization ? `Enabled (${verificationResult.runs} runs)` : "Disabled"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Source Code</Label>
                        <div className="mt-1 flex items-center space-x-2">
                          {verificationResult.sourceCode ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            {verificationResult.sourceCode ? "Available" : "Not Available"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>Contract details are not available for unverified contracts.</AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                {verificationResult.risks.length > 0 ? (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Security Risks</Label>
                    <div className="mt-2 space-y-2">
                      {verificationResult.risks.map((risk, index) => (
                        <Alert key={index} variant="destructive">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>{risk}</AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>No security risks detected.</AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                {verificationResult.features.length > 0 ? (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Contract Features</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {verificationResult.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          <Zap className="h-3 w-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>No contract features identified.</AlertDescription>
                  </Alert>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Recent Verifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
          <CardDescription>Previously verified contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockVerificationResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {result.isVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="font-mono text-sm">
                      {result.address.slice(0, 10)}...{result.address.slice(-8)}
                    </p>
                    <p className="text-xs text-muted-foreground">{result.contractName || "Unknown Contract"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTrustScoreBg(result.trustScore)}>
                    <span className={getTrustScoreColor(result.trustScore)}>{result.trustScore}%</span>
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => setVerificationResult(result)}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
