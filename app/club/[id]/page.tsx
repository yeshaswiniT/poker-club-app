"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Plus,
  Users,
  Calendar,
  Clock,
  Play,
  Square,
  Settings,
  History,
  Crown,
  ShieldCheck,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function ClubDetails() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.id

  // Mock club data - in real app this would come from API
  const club = {
    id: clubId,
    name: "Royal Flush Club",
    code: "RFC123",
    members: 24,
    createdAt: "2024-01-15",
    userRole: "member", // creator, admin, or member - set to member for testing
    hasAdminRights: false, // Regular members don't have admin rights
    description: "A premium poker club for serious players",
    pendingRequests: 3, // Add pending requests count
  }

  // Mock members data
  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "creator",
      joinedAt: "2024-01-15",
      lastActive: "2024-01-26",
      gamesPlayed: 15,
      isCurrentUser: false,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "admin",
      joinedAt: "2024-01-16",
      lastActive: "2024-01-25",
      gamesPlayed: 12,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      joinedAt: "2024-01-18",
      lastActive: "2024-01-26",
      gamesPlayed: 8,
      isCurrentUser: true, // This is the current user - a regular member
    },
    {
      id: 4,
      name: "Emma Garcia",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      joinedAt: "2024-01-20",
      lastActive: "2024-01-24",
      gamesPlayed: 5,
      isCurrentUser: false,
    },
    {
      id: 5,
      name: "Alex Chen",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "member",
      joinedAt: "2024-01-22",
      lastActive: "2024-01-26",
      gamesPlayed: 3,
      isCurrentUser: false,
    },
  ]

  // Mock games data
  const [activeGames, setActiveGames] = useState([
    {
      id: 1,
      name: "Friday Night Tournament",
      type: "Tournament",
      status: "active",
      players: 8,
      maxPlayers: 12,
      buyIn: 50,
      startTime: "2024-01-26T20:00:00",
      duration: "2h 30m",
      hostName: "John Doe",
      isCreator: false, // Current user is not the creator of this game
      isParticipant: true, // Current user is in this game
      currentChips: 2750, // User's current chip count
      buyInsUsed: 1, // Number of buy-ins used
    },
    {
      id: 2,
      name: "Cash Game Session",
      type: "Cash Game",
      status: "active",
      players: 6,
      maxPlayers: 8,
      buyIn: 25,
      startTime: "2024-01-26T19:00:00",
      duration: "1h 45m",
      hostName: "Sarah Wilson",
      isCreator: false,
      isParticipant: true, // Current user is also in this cash game
      currentChips: 1850, // User's current chip count in cash game
      buyInsUsed: 2, // Number of buy-ins used in cash game
    },
    {
      id: 3,
      name: "Beginner's Tournament",
      type: "Tournament",
      status: "active",
      players: 4,
      maxPlayers: 6,
      buyIn: 15,
      startTime: "2024-01-26T21:00:00",
      duration: "0h 45m",
      hostName: "Emma Garcia",
      isCreator: false,
      isParticipant: false, // User is not in this game
      currentChips: 0,
      buyInsUsed: 0,
    },
  ])

  const completedGames = [
    {
      id: 4,
      name: "Weekend Championship",
      type: "Tournament",
      status: "completed",
      players: 15,
      maxPlayers: 16,
      buyIn: 100,
      startTime: "2024-01-20T18:00:00",
      endTime: "2024-01-20T22:30:00",
      winner: "Mike Johnson",
      prize: 1200,
      hostName: "John Doe",
      isCreator: false,
    },
    {
      id: 5,
      name: "Quick Cash Game",
      type: "Cash Game",
      status: "completed",
      players: 6,
      maxPlayers: 8,
      buyIn: 30,
      startTime: "2024-01-18T20:00:00",
      endTime: "2024-01-18T22:15:00",
      totalPot: 180,
      hostName: "Emma Garcia",
      isCreator: false,
    },
    {
      id: 6,
      name: "Sunday Tournament",
      type: "Tournament",
      status: "completed",
      players: 10,
      maxPlayers: 12,
      buyIn: 75,
      startTime: "2024-01-14T14:00:00",
      endTime: "2024-01-14T19:30:00",
      winner: "Lisa Brown",
      prize: 600,
      hostName: "Alex Chen",
      isCreator: false,
    },
  ]

  const upcomingGames = [
    {
      id: 7,
      name: "Weekend Special",
      type: "Tournament",
      status: "scheduled",
      maxPlayers: 16,
      buyIn: 100,
      scheduledTime: "2024-01-28T18:00:00",
      hostName: "John Doe",
      isCreator: false,
    },
    {
      id: 8,
      name: "Casual Cash Game",
      type: "Cash Game",
      status: "scheduled",
      maxPlayers: 8,
      buyIn: 25,
      scheduledTime: "2024-01-29T19:30:00",
      hostName: "Tom Davis",
      isCreator: false,
    },
  ]

  const [joinGameModal, setJoinGameModal] = useState<{ isOpen: boolean; game: any | null }>({
    isOpen: false,
    game: null,
  })
  const [checkOutModal, setCheckOutModal] = useState<{ isOpen: boolean; game: any | null }>({
    isOpen: false,
    game: null,
  })
  const [buyInAmount, setBuyInAmount] = useState(1)
  const [checkOutAmount, setCheckOutAmount] = useState(0)

  const handleJoinGame = (game: any) => {
    setJoinGameModal({ isOpen: true, game })
    setBuyInAmount(1) // Reset to default
  }

  const handleCheckOut = (game: any) => {
    setCheckOutModal({ isOpen: true, game })
    setCheckOutAmount(0) // Reset to default
  }

  const confirmJoinGame = () => {
    // In real app, this would make an API call to join the game
    console.log(`Joining game ${joinGameModal.game?.id} with ${buyInAmount} buy-ins`)

    // Update the game to show user as participant
    setActiveGames((prev) =>
      prev.map((game) =>
        game.id === joinGameModal.game?.id
          ? {
              ...game,
              isParticipant: true,
              currentChips: game.buyIn * buyInAmount,
              buyInsUsed: buyInAmount,
              players: game.players + 1,
            }
          : game,
      ),
    )

    setJoinGameModal({ isOpen: false, game: null })
    setBuyInAmount(1)
  }

  const confirmCheckOut = () => {
    // In real app, this would make an API call to cash out from the game
    console.log(`Checking out from game ${checkOutModal.game?.id} with amount $${checkOutAmount}`)

    // Update the game to show user is no longer participant
    setActiveGames((prev) =>
      prev.map((game) =>
        game.id === checkOutModal.game?.id
          ? {
              ...game,
              isParticipant: false,
              currentChips: 0,
              buyInsUsed: 0,
              players: game.players - 1,
            }
          : game,
      ),
    )

    setCheckOutModal({ isOpen: false, game: null })
    setCheckOutAmount(0)
  }

  const endGame = (gameId: number) => {
    setActiveGames((prev) => prev.filter((game) => game.id !== gameId))
    // In real app, this would make an API call to end the game
    console.log(`Ending game ${gameId}`)
  }

  // Check if user has admin rights (creator or admin)
  const hasAdminRights = club.userRole === "creator" || club.userRole === "admin" || club.hasAdminRights

  // Full interface for creators and admins
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 pb-16">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg shadow-black/5">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {club.name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">#{club.code}</p>
            </div>
          </div>
          {hasAdminRights && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              onClick={() => router.push(`/club/${clubId}/manage`)}
            >
              <Settings className="h-5 w-5" />
              {club.pendingRequests > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {club.pendingRequests}
                </span>
              )}
            </Button>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-6 py-6 space-y-8">
        {/* Club Info */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{club.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{club.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Created {new Date(club.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              {club.userRole === "creator" ? (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                  👑 Creator
                </Badge>
              ) : club.hasAdminRights ? (
                <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold">
                  ⚡ Admin
                </Badge>
              ) : (
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                  👤 Member
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Host Game Button (Only for users with admin rights) */}
        {hasAdminRights && (
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12"
              onClick={() => router.push(`/club/${clubId}/host-game`)}
            >
              <Plus className="h-5 w-5 mr-2" />
              <span className="font-semibold">Host New Game</span>
            </Button>
          </div>
        )}

        {/* No Admin Rights Message */}
        {!hasAdminRights && (
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-800/30 rounded-full">
                  <Settings className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    You need admin rights to host games in this club.
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    Contact the club creator or an admin to request hosting privileges.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Games Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="active">Active Games ({activeGames.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingGames.length})</TabsTrigger>
            <TabsTrigger value="completed">History ({completedGames.length})</TabsTrigger>
            <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
          </TabsList>

          {/* Active Games Tab */}
          <TabsContent value="active">
            {activeGames.length > 0 ? (
              <div className="space-y-4">
                {activeGames.map((game) => (
                  <Card
                    key={game.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-lg text-gray-800 dark:text-white">{game.name}</h4>
                            <Badge
                              className={cn(
                                "font-semibold",
                                game.type === "Tournament"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
                              )}
                            >
                              {game.type}
                            </Badge>
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                              🔴 Live
                            </Badge>
                            {game.isParticipant && (
                              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                🎮 Playing
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>
                                {game.players}/{game.maxPlayers} players
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Running {game.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">Buy-in: ${game.buyIn}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">Host: {game.hostName}</span>
                            </div>
                          </div>

                          {/* Show current game status if user is participating */}
                          {game.isParticipant && (
                            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Current Chips:</span>
                                  <span className="ml-2 font-bold text-blue-600 dark:text-blue-400">
                                    {game.currentChips.toLocaleString()}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Buy-ins Used:</span>
                                  <span className="ml-2 font-bold text-gray-800 dark:text-white">
                                    {game.buyInsUsed}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {game.isParticipant ? (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                            onClick={() => handleCheckOut(game)}
                          >
                            <LogOut className="h-4 w-4 mr-1" />
                            Check Out
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                            onClick={() => handleJoinGame(game)}
                          >
                            Join Game
                          </Button>
                        )}
                        {hasAdminRights && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
                            onClick={() => endGame(game.id)}
                          >
                            <Square className="h-4 w-4 mr-1" />
                            End Game
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Play className="h-12 w-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Active Games</h4>
                  <p className="text-gray-500 dark:text-gray-500">
                    {hasAdminRights ? "Host a new game to get started!" : "No games are currently running."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Upcoming Games Tab */}
          <TabsContent value="upcoming">
            {upcomingGames.length > 0 ? (
              <div className="space-y-4">
                {upcomingGames.map((game) => (
                  <Card
                    key={game.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-lg text-gray-800 dark:text-white">{game.name}</h4>
                            <Badge
                              className={cn(
                                "font-semibold",
                                game.type === "Tournament"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
                              )}
                            >
                              {game.type}
                            </Badge>
                            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                              ⏰ Scheduled
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>Max {game.maxPlayers} players</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(game.scheduledTime).toLocaleDateString()} at{" "}
                                {new Date(game.scheduledTime).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">Buy-in: ${game.buyIn}</span>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Host: {game.hostName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        >
                          Register
                        </Button>
                        {hasAdminRights && (
                          <Button size="sm" variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                            Edit Game
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Upcoming Games</h4>
                  <p className="text-gray-500 dark:text-gray-500">
                    {hasAdminRights ? "Schedule a new game to get started!" : "No games are currently scheduled."}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Games Tab */}
          <TabsContent value="completed">
            <div className="space-y-4">
              {completedGames.map((game) => (
                <Card
                  key={game.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg text-gray-800 dark:text-white">{game.name}</h4>
                          <Badge
                            className={cn(
                              "font-semibold",
                              game.type === "Tournament"
                                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
                            )}
                          >
                            {game.type}
                          </Badge>
                          <Badge variant="secondary">Completed</Badge>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{game.players} players</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>
                              {Math.round(
                                (new Date(game.endTime!).getTime() - new Date(game.startTime).getTime()) / (1000 * 60),
                              )}{" "}
                              min
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">Buy-in: ${game.buyIn}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">{new Date(game.startTime).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">Host: {game.hostName}</span>
                        </div>
                        {game.winner && (
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                🏆 Winner: {game.winner}
                              </span>
                              <span className="text-sm font-bold text-green-600">${game.prize}</span>
                            </div>
                          </div>
                        )}
                        {game.totalPot && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              💰 Total Pot: ${game.totalPot}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/50 dark:bg-gray-800/50"
                        onClick={() => router.push(`/club/${clubId}/game/${game.id}`)}
                      >
                        <History className="h-4 w-4 mr-1" />
                        View Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="space-y-4">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800 shadow-md">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="font-semibold text-gray-800 dark:text-white">
                              {member.name}
                              {member.isCurrentUser && <span className="text-sm text-gray-500 ml-2">(You)</span>}
                            </h4>
                            {member.role === "creator" ? (
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
                                <Crown className="h-3 w-3 mr-1" />
                                Creator
                              </Badge>
                            ) : member.role === "admin" ? (
                              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Admin
                              </Badge>
                            ) : (
                              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                                <Users className="h-3 w-3 mr-1" />
                                Member
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Joined: {new Date(member.joinedAt).toLocaleDateString()}</span>
                            <span>Last active: {new Date(member.lastActive).toLocaleDateString()}</span>
                            <span>Games played: {member.gamesPlayed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Join Game Modal */}
      <Dialog open={joinGameModal.isOpen} onOpenChange={(open) => setJoinGameModal({ isOpen: open, game: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Game</DialogTitle>
            <DialogDescription>
              {joinGameModal.game && (
                <>
                  Join "{joinGameModal.game.name}" with your desired buy-in amount.
                  <br />
                  <span className="text-sm text-gray-500">Base buy-in: ${joinGameModal.game.buyIn} per entry</span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="buyInAmount">Number of Buy-ins</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBuyInAmount(Math.max(1, buyInAmount - 1))}
                  disabled={buyInAmount <= 1}
                >
                  -
                </Button>
                <Input
                  id="buyInAmount"
                  type="number"
                  value={buyInAmount}
                  onChange={(e) => setBuyInAmount(Math.min(10, Math.max(1, Number.parseInt(e.target.value) || 1)))}
                  className="text-center w-20"
                  min="1"
                  max="10"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setBuyInAmount(Math.min(10, buyInAmount + 1))}
                  disabled={buyInAmount >= 10}
                >
                  +
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Total cost: ${joinGameModal.game ? joinGameModal.game.buyIn * buyInAmount : 0}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinGameModal({ isOpen: false, game: null })}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              onClick={confirmJoinGame}
            >
              Request Buy-in (${joinGameModal.game ? joinGameModal.game.buyIn * buyInAmount : 0})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check Out Modal */}
      <Dialog open={checkOutModal.isOpen} onOpenChange={(open) => setCheckOutModal({ isOpen: open, game: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check Out from Game</DialogTitle>
            <DialogDescription>
              {checkOutModal.game && (
                <>
                  Cash out from "{checkOutModal.game.name}".
                  <br />
                  <span className="text-sm text-gray-500">
                    Current chips: {checkOutModal.game.currentChips?.toLocaleString() || 0}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="checkOutAmount">Cash Out Amount ($)</Label>
              <Input
                id="checkOutAmount"
                type="number"
                value={checkOutAmount}
                onChange={(e) => setCheckOutAmount(Math.max(0, Number.parseFloat(e.target.value) || 0))}
                className="text-center"
                min="0"
                step="0.01"
                placeholder="Enter amount to cash out"
              />
              <p className="text-sm text-gray-500">
                Enter the dollar amount you want to cash out from your current chips.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckOutModal({ isOpen: false, game: null })}>
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              onClick={confirmCheckOut}
              disabled={checkOutAmount <= 0}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Cash Out ${checkOutAmount}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
