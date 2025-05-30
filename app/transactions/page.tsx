import TransactionsPage from "@/components/transactions-page"
import BottomNavigation from "@/components/bottom-navigation"
import { MessageSquare } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Transactions() {
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

          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Transactions
          </h1>

          <button className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300 relative z-10 transition-transform group-hover:scale-110" />
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
              3
            </span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <TransactionsPage />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation defaultActive="transactions" />
    </main>
  )
}
