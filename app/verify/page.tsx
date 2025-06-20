"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"

export default function VerifyPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    const verificationCode = code.join("")
    if (verificationCode.length === 6) {
      // Simulate verification
      router.push("/home")
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      alert("Verification code sent!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>We've sent a 6-digit verification code to your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <div className="flex gap-2 justify-center">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Verify Email
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">{"Didn't receive the code?"}</p>
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={isResending}
              className="text-blue-600 hover:text-blue-700"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
