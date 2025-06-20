"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, PieChart } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function AnalysisPage() {
  const categoryData = [
    { category: "Food & Dining", amount: 850, percentage: 35, color: "bg-blue-500" },
    { category: "Transportation", amount: 420, percentage: 17, color: "bg-green-500" },
    { category: "Shopping", amount: 380, percentage: 16, color: "bg-yellow-500" },
    { category: "Bills & Utilities", amount: 320, percentage: 13, color: "bg-red-500" },
    { category: "Entertainment", amount: 280, percentage: 12, color: "bg-purple-500" },
    { category: "Others", amount: 170, percentage: 7, color: "bg-gray-500" },
  ]

  const monthlyTrends = [
    { month: "Jan", income: 5800, expenses: 3200 },
    { month: "Feb", income: 6200, expenses: 3400 },
    { month: "Mar", income: 5900, expenses: 3100 },
    { month: "Apr", income: 6400, expenses: 3600 },
    { month: "May", income: 6100, expenses: 3300 },
    { month: "Jun", income: 5800, expenses: 3250 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Analysis</h1>
            <p className="text-gray-600 mt-2">Detailed insights into your spending patterns</p>
          </div>
          <div className="flex gap-4">
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
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
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Monthly Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$6,033</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8.2%</span> vs previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Monthly Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">$3,317</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+3.1%</span> vs previous period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
              <PieChart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">45%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.3%</span> vs previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Your expense breakdown for the last 6 months</CardDescription>
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
                    <div className="text-xs text-gray-500">{item.percentage}% of total expenses</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Income vs Expenses over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyTrends.map((month, index) => (
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

        {/* Financial Health Score */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Financial Health Score</CardTitle>
            <CardDescription>Based on your spending habits and savings rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-green-600">85/100</div>
                <p className="text-sm text-gray-600">Excellent financial health</p>
              </div>
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">Good</div>
                <div className="text-sm text-gray-600">Savings Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600">Fair</div>
                <div className="text-sm text-gray-600">Expense Control</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">Excellent</div>
                <div className="text-sm text-gray-600">Income Stability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
