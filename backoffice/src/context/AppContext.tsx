import {createContext, useContext, useState,
  useCallback, type ReactNode,
} from 'react'

import { CONVERSATIONS } from '../data/conversations'
import type { Conversation, ConvTab, Message } from '../types'

interface AppState {
  conversations: Conversation[]
  activeId: string
  tab: ConvTab
  search: string
  detailsOpen: boolean
}

interface AppActions {
  setActiveId: (id: string) => void
  setTab: (tab: ConvTab) => void
  setSearch: (q: string) => void
  setDetailsOpen: (open: boolean) => void
  sendMessage: (convId: string, text: string) => void
  filteredConversations: Conversation[]
  activeConversation: Conversation | undefined
}

type AppContextType = AppState & AppActions

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [tab, setTab] = useState<ConvTab>('all')
  const [search, setSearch] = useState('')
  const [detailsOpen, setDetailsOpen] = useState(true)


  const sendMessage = useCallback((convId: string, text: string) => {
    const newMsg = createUserMessage(text)

    updateConversation(convId, conv => ({
      ...conv,
      messages: [...conv.messages, newMsg],
      preview: formatPreview(text),
      time: newMsg.time,
    }))

    simulateBotReply(convId, text, setConversations)
  }, [])

  const filteredConversations = conversations.filter(conv => {
    return matchTab(conv, tab) && matchSearch(conv, search)
  })

  const activeConversation = conversations.find(c => c.id === activeId)

  return (
    <AppContext.Provider
      value={{
        conversations,
        activeId,
        tab,
        search,
        detailsOpen,
        setActiveId,
        setTab,
        setSearch,
        setDetailsOpen,
        sendMessage,
        filteredConversations,
        activeConversation,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

function createUserMessage(text: string): Message {
  return {
    id: `m${Date.now()}`,
    sender: 'user',
    text,
    time: getTime(),
    read: false,
  }
}

function createBotMessage(text: string): Message {
  return {
    id: `m${Date.now() + 1}`,
    sender: 'bot',
    text,
    time: getTime(),
  }
}

function getTime() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function updateConversation(
  convId: string,
  updater: (conv: Conversation) => Conversation
) {
  setGlobalConversations(prev =>
    prev.map(conv => (conv.id === convId ? updater(conv) : conv))
  )
}

let setGlobalConversations: React.Dispatch<React.SetStateAction<Conversation[]>>

function simulateBotReply(
  convId: string,
  text: string,
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>
) {
  setGlobalConversations = setConversations

  setTimeout(() => {
    const botReply = createBotMessage(getBotReply(text))

    setConversations(prev =>
      prev.map(conv =>
        conv.id === convId
          ? { ...conv, messages: [...conv.messages, botReply] }
          : conv
      )
    )
  }, 1200)
}

function matchTab(conv: Conversation, tab: ConvTab) {
  if (tab === 'all') return true
  return conv.status === tab
}

function matchSearch(conv: Conversation, search: string) {
  if (!search) return true

  const q = search.toLowerCase()
  return (
    conv.name.toLowerCase().includes(q) ||
    conv.preview.toLowerCase().includes(q)
  )
}

function formatPreview(text: string) {
  return text.length > 40 ? text.slice(0, 40) + '...' : text
}

function getBotReply(userText: string): string {
  const text = userText.toLowerCase()

  if (includesAny(text, ['plano', 'preço', 'valor']))
    return 'Temos os planos Básico (R$49/mês), Profissional (R$99/mês) e Empresarial (R$199/mês). Qual deles te interessa?'

  if (includesAny(text, ['upgrade', 'mudar']))
    return 'Você pode fazer upgrade a qualquer momento nas configurações da sua conta. 🚀'

  if (includesAny(text, ['cancelar', 'cancelamento']))
    return 'Para cancelar, preciso do número do pedido. Pode me informar?'

  if (includesAny(text, ['prazo', 'entrega']))
    return 'O prazo de entrega é de 3 a 7 dias úteis.'

  if (text.includes('obrigad'))
    return 'Se precisar de mais alguma coisa, é só chamar.'

  return 'Posso te ajudar com mais alguma coisa?'
}

function includesAny(text: string, keywords: string[]) {
  return keywords.some(k => text.includes(k))
}