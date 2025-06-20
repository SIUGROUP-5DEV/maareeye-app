"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart3, User, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MobileNavigation() {
  const pathname = usePathname()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }

    // Listen for storage changes to update profile image across tabs
    const handleStorageChange = () => {
      const updatedImage = localStorage.getItem("userProfileImage")
      setProfileImage(updatedImage)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const navigation = [
    { name: "Home", href: "/mobile/home", icon: Home },
    { name: "Analysis", href: "/mobile/analysis", icon: BarChart3 },
    { name: "Add", href: "/mobile/add", icon: Plus, isSpecial: true },
    { name: "Profile", href: "/mobile/profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
      <div className="flex items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          if (item.isSpecial) {
            return (
              <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center p-2">
                <div className="bg-blue-600 p-3 rounded-full shadow-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </Link>
            )
          }

          if (item.name === "Profile") {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <Avatar className="w-6 h-6 mb-1">
                  <AvatarImage src={profileImage || "/placeholder.svg?height=24&width=24"} />
                  <AvatarFallback className="text-xs bg-gray-200 text-gray-600">JD</AvatarFallback>
                </Avatar>
                <span className={`text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                  {item.name}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-blue-600" : "text-gray-400"}`}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
