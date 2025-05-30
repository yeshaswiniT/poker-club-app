import { MessageSquare, Plus, UserPlus, Sparkles } from "lucide-react"
import ClubGrid from "@/components/club-grid"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import BottomNavigation from "@/components/bottom-navigation"
import Link from "next/link"

export default function Home() {
  // Sample club data - only clubs user created or joined
  const userClubs = [
    {
      id: 1,
      name: "Royal Flush Club",
      code: "RFC123",
      members: 24,
      nextGame: "Tomorrow, 8 PM",
      logo: "/placeholder.svg?height=80&width=80",
      userRole: "creator", // creator or member
      createdAt: "2024-01-15",
      pendingRequests: 3, // Add pending requests count
    },
    {
      id: 2,
      name: "Aces High",
      code: "ACE456",
      members: 18,
      nextGame: "Friday, 9 PM",
      logo: "/placeholder.svg?height=80&width=80",
      userRole: "member",
      joinedAt: "2024-02-10",
      pendingRequests: 0,
    },
    {
      id: 3,
      name: "Full House",
      code: "FH789",
      members: 32,
      nextGame: "Saturday, 7 PM",
      logo: "/placeholder.svg?height=80&width=80",
      userRole: "creator",
      createdAt: "2024-01-20",
      pendingRequests: 1, // Add pending requests count
    },
    {
      id: 4,
      name: "Poker Kings",
      code: "PK101",
      members: 15,
      nextGame: "Sunday, 6 PM",
      logo: "/placeholder.svg?height=80&width=80",
      userRole: "member",
      joinedAt: "2024-03-05",
      pendingRequests: 0,
    },
  ]

  const createdClubs = userClubs.filter((club) => club.userRole === "creator")
  const joinedClubs = userClubs.filter((club) => club.userRole === "member")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 pb-16">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg shadow-black/5">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="relative">
            <Avatar className="h-11 w-11 border-3 border-gradient-to-r from-blue-500 to-purple-600 shadow-lg ring-2 ring-white/50 dark:ring-gray-800/50">
              <AvatarImage src="/placeholder.svg?height=44&width=44" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              My Clubs
            </h1>
            <div className="flex items-center justify-center mt-1">
              <Sparkles className="h-3 w-3 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Premium Member</span>
            </div>
          </div>

          <button className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300 relative z-10 transition-transform group-hover:scale-110" />
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
              3
            </span>
          </button>
        </div>
      </nav>

      {/* Action Buttons */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 border-0 h-12"
            asChild
          >
            <Link href="/create-club">
              <Plus className="h-5 w-5 mr-2" />
              <span className="font-semibold">Create Club</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 h-12"
            asChild
          >
            <Link href="/join-club">
              <UserPlus className="h-5 w-5 mr-2" />
              <span className="font-semibold">Join Club</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-6">
        {/* Created Clubs Section */}
        {createdClubs.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl border border-emerald-400/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="tracking-wide">Created by You</span>
                    <div className="w-1 h-1 bg-emerald-200 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 rounded-xl blur-sm"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{createdClubs.length}</span>
                    <span>{createdClubs.length === 1 ? "club" : "clubs"}</span>
                  </div>
                </div>
              </div>
            </div>
            <ClubGrid clubs={createdClubs} />
          </div>
        )}

        {/* Joined Clubs Section */}
        {joinedClubs.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl border border-blue-400/30 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="tracking-wide">Joined Clubs</span>
                    <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-xl blur-sm"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{joinedClubs.length}</span>
                    <span>{joinedClubs.length === 1 ? "club" : "clubs"}</span>
                  </div>
                </div>
              </div>
            </div>
            <ClubGrid clubs={joinedClubs} />
          </div>
        )}

        {/* Empty State */}
        {userClubs.length === 0 && (
          <div className="text-center py-16">
            <div className="relative mx-auto mb-8">
              <div className="h-32 w-32 mx-auto bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-16 w-16 text-gray-400 dark:text-gray-500"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
              No Clubs Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              Create your first poker club or join an existing one to start your poker journey.
            </p>
            <div className="flex gap-4 justify-center max-w-sm mx-auto">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12"
                asChild
              >
                <Link href="/create-club">
                  <Plus className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Create Club</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 h-12"
                asChild
              >
                <Link href="/join-club">
                  <UserPlus className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Join Club</span>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </main>
  )
}
