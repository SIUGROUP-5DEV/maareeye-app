"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, ArrowLeft, DollarSign } from "lucide-react"

export default function MobileRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }
    router.push("/mobile/verify")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6 pb-8">
        <div className="flex items-center mb-6">
          <Link href="/mobile/login">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-white ml-4">Create Account</h1>
        </div>
        <div className="text-center">
          <div className="bg-white p-3 rounded-full w-16 h-16 mx-auto mb-4">
            <DollarSign className="h-10 w-10 text-blue-600" />
          </div>
          <p className="text-blue-100">Join thousands of users managing their finances</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-6 -mt-4 bg-white rounded-t-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700 font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700 font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500 pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="h-12 border-gray-200 focus:border-blue-500 pr-12"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-12 px-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600 leading-5">
              I agree to the{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/mobile/login" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
