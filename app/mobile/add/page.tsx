"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Minus, Calculator } from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"
import Link from "next/link"

export default function MobileAddPage() {
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const expenseCategories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Others",
  ]

  const incomeCategories = ["Salary", "Freelance", "Investment", "Business", "Gift", "Others"]

  const quickAmounts = ["10", "25", "50", "100", "250", "500"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle transaction submission
    console.log({ transactionType, amount, description, category })
    // Reset form or navigate back
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-6 border-b">
        <div className="flex items-center justify-between">
          <Link href="/mobile/home">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Add Transaction</h1>
          <div className="w-9" /> {/* Spacer */}
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Transaction Type Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
              <Button
                variant={transactionType === "expense" ? "default" : "ghost"}
                className={`h-12 ${
                  transactionType === "expense"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setTransactionType("expense")}
              >
                <Minus className="h-4 w-4 mr-2" />
                Expense
              </Button>
              <Button
                variant={transactionType === "income" ? "default" : "ghost"}
                className={`h-12 ${
                  transactionType === "income"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setTransactionType("income")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Income
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Amount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl font-semibold text-gray-600">
                $
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-16 pl-8 text-2xl font-semibold text-center border-2 focus:border-blue-500"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount)}
                  className="h-10"
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {(transactionType === "expense" ? expenseCategories : incomeCategories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Calculator Button */}
        <Button variant="outline" className="w-full h-12">
          <Calculator className="h-5 w-5 mr-2" />
          Use Calculator
        </Button>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className={`w-full h-14 text-lg font-semibold ${
            transactionType === "expense" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={!amount || !description || !category}
        >
          Add {transactionType === "expense" ? "Expense" : "Income"}
        </Button>
      </div>

      <MobileNavigation />
    </div>
  )
}
