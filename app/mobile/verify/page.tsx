"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function MobileVerifyPage() {
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
      router.push("/mobile/home")
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      alert("Verification code sent!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-6 pb-12">
        <div className="flex items-center mb-8">
          <Link href="/mobile/register">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-white ml-4">Verify Email</h1>
        </div>
        <div className="text-center">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-6">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
          <p className="text-blue-100 px-4">We've sent a 6-digit verification code to your email address</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 -mt-6 bg-white rounded-t-3xl">
        <form onSubmit={handleVerify} className="space-y-8">
          <div className="space-y-4">
            <p className="text-center text-gray-600 font-medium">Enter Verification Code</p>
            <div className="flex gap-3 justify-center">
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
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 focus:border-blue-500"
                />
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold">
            Verify & Continue
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-600">{"Didn't receive the code?"}</p>
          <Button
            variant="ghost"
            onClick={handleResendCode}
            disabled={isResending}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend Code"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
