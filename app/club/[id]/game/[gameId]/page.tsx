"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Users, Clock, DollarSign, Trophy, Settings, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function GameDetails() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.id
  const gameId = params.gameId

  // Mock game data - in real app this would come from API
  const [game, setGame] = useState({
    id: gameId,
    name: "Friday Night Tournament",
    type: "Tournament",
    status: "active",
    players: 8,
    maxPlayers: 12,
    buyIn: 50,
    startTime: "2024-01-26T20:00:00",
    duration: "2h 30m",
    description: "Weekly tournament with progressive blinds. Re-buys allowed in the first hour.",
    isCreator: true, // This would be determined by checking if current user created the game
  })

  // Mock players data
  const players = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      chips: 2500,
      buyIns: 1,
      position: null,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      chips: 3200,
      buyIns: 1,
      position: null,
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      chips: 1800,
      buyIns: 2,
      position: null,
    },
    {
      id: 4,
      name: "Emma Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      chips: 4100,
      buyIns: 1,
      position: null,
    },
    {
      id: 5,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "eliminated",
      chips: 0,
      buyIns: 1,
      position: 8,
    },
    {
      id: 6,
      name: "Lisa Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "eliminated",
      chips: 0,
      buyIns: 2,
      position: 7,
    },
    {
      id: 7,
      name: "Tom Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "eliminated",
      chips: 0,
      buyIns: 1,
      position: 6,
    },
    {
      id: 8,
      name: "Mark Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "eliminated",
      chips: 0,
      buyIns: 1,
      position: 5,
    },
  ]

  // Calculate game stats
  const activePlayers = players.filter((player) => player.status === "active").length
  const totalBuyIns = players.reduce((sum, player) => sum + player.buyIns, 0)
  const totalPot = totalBuyIns * game.buyIn

  const endGame = () => {
    // In real app, this would make an API call to end the game
    console.log(`Ending game ${gameId}`)
    router.push(`/club/${clubId}`)
  }

  const eliminatePlayer = (playerId: number) => {
    // In real app, this would make an API call to eliminate the player
    console.log(`Eliminating player ${playerId}`)
  }

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
                {game.name}
              </h1>
              <div className="flex items-center space-x-2">
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
              </div>
            </div>
          </div>
          {game.isCreator && (
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-6 py-6 space-y-8">
        {/* Game Info */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Players</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    {activePlayers}/{game.maxPlayers}
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                <Clock className="h-5 w-5 mr-2 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Duration</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">{game.duration}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Buy-in</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">${game.buyIn}</div>
                </div>
              </div>
              <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pot</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-white">${totalPot}</div>
                </div>
              </div>
            </div>

            {game.description && (
              <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Game Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{game.description}</p>
              </div>
            )}

            {game.isCreator && (
              <div className="flex gap-2 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
                  onClick={endGame}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  End Game
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Players Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="active">Active Players ({activePlayers})</TabsTrigger>
            <TabsTrigger value="eliminated">Eliminated ({players.length - activePlayers})</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="space-y-4">
              {players
                .filter((player) => player.status === "active")
                .map((player) => (
                  <Card
                    key={player.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-md">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white">{player.name}</h4>
                            <div className="flex items-center space-x-3 text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                {player.buyIns > 1 ? `${player.buyIns} buy-ins` : "1 buy-in"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600 dark:text-gray-400">Chips</div>
                            <div className="font-bold text-gray-800 dark:text-white">{player.chips}</div>
                          </div>
                          {game.isCreator && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/50 dark:bg-gray-800/50"
                              onClick={() => eliminatePlayer(player.id)}
                            >
                              Eliminate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="eliminated">
            <div className="space-y-4">
              {players
                .filter((player) => player.status === "eliminated")
                .sort((a, b) => (a.position || 999) - (b.position || 999))
                .map((player) => (
                  <Card
                    key={player.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-md opacity-70">
                            <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                            <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold text-gray-600 dark:text-gray-400">{player.name}</h4>
                            <div className="flex items-center space-x-3 text-sm">
                              <span className="text-gray-500 dark:text-gray-500">
                                {player.buyIns > 1 ? `${player.buyIns} buy-ins` : "1 buy-in"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="secondary">
                            {player.position === 5
                              ? "5th Place"
                              : player.position === 6
                                ? "6th Place"
                                : player.position === 7
                                  ? "7th Place"
                                  : player.position === 8
                                    ? "8th Place"
                                    : `${player.position}th Place`}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
