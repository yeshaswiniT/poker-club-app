import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function TransactionsPage() {
  // Money I owe to others
  const moneyIOwe = [
    {
      id: 1,
      type: "debt",
      amount: 150,
      description: "Tournament buy-in debt",
      date: "2024-01-20",
      clubName: "Royal Flush Club",
      creditor: "Mike Johnson",
      status: "pending",
      dueDate: "2024-01-25",
    },
    {
      id: 2,
      type: "debt",
      amount: 75,
      description: "Cash game settlement",
      date: "2024-01-18",
      clubName: "Aces High",
      creditor: "Sarah Wilson",
      status: "overdue",
      dueDate: "2024-01-22",
    },
    {
      id: 3,
      type: "debt",
      amount: 200,
      description: "Side bet payment",
      date: "2024-01-15",
      clubName: "Full House",
      creditor: "Alex Chen",
      status: "paid",
      dueDate: "2024-01-20",
      paidDate: "2024-01-19",
    },
  ]

  // Money others owe to me
  const moneyOwedToMe = [
    {
      id: 4,
      type: "credit",
      amount: 120,
      description: "Tournament winnings split",
      date: "2024-01-19",
      clubName: "Royal Flush Club",
      debtor: "Tom Davis",
      status: "pending",
      dueDate: "2024-01-26",
    },
    {
      id: 5,
      type: "credit",
      amount: 300,
      description: "Cash game winnings",
      date: "2024-01-17",
      clubName: "Poker Kings",
      debtor: "Lisa Brown",
      status: "received",
      dueDate: "2024-01-24",
      receivedDate: "2024-01-23",
    },
    {
      id: 6,
      type: "credit",
      amount: 50,
      description: "Side bet winnings",
      date: "2024-01-16",
      clubName: "Aces High",
      debtor: "Mark Taylor",
      status: "overdue",
      dueDate: "2024-01-21",
    },
    {
      id: 7,
      type: "credit",
      amount: 180,
      description: "Tournament prize share",
      date: "2024-01-14",
      clubName: "Full House",
      debtor: "Emma Garcia",
      status: "pending",
      dueDate: "2024-01-28",
    },
  ]

  // Calculate totals
  const totalIOwe = moneyIOwe.filter((item) => item.status !== "paid").reduce((sum, item) => sum + item.amount, 0)

  const totalOwedToMe = moneyOwedToMe
    .filter((item) => item.status !== "received")
    .reduce((sum, item) => sum + item.amount, 0)

  const overdueIOwe = moneyIOwe.filter((item) => item.status === "overdue").reduce((sum, item) => sum + item.amount, 0)

  const overdueOwedToMe = moneyOwedToMe
    .filter((item) => item.status === "overdue")
    .reduce((sum, item) => sum + item.amount, 0)

  const getStatusIcon = (status: string, type: string) => {
    switch (status) {
      case "paid":
      case "received":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "overdue":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold">✓ Paid</Badge>
      case "received":
        return (
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold">✓ Received</Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold animate-pulse">
            ⚠ Overdue
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold">⏳ Pending</Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTransactionBg = (type: string, status: string) => {
    if (status === "paid" || status === "received") {
      return "bg-gradient-to-br from-green-500 to-emerald-600"
    }
    if (status === "overdue") {
      return "bg-gradient-to-br from-red-500 to-pink-600"
    }
    return type === "debt"
      ? "bg-gradient-to-br from-red-400 to-orange-500"
      : "bg-gradient-to-br from-blue-500 to-indigo-600"
  }

  return (
    <div className="space-y-8">
      {/* Summary Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Money I Owe */}
        <Card className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
              Money I Owe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-red-600 mb-2">${totalIOwe}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Outstanding</p>
            </div>
            {overdueIOwe > 0 && (
              <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-red-700 dark:text-red-400">${overdueIOwe}</p>
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Overdue Amount</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Money Owed to Me */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Money Owed to Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <p className="text-4xl font-bold text-green-600 mb-2">${totalOwedToMe}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Expected</p>
            </div>
            {overdueOwedToMe > 0 && (
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">${overdueOwedToMe}</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Overdue to Collect</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Money I Owe Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <ArrowDownLeft className="h-5 w-5 mr-2 text-red-500" />
          Money I Owe ({moneyIOwe.filter((item) => item.status !== "paid").length} outstanding)
        </h2>
        <div className="space-y-4">
          {moneyIOwe.map((transaction) => (
            <Card
              key={transaction.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-lg ${getTransactionBg("debt", transaction.status)}`}>
                      {getStatusIcon(transaction.status, "debt")}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{transaction.description}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <User className="h-4 w-4 mr-1" />
                        <span className="font-medium">To: {transaction.creditor}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{transaction.clubName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Due: {new Date(transaction.dueDate).toLocaleDateString()}
                        {transaction.paidDate && (
                          <span className="ml-2 text-green-600">
                            (Paid: {new Date(transaction.paidDate).toLocaleDateString()})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">${transaction.amount}</p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>

                {transaction.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      Mark as Paid
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact {transaction.creditor.split(" ")[0]}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Money Owed to Me Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <ArrowUpRight className="h-5 w-5 mr-2 text-green-500" />
          Money Owed to Me ({moneyOwedToMe.filter((item) => item.status !== "received").length} outstanding)
        </h2>
        <div className="space-y-4">
          {moneyOwedToMe.map((transaction) => (
            <Card
              key={transaction.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-lg ${getTransactionBg("credit", transaction.status)}`}>
                      {getStatusIcon(transaction.status, "credit")}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{transaction.description}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <User className="h-4 w-4 mr-1" />
                        <span className="font-medium">From: {transaction.debtor}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{transaction.clubName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Due: {new Date(transaction.dueDate).toLocaleDateString()}
                        {transaction.receivedDate && (
                          <span className="ml-2 text-green-600">
                            (Received: {new Date(transaction.receivedDate).toLocaleDateString()})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">+${transaction.amount}</p>
                    {getStatusBadge(transaction.status)}
                  </div>
                </div>

                {transaction.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                    >
                      Mark as Received
                    </Button>
                    <Button size="sm" variant="outline">
                      Remind {transaction.debtor.split(" ")[0]}
                    </Button>
                  </div>
                )}

                {transaction.status === "overdue" && (
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
                    >
                      Send Reminder
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact {transaction.debtor.split(" ")[0]}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
