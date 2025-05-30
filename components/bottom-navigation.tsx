"use client"

import { usePathname, useRouter } from "next/navigation"
import { Users, Gamepad2, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    id: "clubs",
    label: "Clubs",
    icon: Users,
    href: "/",
  },
  {
    id: "games",
    label: "Games",
    icon: Gamepad2,
    href: "/games",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: CreditCard,
    href: "/transactions",
  },
]

interface BottomNavigationProps {
  defaultActive?: string
}

export default function BottomNavigation({ defaultActive = "clubs" }: BottomNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab based on pathname
  const getActiveTab = () => {
    if (pathname === "/") return "clubs"
    if (pathname.includes("/games")) return "games"
    if (pathname.includes("/transactions")) return "transactions"
    return defaultActive
  }

  const activeTab = getActiveTab()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 z-50 shadow-2xl shadow-black/10">
      <div className="flex justify-around items-center py-3 px-6 max-w-md mx-auto relative">
        {/* Active indicator background */}
        <div
          className={cn(
            "absolute top-2 bottom-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl transition-all duration-500 ease-out shadow-lg shadow-blue-500/25",
            activeTab === "clubs" && "left-2 right-2/3",
            activeTab === "games" && "left-1/3 right-1/3",
            activeTab === "transactions" && "left-2/3 right-2",
          )}
        />

        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              className={cn(
                "relative flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1 z-10",
                isActive
                  ? "text-white transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:scale-105",
              )}
            >
              <Icon className={cn("h-6 w-6 mb-1 transition-all duration-300", isActive && "drop-shadow-sm")} />
              <span className={cn("text-xs font-semibold transition-all duration-300", isActive && "drop-shadow-sm")}>
                {item.label}
              </span>

              {/* Active dot indicator */}
              {isActive && <div className="absolute -top-1 w-1 h-1 bg-white rounded-full shadow-sm animate-pulse" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
