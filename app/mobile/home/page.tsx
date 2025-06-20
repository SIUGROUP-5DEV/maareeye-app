"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Plus, TrendingUp, Eye, EyeOff, Send, CreditCard } from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function MobileHomePage() {
  const [showBalance, setShowBalance] = useState(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Load profile image on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  const transactions = [
    { id: 1, description: "Salary Deposit", amount: 5000, type: "income", date: "Today", time: "2:30 PM" },
    { id: 2, description: "Grocery Shopping", amount: -120, type: "expense", date: "Yesterday", time: "4:15 PM" },
    { id: 3, description: "Electric Bill", amount: -85, type: "expense", date: "Jan 13", time: "10:00 AM" },
    { id: 4, description: "Freelance Payment", amount: 800, type: "income", date: "Jan 12", time: "9:45 AM" },
  ]

  const quickActions = [
    { icon: Send, label: "Send", color: "bg-blue-500" },
    { icon: ArrowDownRight, label: "Request", color: "bg-green-500" },
    { icon: CreditCard, label: "Pay Bills", color: "bg-purple-500" },
    { icon: Plus, label: "Add Money", color: "bg-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-blue-100 text-sm">Good morning</p>
            <h1 className="text-white text-2xl font-bold">John Doe</h1>
          </div>
          <Avatar className="w-12 h-12 border-2 border-white/20">
            <AvatarImage src={profileImage || "/placeholder.svg?height=48&width=48"} />
            <AvatarFallback className="bg-white text-blue-600 font-semibold">JD</AvatarFallback>
          </Avatar>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-blue-100 text-sm">Total Balance</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/10 p-1"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mb-4">
              <h2 className="text-white text-3xl font-bold">{showBalance ? "$12,450.00" : "••••••"}</h2>
              <p className="text-blue-100 text-sm flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.5% from last month
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-100 text-xs">Income</p>
                <p className="text-white font-semibold">{showBalance ? "$5,800" : "••••"}</p>
              </div>
              <div>
                <p className="text-blue-100 text-xs">Expenses</p>
                <p className="text-white font-semibold">{showBalance ? "$3,250" : "••••"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{action.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Button variant="ghost" size="sm" className="text-blue-600">
            See All
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6">
        <Button className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <MobileNavigation />
    </div>
  )
}
