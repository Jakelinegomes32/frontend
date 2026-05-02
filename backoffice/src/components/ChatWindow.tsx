import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useApp } from '../context/AppContext'
import { MessageBubble } from './MessageBubble'
import styles from './ChatWindow.module.css'

export function ChatWindow() {
  const { activeConversation, activeId, sendMessage, setDetailsOpen, detailsOpen } = useApp()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeConversation?.messages.length])

  if (!activeConversation) return null

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    sendMessage(activeId, text)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className={styles.window}>
      <Header
        conv={activeConversation}
        detailsOpen={detailsOpen}
        toggleDetails={() => setDetailsOpen(!detailsOpen)}
      />

      <Messages messages={activeConversation.messages} bottomRef={bottomRef} />

      <InputArea
        input={input}
        setInput={setInput}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

function Header({ conv, detailsOpen, toggleDetails }: any) {
  return (
    <div className={styles.header}>
      <div className={styles.avatar} style={{ background: conv.avatarColor }}>
        {conv.initials}
      </div>

      <div className={styles.headerInfo}>
        <span className={styles.name}>{conv.name}</span>
        <span className={styles.status}>
          <span className={styles.onlineDot} /> Online
        </span>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} title="Editar">✏️</button>
        <button className={styles.iconBtn} title="Resolver">✓</button>
        <button className={styles.iconBtn} title="Detalhes do contato" onClick={toggleDetails}>
          ⋯
        </button>
      </div>
    </div>
  )
}

function Messages({ messages, bottomRef }: any) {
  return (
    <div className={styles.messages}>
      <div className={styles.dateDivider}>Hoje</div>
      {messages.map((msg: any) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

function InputArea({ input, setInput, onSend, onKeyDown }: any) {
  return (
    <div className={styles.inputArea}>
      <div className={styles.inputRow}>
        <button className={styles.inputIcon}>📎</button>

        <input
          className={styles.input}
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />

        <button className={styles.inputIcon}>😊</button>

        <button className={styles.sendBtn} onClick={onSend} disabled={!input.trim()}>
          ➤
        </button>
      </div>
    </div>
  )
}