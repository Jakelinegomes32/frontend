export type MessageSender = 'user' | 'bot'
export type ConversationStatus = 'open' | 'closed'
export type Channel = 'WhatsApp' | 'Instagram' | 'Chat'
export type ConvTab = 'all' | 'open' | 'closed'

export interface PlanItem {
  icon: string
  name: string
  desc: string
}

export interface ProductItem {
  emoji: string
  name: string
  price: string
}

export interface Message {
  id: string
  sender: MessageSender
  text: string
  time: string
  plans?: PlanItem[]
  bullets?: string[]
  products?: ProductItem[]
  read?: boolean
}

export interface Conversation {
  id: string
  name: string
  initials: string
  avatarColor: string
  preview: string
  time: string
  unread: number
  messages: Message[]
  status: ConversationStatus
  channel: Channel
  agent: string
  email: string
  phone: string
  location: string
  tags: string[]
  startedAt: string
}