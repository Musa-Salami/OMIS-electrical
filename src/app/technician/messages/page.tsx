"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  MoreVertical,
  Check,
  CheckCheck,
  MessageSquare,
  Image as ImageIcon
} from "lucide-react"

const mockConversations = [
  {
    id: "conv-1",
    name: "John Smith",
    role: "Customer",
    initials: "JS",
    lastMessage: "Thanks for the update, looking forward to the installation!",
    time: "11:00 AM",
    unread: 1,
    online: true,
    requestId: "REQ-001",
  },
  {
    id: "conv-2",
    name: "Patricia Lewis",
    role: "Customer",
    initials: "PL",
    lastMessage: "Can we reschedule to the afternoon?",
    time: "9:30 AM",
    unread: 1,
    online: false,
    requestId: "REQ-007",
  },
  {
    id: "conv-3",
    name: "OMIS Dispatch",
    role: "Operations",
    initials: "OD",
    lastMessage: "New job request in your area - EV charger installation",
    time: "Yesterday",
    unread: 0,
    online: true,
    requestId: null,
  },
  {
    id: "conv-4",
    name: "Nancy Clark",
    role: "Customer",
    initials: "NC",
    lastMessage: "What type of wire do you recommend for the garage?",
    time: "Feb 26",
    unread: 0,
    online: false,
    requestId: "REQ-009",
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "John Smith",
    isMe: false,
    message: "Hi Mike! Just wanted to check on the status of the permit application.",
    time: "10:00 AM",
    status: "read",
  },
  {
    id: 2,
    sender: "Me",
    isMe: true,
    message: "Hi John! Good news - the permits were approved yesterday. We're all set for the March 5th installation date.",
    time: "10:15 AM",
    status: "read",
  },
  {
    id: 3,
    sender: "John Smith",
    isMe: false,
    message: "That's great! Do I need to prepare anything before you arrive?",
    time: "10:20 AM",
    status: "read",
  },
  {
    id: 4,
    sender: "Me",
    isMe: true,
    message: "Just make sure the garage and driveway are accessible for our truck and equipment. We'll arrive around 8 AM and the first day is mostly setting up scaffolding and the mounting rails.",
    time: "10:30 AM",
    status: "read",
  },
  {
    id: 5,
    sender: "John Smith",
    isMe: false,
    message: "Thanks for the update, looking forward to the installation!",
    time: "11:00 AM",
    status: "delivered",
  },
]

export default function TechnicianMessagesPage() {
  const [selectedConv, setSelectedConv] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConvs = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with customers and dispatch</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-0 border rounded-lg overflow-hidden h-[calc(100vh-16rem)]">
        {/* Conversations */}
        <div className="border-r bg-gray-50 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 bg-white" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-start gap-3 p-4 cursor-pointer border-b ${
                  selectedConv.id === conv.id ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedConv(conv)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">{conv.initials}</AvatarFallback>
                  </Avatar>
                  {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">{conv.unread}</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-emerald-100 text-emerald-700">{selectedConv.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedConv.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedConv.online ? "Online" : "Offline"} • {selectedConv.role}
                  {selectedConv.requestId && ` • ${selectedConv.requestId}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">Today</Badge>
            </div>
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[75%]">
                  <div className={`p-3 rounded-2xl ${
                    msg.isMe ? "bg-emerald-600 text-white rounded-br-none" : "bg-white border rounded-bl-none"
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? "justify-end" : ""}`}>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                    {msg.isMe && (msg.status === "read" ? <CheckCheck className="h-3 w-3 text-blue-500" /> : <Check className="h-3 w-3 text-muted-foreground" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm"><Paperclip className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm"><ImageIcon className="h-4 w-4" /></Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setNewMessage("")}
              />
              <Button size="sm" disabled={!newMessage.trim()}><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
