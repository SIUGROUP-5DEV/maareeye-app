"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PiggyBank,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const transactions = [
    { id: 1, description: "Salary Deposit", amount: 5000, type: "income", date: "2024-01-15" },
    { id: 2, description: "Grocery Shopping", amount: -120, type: "expense", date: "2024-01-14" },
    { id: 3, description: "Electric Bill", amount: -85, type: "expense", date: "2024-01-13" },
    { id: 4, description: "Freelance Payment", amount: 800, type: "income", date: "2024-01-12" },
    { id: 5, description: "Restaurant", amount: -45, type: "expense", date: "2024-01-11" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Here's your financial overview</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$5,800.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$3,250.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <p className="text-xs text-muted-foreground">$7,500 of $10,000 goal</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
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
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div
                      className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your finances quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Add Transaction</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <PiggyBank className="h-6 w-6" />
                  <span>Set Budget</span>
                </Button>
                <Link href="/analysis" className="contents">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>View Analysis</span>
                  </Button>
                </Link>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Target className="h-6 w-6" />
                  <span>Set Goals</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
