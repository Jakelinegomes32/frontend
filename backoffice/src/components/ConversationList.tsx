import { useApp } from '../context/AppContext'
import type { ConvTab } from '../types'
import styles from './ConversationList.module.css'

const TABS: { id: ConvTab; label: string }[] = [
  { id: 'all', label: 'Todas' },
  { id: 'open', label: 'Abertas' },
  { id: 'closed', label: 'Fechadas' },
]

export function ConversationList() {
  const {
    conversations,
    filteredConversations,
    activeId,
    tab,
    search,
    setActiveId,
    setTab,
    setSearch,
  } = useApp()

  const countByTab = (t: ConvTab) =>
    t === 'all'
      ? conversations.length
      : conversations.filter(c => c.status === (t === 'open' ? 'open' : 'closed')).length

  return (
    <div className={styles.panel}>
      <Header tab={tab} setTab={setTab} countByTab={countByTab} />

      <Search value={search} onChange={setSearch} />

      <List
        conversations={filteredConversations}
        activeId={activeId}
        onSelect={setActiveId}
      />
    </div>
  )
}

function Header({ tab, setTab, countByTab }: any) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>Conversas</h2>

      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`${styles.tab} ${tab === t.id ? styles.active : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label} <span className={styles.count}>{countByTab(t.id)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Search({ value, onChange }: any) {
  return (
    <div className={styles.searchBox}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        className={styles.searchInput}
        placeholder="Buscar conversas..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

function List({ conversations, activeId, onSelect }: any) {
  if (!conversations.length) {
    return <div className={styles.empty}>Nenhuma conversa encontrada.</div>
  }

  return (
    <ul className={styles.list}>
      {conversations.map((conv: any) => (
        <li
          key={conv.id}
          className={`${styles.item} ${activeId === conv.id ? styles.itemActive : ''}`}
          onClick={() => onSelect(conv.id)}
        >
          <div className={styles.avatar} style={{ background: conv.avatarColor }}>
            {conv.initials}
          </div>

          <div className={styles.info}>
            <span className={styles.name}>{conv.name}</span>
            <span className={styles.preview}>{conv.preview}</span>
          </div>

          <div className={styles.meta}>
            <span className={styles.time}>{conv.time}</span>
            {conv.unread > 0 && <span className={styles.badge}>{conv.unread}</span>}
          </div>
        </li>
      ))}
    </ul>
  )
}