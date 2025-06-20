"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Camera, Upload, Trash2 } from "lucide-react"

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  currentImage: string | null
  onImageUpdate: (image: string | null) => void
}

export function PhotoUploadModal({ isOpen, onClose, currentImage, onImageUpdate }: PhotoUploadModalProps) {
  const [isUploading, setIsUploading] = useState(false)

  if (!isOpen) return null

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onImageUpdate(result)
        localStorage.setItem("userProfileImage", result)
        setIsUploading(false)
        onClose()
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    onImageUpdate(null)
    localStorage.removeItem("userProfileImage")
    onClose()
  }

  const handleCameraCapture = () => {
    // In a real app, this would open the camera
    document.getElementById("camera-input")?.click()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <Card className="w-full max-w-md mx-4 mb-4 rounded-t-3xl">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>Profile Photo</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="gallery-input">
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col items-center justify-center space-y-1"
                asChild
              >
                <div>
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Gallery</span>
                </div>
              </Button>
            </label>
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col items-center justify-center space-y-1"
              onClick={handleCameraCapture}
            >
              <Camera className="h-6 w-6" />
              <span className="text-sm">Camera</span>
            </Button>
          </div>

          {currentImage && (
            <Button
              variant="outline"
              className="w-full text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleRemovePhoto}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Photo
            </Button>
          )}

          <input
            id="gallery-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
          <input
            id="camera-input"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
