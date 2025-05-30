"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft,
  Users,
  UserPlus,
  UserMinus,
  Shield,
  ShieldCheck,
  Crown,
  Check,
  X,
  AlertTriangle,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function ClubManagement() {
  const router = useRouter()
  const params = useParams()
  const clubId = params.id

  // Mock club data
  const club = {
    id: clubId,
    name: "Royal Flush Club",
    code: "RFC123",
    createdAt: "2024-01-15",
    description: "A premium poker club for serious players",
  }

  // Mock current members data
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "creator",
      joinedAt: "2024-01-15",
      lastActive: "2024-01-26",
      gamesPlayed: 15,
      isCurrentUser: true,
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
      isCurrentUser: false,
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
  ])

  // Mock pending members data
  const [pendingMembers, setPendingMembers] = useState([
    {
      id: 6,
      name: "Lisa Brown",
      email: "lisa@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      requestedAt: "2024-01-26",
      code: "RFC123",
    },
    {
      id: 7,
      name: "Tom Davis",
      email: "tom@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      requestedAt: "2024-01-25",
      code: "RFC123",
    },
    {
      id: 8,
      name: "Mark Taylor",
      email: "mark@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      requestedAt: "2024-01-24",
      code: "RFC123",
    },
  ])

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: "remove" | "promote" | "demote" | "accept" | "reject"
    member: any
  }>({
    isOpen: false,
    type: "remove",
    member: null,
  })

  const [expandedMember, setExpandedMember] = useState<number | null>(null)

  const handleAcceptMember = (memberId: number) => {
    const pendingMember = pendingMembers.find((m) => m.id === memberId)
    if (pendingMember) {
      // Add to members list
      const newMember = {
        ...pendingMember,
        role: "member",
        joinedAt: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
        gamesPlayed: 0,
        isCurrentUser: false,
      }
      setMembers((prev) => [...prev, newMember])

      // Remove from pending list
      setPendingMembers((prev) => prev.filter((m) => m.id !== memberId))
    }
    setConfirmDialog({ isOpen: false, type: "accept", member: null })
  }

  const handleRejectMember = (memberId: number) => {
    setPendingMembers((prev) => prev.filter((m) => m.id !== memberId))
    setConfirmDialog({ isOpen: false, type: "reject", member: null })
  }

  const handleRemoveMember = (memberId: number) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId))
    setConfirmDialog({ isOpen: false, type: "remove", member: null })
  }

  const handlePromoteToAdmin = (memberId: number) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role: "admin" } : m)))
    setConfirmDialog({ isOpen: false, type: "promote", member: null })
  }

  const handleDemoteFromAdmin = (memberId: number) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role: "member" } : m)))
    setConfirmDialog({ isOpen: false, type: "demote", member: null })
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "creator":
        return (
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold">
            <Crown className="h-3 w-3 mr-1" />
            Creator
          </Badge>
        )
      case "admin":
        return (
          <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold">
            <ShieldCheck className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
            <Users className="h-3 w-3 mr-1" />
            Member
          </Badge>
        )
    }
  }

  const confirmAction = () => {
    switch (confirmDialog.type) {
      case "accept":
        handleAcceptMember(confirmDialog.member.id)
        break
      case "reject":
        handleRejectMember(confirmDialog.member.id)
        break
      case "remove":
        handleRemoveMember(confirmDialog.member.id)
        break
      case "promote":
        handlePromoteToAdmin(confirmDialog.member.id)
        break
      case "demote":
        handleDemoteFromAdmin(confirmDialog.member.id)
        break
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
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent flex items-center">
              Manage Club
              {pendingMembers.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {pendingMembers.length}
                </span>
              )}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {club.name} • #{club.code}
            </p>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-6 space-y-8">
        {/* Club Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{members.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg">
                  <UserPlus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{pendingMembers.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {members.filter((m) => m.role === "admin" || m.role === "creator").length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Management Tabs */}
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="members">Current Members ({members.length})</TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending Requests ({pendingMembers.length})
              {pendingMembers.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {pendingMembers.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Current Members Tab */}
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
                            {getRoleBadge(member.role)}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Joined: {new Date(member.joinedAt).toLocaleDateString()}</span>
                            <span>Last active: {new Date(member.lastActive).toLocaleDateString()}</span>
                            <span>Games played: {member.gamesPlayed}</span>
                          </div>
                        </div>
                      </div>

                      {!member.isCurrentUser && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Expanded Actions */}
                    {expandedMember === member.id && !member.isCurrentUser && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          {member.role === "member" && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                              onClick={() =>
                                setConfirmDialog({
                                  isOpen: true,
                                  type: "promote",
                                  member,
                                })
                              }
                            >
                              <ShieldCheck className="h-4 w-4 mr-1" />
                              Promote to Admin
                            </Button>
                          )}
                          {member.role === "admin" && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white"
                              onClick={() =>
                                setConfirmDialog({
                                  isOpen: true,
                                  type: "demote",
                                  member,
                                })
                              }
                            >
                              <Shield className="h-4 w-4 mr-1" />
                              Remove Admin Rights
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/50 dark:bg-gray-800/50 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                type: "remove",
                                member,
                              })
                            }
                          >
                            <UserMinus className="h-4 w-4 mr-1" />
                            Remove from Club
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pending Requests Tab */}
          <TabsContent value="pending">
            {pendingMembers.length > 0 ? (
              <div className="space-y-4">
                {pendingMembers.map((member) => (
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
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{member.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>Requested: {new Date(member.requestedAt).toLocaleDateString()}</span>
                              <span>Used code: {member.code}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                type: "accept",
                                member,
                              })
                            }
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white/50 dark:bg-gray-800/50 text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() =>
                              setConfirmDialog({
                                isOpen: true,
                                type: "reject",
                                member,
                              })
                            }
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 dark:text-gray-500 mb-4">
                    <UserPlus className="h-12 w-12 mx-auto mb-2" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No Pending Requests</h4>
                  <p className="text-gray-500 dark:text-gray-500">All join requests have been processed.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.isOpen}
        onOpenChange={(open) => setConfirmDialog({ isOpen: open, type: "remove", member: null })}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Confirm Action</span>
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.type === "accept" && (
                <>
                  Accept <strong>{confirmDialog.member?.name}</strong> as a member of this club?
                </>
              )}
              {confirmDialog.type === "reject" && (
                <>
                  Reject <strong>{confirmDialog.member?.name}</strong>'s request to join this club?
                </>
              )}
              {confirmDialog.type === "remove" && (
                <>
                  Remove <strong>{confirmDialog.member?.name}</strong> from this club? This action cannot be undone.
                </>
              )}
              {confirmDialog.type === "promote" && (
                <>
                  Promote <strong>{confirmDialog.member?.name}</strong> to admin? They will be able to host games and
                  manage members.
                </>
              )}
              {confirmDialog.type === "demote" && (
                <>
                  Remove admin rights from <strong>{confirmDialog.member?.name}</strong>? They will become a regular
                  member.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialog({ isOpen: false, type: "remove", member: null })}>
              Cancel
            </Button>
            <Button
              className={cn(
                "text-white",
                confirmDialog.type === "accept" &&
                  "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
                confirmDialog.type === "reject" &&
                  "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
                confirmDialog.type === "remove" &&
                  "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
                confirmDialog.type === "promote" &&
                  "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700",
                confirmDialog.type === "demote" &&
                  "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700",
              )}
              onClick={confirmAction}
            >
              {confirmDialog.type === "accept" && "Accept Member"}
              {confirmDialog.type === "reject" && "Reject Request"}
              {confirmDialog.type === "remove" && "Remove Member"}
              {confirmDialog.type === "promote" && "Promote to Admin"}
              {confirmDialog.type === "demote" && "Remove Admin Rights"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
