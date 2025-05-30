"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function JoinClub() {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "success" | "error">("form")
  const [clubCode, setClubCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clubDetails, setClubDetails] = useState<{ name: string; members: number } | null>(null)

  // Mock club data for demonstration
  const mockClubs = {
    RFC123: { name: "Royal Flush Club", members: 24 },
    ACE456: { name: "Aces High", members: 18 },
    FH789: { name: "Full House", members: 32 },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clubCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a club code",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if club code exists in our mock data
      const formattedCode = clubCode.trim().toUpperCase()
      const club = mockClubs[formattedCode as keyof typeof mockClubs]

      if (club) {
        setClubDetails(club)
        setStep("success")
      } else {
        setStep("error")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join club. Please try again.",
        variant: "destructive",
      })
      setStep("error")
    } finally {
      setIsSubmitting(false)
    }
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
            {step === "form" ? "Join Club" : step === "success" ? "Club Joined" : "Error"}
          </h1>
        </div>
      </nav>

      <div className="container max-w-md mx-auto px-6 py-8">
        {step === "form" ? (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Join a Club</CardTitle>
              <CardDescription>Enter the club code to join</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clubCode">Club Code</Label>
                  <Input
                    id="clubCode"
                    placeholder="Enter club code (e.g., RFC123)"
                    value={clubCode}
                    onChange={(e) => setClubCode(e.target.value)}
                    className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 uppercase"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    The club code is a 6-character code provided by the club creator
                  </p>
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
                      Joining...
                    </>
                  ) : (
                    "Join Club"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : step === "success" ? (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
              <CardTitle className="text-2xl">Success!</CardTitle>
              <CardDescription>You've joined the club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{clubDetails?.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You've successfully joined this club with {clubDetails?.members} other members
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Club Code: <span className="font-mono font-bold">{clubCode.toUpperCase()}</span>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12"
              >
                Go to My Clubs
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <X className="h-8 w-8 text-red-600 dark:text-red-500" />
              </div>
              <CardTitle className="text-2xl">Club Not Found</CardTitle>
              <CardDescription>We couldn't find a club with that code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                The club code <span className="font-mono font-bold">{clubCode.toUpperCase()}</span> doesn't match any
                existing clubs. Please check the code and try again.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tip: Club codes are case-insensitive and should be 6 characters long
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button
                onClick={() => setStep("form")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 h-12"
              >
                Go Back to My Clubs
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  )
}
