import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Crown, User, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Club {
  id: number
  name: string
  code: string
  members: number
  nextGame: string
  logo: string
  userRole: "creator" | "member"
  createdAt?: string
  joinedAt?: string
  pendingRequests?: number
}

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-700/30 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <CardHeader className="relative p-6 pb-4 bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-white shadow-lg ring-2 ring-white/50 dark:ring-gray-700/50">
              <Image src={club.logo || "/placeholder.svg"} alt={`${club.name} logo`} fill className="object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md">
              {club.userRole === "creator" ? (
                <Crown className="h-4 w-4 text-yellow-500" title="Club Creator" />
              ) : (
                <User className="h-4 w-4 text-blue-500" title="Member" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {club.name}
            </h3>
            <Badge
              variant="outline"
              className="mt-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border-gray-200 dark:border-gray-600"
            >
              <span className="font-mono text-xs">#{club.code}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative p-6 pt-4 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
            <Users className="h-4 w-4 mr-3 text-blue-500" />
            <span className="font-medium">{club.members} active members</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg p-3">
            <Calendar className="h-4 w-4 mr-3 text-green-500" />
            <div>
              <span className="font-medium">Next game</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">{club.nextGame}</div>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-gray-700/20 rounded-lg p-3">
            <Clock className="h-3 w-3 mr-2" />
            <span>
              {club.userRole === "creator"
                ? `Created ${new Date(club.createdAt!).toLocaleDateString()}`
                : `Joined ${new Date(club.joinedAt!).toLocaleDateString()}`}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="relative p-6 pt-0 flex justify-between items-center">
        <div className="relative">
          {club.userRole === "creator" && (
            <Link
              href={`/club/${club.id}/manage`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors hover:underline flex items-center"
            >
              Manage Club
              {club.pendingRequests > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {club.pendingRequests}
                </span>
              )}
            </Link>
          )}
        </div>
        <Link
          href={`/club/${club.id}`}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Enter Club
        </Link>
      </CardFooter>
    </Card>
  )
}
