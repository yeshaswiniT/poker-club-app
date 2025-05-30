import { Trophy, Clock, Users, TrendingUp, Target, Award, Calendar, DollarSign, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function GamesPage() {
  const allGames = [
    {
      id: 1,
      clubName: "Royal Flush Club",
      gameType: "Tournament",
      date: "2024-01-20",
      position: 1,
      players: 8,
      buyIn: 50,
      winnings: 320,
      duration: "2h 45m",
      profit: 270,
    },
    {
      id: 2,
      clubName: "Aces High",
      gameType: "Cash Game",
      date: "2024-01-18",
      position: 3,
      players: 12,
      buyIn: 25,
      winnings: 0,
      duration: "1h 30m",
      profit: -25,
    },
    {
      id: 3,
      clubName: "Full House",
      gameType: "Tournament",
      date: "2024-01-15",
      position: 2,
      players: 6,
      buyIn: 100,
      winnings: 150,
      duration: "3h 15m",
      profit: 50,
    },
    {
      id: 4,
      clubName: "Poker Kings",
      gameType: "Cash Game",
      date: "2024-01-12",
      position: 5,
      players: 10,
      buyIn: 75,
      winnings: 0,
      duration: "2h 20m",
      profit: -75,
    },
    {
      id: 5,
      clubName: "Royal Flush Club",
      gameType: "Tournament",
      date: "2024-01-10",
      position: 1,
      players: 15,
      buyIn: 200,
      winnings: 1200,
      duration: "4h 30m",
      profit: 1000,
    },
    {
      id: 6,
      clubName: "Aces High",
      gameType: "Cash Game",
      date: "2024-01-08",
      position: 2,
      players: 8,
      buyIn: 50,
      winnings: 125,
      duration: "2h 10m",
      profit: 75,
    },
    {
      id: 7,
      clubName: "Full House",
      gameType: "Tournament",
      date: "2024-01-05",
      position: 4,
      players: 12,
      buyIn: 30,
      winnings: 0,
      duration: "1h 45m",
      profit: -30,
    },
    {
      id: 8,
      clubName: "Poker Kings",
      gameType: "Cash Game",
      date: "2024-01-03",
      position: 1,
      players: 6,
      buyIn: 100,
      winnings: 280,
      duration: "3h 00m",
      profit: 180,
    },
  ]

  // Calculate aggregate stats
  const stats = {
    totalGames: allGames.length,
    wins: allGames.filter((game) => game.position === 1).length,
    totalBuyIns: allGames.reduce((sum, game) => sum + game.buyIn, 0),
    totalWinnings: allGames.reduce((sum, game) => sum + game.winnings, 0),
    totalProfit: allGames.reduce((sum, game) => sum + game.profit, 0),
    winRate: Math.round((allGames.filter((game) => game.position === 1).length / allGames.length) * 100),
    avgProfit: Math.round(allGames.reduce((sum, game) => sum + game.profit, 0) / allGames.length),
    bestWin: Math.max(...allGames.map((game) => game.profit)),
    worstLoss: Math.min(...allGames.map((game) => game.profit)),
  }

  const getPositionBadge = (position: number, players: number) => {
    if (position === 1) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold shadow-lg">
          🥇 Winner
        </Badge>
      )
    } else if (position === 2) {
      return (
        <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold shadow-lg">
          🥈 2nd Place
        </Badge>
      )
    } else if (position === 3) {
      return (
        <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold shadow-lg">
          🥉 3rd Place
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="font-medium">
          #{position} of {players}
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Aggregate Stats Overview */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          Performance Overview
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.totalGames}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Games</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.wins}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Wins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.winRate}%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Win Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "border-0 shadow-lg",
              stats.totalProfit >= 0
                ? "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20"
                : "bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div
                  className={cn(
                    "p-3 rounded-xl shadow-lg",
                    stats.totalProfit >= 0
                      ? "bg-gradient-to-br from-green-500 to-emerald-600"
                      : "bg-gradient-to-br from-red-500 to-pink-600",
                  )}
                >
                  {stats.totalProfit >= 0 ? (
                    <TrendingUp className="h-6 w-6 text-white" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <p className={cn("text-3xl font-bold", stats.totalProfit >= 0 ? "text-green-600" : "text-red-600")}>
                    {stats.totalProfit >= 0 ? "+" : ""}${stats.totalProfit}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Profit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Summary */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-purple-600" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">${stats.totalBuyIns}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Buy-ins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">${stats.totalWinnings}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Winnings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${stats.bestWin}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Best Win</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">${Math.abs(stats.worstLoss)}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Worst Loss</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Games List */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-500" />
          Game History ({allGames.length} games)
        </h2>
        <div className="space-y-4">
          {allGames.map((game) => (
            <Card
              key={game.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">{game.clubName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {game.gameType}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">
                        {new Date(game.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  {getPositionBadge(game.position, game.players)}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">{game.players} players</span>
                  </div>
                  <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium">{game.duration}</span>
                  </div>
                  <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                    <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                    <span className="text-sm font-medium">Buy-in: ${game.buyIn}</span>
                  </div>
                  <div className="flex items-center bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
                    <Award className="h-4 w-4 mr-2 text-yellow-500" />
                    <span className="text-sm font-medium">Won: ${game.winnings}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Net Result:</span>
                  </div>
                  <div
                    className={cn(
                      "text-xl font-bold flex items-center",
                      game.profit > 0 ? "text-green-600" : game.profit < 0 ? "text-red-600" : "text-gray-600",
                    )}
                  >
                    {game.profit > 0 ? (
                      <TrendingUp className="h-5 w-5 mr-1" />
                    ) : game.profit < 0 ? (
                      <TrendingDown className="h-5 w-5 mr-1" />
                    ) : null}
                    {game.profit > 0 ? "+" : ""}${game.profit}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
