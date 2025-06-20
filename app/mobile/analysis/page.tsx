"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, PieChart, Calendar } from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function MobileAnalysisPage() {
  const categoryData = [
    { category: "Food & Dining", amount: 850, percentage: 35, color: "bg-blue-500" },
    { category: "Transportation", amount: 420, percentage: 17, color: "bg-green-500" },
    { category: "Shopping", amount: 380, percentage: 16, color: "bg-yellow-500" },
    { category: "Bills & Utilities", amount: 320, percentage: 13, color: "bg-red-500" },
    { category: "Entertainment", amount: 280, percentage: 12, color: "bg-purple-500" },
    { category: "Others", amount: 170, percentage: 7, color: "bg-gray-500" },
  ]

  const monthlyData = [
    { month: "Jan", income: 5800, expenses: 3200, savings: 2600 },
    { month: "Feb", income: 6200, expenses: 3400, savings: 2800 },
    { month: "Mar", income: 5900, expenses: 3100, savings: 2800 },
    { month: "Apr", income: 6400, expenses: 3600, savings: 2800 },
    { month: "May", income: 6100, expenses: 3300, savings: 2800 },
    { month: "Jun", income: 5800, expenses: 3250, savings: 2550 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Analysis</h1>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            6M
          </Button>
        </div>
        <Select defaultValue="6months">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+8.2%</span>
              </div>
              <p className="text-sm opacity-90">Avg Income</p>
              <p className="text-xl font-bold">$6,033</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="h-5 w-5" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">+3.1%</span>
              </div>
              <p className="text-sm opacity-90">Avg Expenses</p>
              <p className="text-xl font-bold">$3,317</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Health Score */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-600" />
              Financial Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-3xl font-bold text-green-600">85/100</div>
                <p className="text-sm text-gray-600">Excellent</p>
              </div>
              <div className="w-20 h-20 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-600"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm font-semibold text-green-600">Good</div>
                <div className="text-xs text-gray-600">Savings</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-yellow-600">Fair</div>
                <div className="text-xs text-gray-600">Control</div>
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600">Excellent</div>
                <div className="text-xs text-gray-600">Income</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Categories */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-gray-600">${item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                  <div className="text-xs text-gray-500">{item.percentage}% of total</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.slice(-3).map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month.month}</span>
                    <div className="text-sm">
                      <span className="text-green-600">${month.income}</span>
                      {" / "}
                      <span className="text-red-600">${month.expenses}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(month.income / 7000) * 100}%` }}
                      />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${(month.expenses / 7000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Income</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span>Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  )
}
