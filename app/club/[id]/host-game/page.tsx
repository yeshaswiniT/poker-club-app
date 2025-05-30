"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Users, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function HostGame() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.id

  const [gameData, setGameData] = useState({
    name: "",
    type: "",
    maxPlayers: "",
    buyIn: "",
    description: "",
    scheduledTime: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would make an API call to create the game
    console.log("Creating game:", gameData)
    router.push(`/club/${clubId}`)
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
            Host New Game
          </h1>
        </div>
      </nav>

      <div className="container max-w-2xl mx-auto px-6 py-8">
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create a New Game</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gameName">Game Name</Label>
                <Input
                  id="gameName"
                  placeholder="e.g., Friday Night Tournament"
                  value={gameData.name}
                  onChange={(e) => setGameData({ ...gameData, name: e.target.value })}
                  className="bg-white/50 dark:bg-gray-900/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gameType">Game Type</Label>
                <Select value={gameData.type} onValueChange={(value) => setGameData({ ...gameData, type: value })}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-900/50">
                    <SelectValue placeholder="Select game type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tournament">Tournament</SelectItem>
                    <SelectItem value="cash-game">Cash Game</SelectItem>
                    <SelectItem value="sit-n-go">Sit & Go</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxPlayers">Max Players</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="maxPlayers"
                      type="number"
                      placeholder="8"
                      value={gameData.maxPlayers}
                      onChange={(e) => setGameData({ ...gameData, maxPlayers: e.target.value })}
                      className="pl-10 bg-white/50 dark:bg-gray-900/50"
                      min="2"
                      max="20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyIn">Buy-in ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="buyIn"
                      type="number"
                      placeholder="50"
                      value={gameData.buyIn}
                      onChange={(e) => setGameData({ ...gameData, buyIn: e.target.value })}
                      className="pl-10 bg-white/50 dark:bg-gray-900/50"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledTime">Scheduled Time (Optional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="scheduledTime"
                    type="datetime-local"
                    value={gameData.scheduledTime}
                    onChange={(e) => setGameData({ ...gameData, scheduledTime: e.target.value })}
                    className="pl-10 bg-white/50 dark:bg-gray-900/50"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Leave empty to start the game immediately</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add any special rules or notes about this game..."
                  value={gameData.description}
                  onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
                  className="bg-white/50 dark:bg-gray-900/50"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-white/50 dark:bg-gray-800/50"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {gameData.scheduledTime ? "Schedule Game" : "Start Game Now"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </main>
  )
}
