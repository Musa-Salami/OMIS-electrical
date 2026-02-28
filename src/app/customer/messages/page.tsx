"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  MoreVertical,
  MessageSquare,
  Check,
  CheckCheck,
  Clock,
  Image as ImageIcon
} from "lucide-react"

const mockConversations = [
  {
    id: "conv-1",
    name: "Mike Wilson",
    role: "Solar Technician",
    initials: "MW",
    lastMessage: "I'll be there tomorrow at 9 AM for the solar panel inspection.",
    time: "10:30 AM",
    unread: 2,
    online: true,
    requestId: "REQ-001",
  },
  {
    id: "conv-2",
    name: "Tom Harris",
    role: "EV Specialist",
    initials: "TH",
    lastMessage: "The EV charger has been ordered. Expected delivery in 3-5 days.",
    time: "Yesterday",
    unread: 0,
    online: false,
    requestId: "REQ-004",
  },
  {
    id: "conv-3",
    name: "OMIS Support",
    role: "Customer Support",
    initials: "OS",
    lastMessage: "Thank you for your feedback. We're glad you're satisfied!",
    time: "Feb 25",
    unread: 0,
    online: true,
    requestId: null,
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "Mike Wilson",
    isMe: false,
    message: "Hi John! I've reviewed your solar installation request. The roof looks great for solar panels.",
    time: "9:00 AM",
    status: "read",
  },
  {
    id: 2,
    sender: "Me",
    isMe: true,
    message: "That's great to hear! How many panels would you recommend for our energy needs?",
    time: "9:15 AM",
    status: "read",
  },
  {
    id: 3,
    sender: "Mike Wilson",
    isMe: false,
    message: "Based on your average monthly usage of 1,200 kWh, I'd recommend a 8kW system with 20 panels. This should cover about 90% of your electricity needs.",
    time: "9:30 AM",
    status: "read",
  },
  {
    id: 4,
    sender: "Me",
    isMe: true,
    message: "That sounds perfect. What about the timeline for installation?",
    time: "9:45 AM",
    status: "read",
  },
  {
    id: 5,
    sender: "Mike Wilson",
    isMe: false,
    message: "Once we get the permits approved (usually 1-2 weeks), the actual installation takes about 3-4 days. I'll send you a detailed quote shortly.",
    time: "10:00 AM",
    status: "read",
  },
  {
    id: 6,
    sender: "Mike Wilson",
    isMe: false,
    message: "I'll be there tomorrow at 9 AM for the solar panel inspection.",
    time: "10:30 AM",
    status: "delivered",
  },
]

export default function CustomerMessagesPage() {
  const [selectedConv, setSelectedConv] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConvs = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setNewMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Communicate with technicians and support</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-0 border rounded-lg overflow-hidden h-[calc(100vh-16rem)]">
        {/* Conversations Sidebar */}
        <div className="border-r bg-gray-50 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-b ${
                  selectedConv.id === conv.id ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedConv(conv)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {conv.initials}
                    </AvatarFallback>
                  </Avatar>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {selectedConv.initials}
                  </AvatarFallback>
                </Avatar>
                {selectedConv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{selectedConv.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedConv.online ? "Online" : "Offline"} • {selectedConv.role}
                  {selectedConv.requestId && ` • ${selectedConv.requestId}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">Today</Badge>
            </div>
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${msg.isMe ? "order-2" : ""}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.isMe
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white border rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${msg.isMe ? "justify-end" : ""}`}>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                    {msg.isMe && (
                      msg.status === "read" ? (
                        <CheckCheck className="h-3 w-3 text-blue-500" />
                      ) : (
                        <Check className="h-3 w-3 text-muted-foreground" />
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
