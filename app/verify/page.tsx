import { DashboardNav } from "@/components/dashboard-nav"
import { ContractVerification } from "@/components/contract-verification"

export default function VerifyPage() {
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
                  <h1 className="text-3xl font-bold tracking-tight">Contract Verification</h1>
                  <p className="text-muted-foreground">Verify smart contract authenticity and security</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Content */}
          <div className="px-4 py-6 lg:px-8">
            <ContractVerification />
          </div>
        </main>
      </div>
    </div>
  )
}
