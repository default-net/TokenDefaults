"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Shield, BarChart3, Search, Settings, Menu, Home, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Market Data", href: "/market", icon: TrendingUp },
  { name: "Verification", href: "/verify", icon: Shield },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Search", href: "/search", icon: Search },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-card">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-4 border-b">
            <Shield className="h-8 w-8 text-accent" />
            <div className="ml-3">
              <h1 className="text-lg font-semibold">CryptoVerify</h1>
              <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
                Pro
              </Badge>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b bg-card">
          <div className="flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-accent" />
                  <div className="ml-3">
                    <h1 className="text-lg font-semibold">CryptoVerify</h1>
                    <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
                      Pro
                    </Badge>
                  </div>
                </div>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="ml-4">
              <Shield className="h-6 w-6 text-accent" />
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
      </div>
    </>
  )
}
