"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  Bell,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Moon,
  Globe,
  Smartphone,
} from "lucide-react"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { PhotoUploadModal } from "@/components/photo-upload-modal"

export default function MobileProfilePage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showPhotoModal, setShowPhotoModal] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
        // Store in localStorage for persistence across pages
        localStorage.setItem("userProfileImage", result)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Load saved profile image on component mount
  useState(() => {
    const savedImage = localStorage.getItem("userProfileImage")
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [])

  const profileStats = [
    { label: "Accounts", value: "3", color: "text-blue-600" },
    { label: "Transactions", value: "247", color: "text-green-600" },
    { label: "Categories", value: "12", color: "text-purple-600" },
  ]

  const menuItems = [
    {
      section: "Account",
      items: [
        { icon: User, label: "Personal Information", action: () => {} },
        {
          icon: Edit,
          label: "Change Profile Photo",
          action: () => setShowPhotoModal(true),
        },
        { icon: CreditCard, label: "Payment Methods", action: () => {} },
        { icon: Shield, label: "Security & Privacy", action: () => {} },
      ],
    },
    {
      section: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", action: () => {}, toggle: notifications, onToggle: setNotifications },
        { icon: Moon, label: "Dark Mode", action: () => {}, toggle: darkMode, onToggle: setDarkMode },
        { icon: Globe, label: "Language", action: () => {}, value: "English" },
        { icon: Smartphone, label: "Biometric Login", action: () => {}, toggle: true },
      ],
    },
    {
      section: "Support",
      items: [
        { icon: HelpCircle, label: "Help & Support", action: () => {} },
        { icon: Settings, label: "App Settings", action: () => {} },
      ],
    },
  ]

  const handleLogout = () => {
    router.push("/mobile/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white/20">
              <AvatarImage src={profileImage || "/placeholder.svg?height=96&width=96"} />
              <AvatarFallback className="text-2xl bg-white text-blue-600">JD</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              onClick={() => setShowPhotoModal(true)}
            >
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">John Doe</h2>
          <p className="text-blue-100 mb-6">john.doe@example.com</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold text-white`}>{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 -mt-6 space-y-6">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">{section.section}</h3>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-0">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`flex items-center justify-between p-4 ${
                      itemIndex !== section.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <item.icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.value && <span className="text-sm text-gray-500">{item.value}</span>}
                      {item.toggle !== undefined && item.onToggle ? (
                        <Switch checked={item.toggle} onCheckedChange={item.onToggle} />
                      ) : item.toggle !== undefined ? (
                        <Switch checked={item.toggle} />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start p-4 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <div className="p-2 bg-red-100 rounded-full mr-3">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">FinanceApp v2.1.0</p>
        </div>
      </div>

      <PhotoUploadModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        currentImage={profileImage}
        onImageUpdate={setProfileImage}
      />

      <MobileNavigation />
    </div>
  )
}
