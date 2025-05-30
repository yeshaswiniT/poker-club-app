"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function CreateClub() {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "success">("form")
  const [clubName, setClubName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generatedCode, setGeneratedCode] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const generateClubCode = () => {
    // Generate a random 6-character alphanumeric code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return code
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clubName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a club name",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a code for the club
      const code = generateClubCode()
      setGeneratedCode(code)

      // Move to success step
      setStep("success")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create club. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setIsCopied(true)
    toast({
      title: "Copied!",
      description: "Club code copied to clipboard",
    })

    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 pb-16">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg shadow-black/5">
        <div className="px-6 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {step === "form" ? "Create Club" : "Club Created"}
          </h1>
        </div>
      </nav>

      <div className="container max-w-md mx-auto px-6 py-8">
        {step === "form" ? (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Create a New Club</CardTitle>
              <CardDescription>Enter your club name to get started</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    placeholder="Enter club name"
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                    disabled={isSubmitting}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Club"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
              <CardTitle className="text-2xl">Club Created!</CardTitle>
              <CardDescription>Your club has been created successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">{clubName}</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Share this code with others to join your club:
                  </p>
                  <div className="relative">
                    <div className="text-3xl font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400 py-2">
                      {generatedCode}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-100 dark:bg-blue-800/50 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      aria-label="Copy code"
                    >
                      {isCopied ? (
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12"
              >
                Go to My Clubs
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStep("form")
                  setClubName("")
                  setGeneratedCode("")
                }}
                className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 h-12"
              >
                Create Another Club
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  )
}
