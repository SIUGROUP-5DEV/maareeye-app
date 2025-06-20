"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, DollarSign, Fingerprint } from "lucide-react"

export default function MobileLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      router.push("/mobile/home")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-6 shadow-lg">
              <DollarSign className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">FinanceApp</h1>
            <p className="text-blue-100">Manage your money with ease</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-12 px-3 text-white/60 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <Link href="#" className="text-sm text-blue-100 hover:text-white">
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12 bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg">
              Sign In
            </Button>
          </form>

          {/* Biometric Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-blue-100">Or continue with</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full h-12 mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Fingerprint className="h-5 w-5 mr-2" />
              Use Biometric
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-6 pb-8">
        <div className="text-center">
          <p className="text-blue-100 text-sm">
            {"Don't have an account? "}
            <Link href="/mobile/register" className="text-white font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
