import { useState } from 'react'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { id: 'chat', icon: '💬', label: 'Chat' },
  { id: 'contacts', icon: '👥', label: 'Contatos' },
  { id: 'products', icon: '📦', label: 'Produtos' },
  { id: 'orders', icon: '🛒', label: 'Pedidos' },
  { id: 'reports', icon: '📊', label: 'Relat.' },
  { id: 'settings', icon: '⚙️', label: 'Config.' },
]

export function Sidebar() {
  const [active, setActive] = useState('chat')

  return (
    <aside className={styles.sidebar}>
      <Logo />

      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={active}
            onClick={() => setActive(item.id)}
          />
        ))}
      </nav>

      <User />
    </aside>
  )
}

function Logo() {
  return (
    <div className={styles.logo}>
      JUJU
      <span className={styles.logoSub}>Atendimento IA</span>
    </div>
  )
}

function NavItem({ item, active, onClick }: any) {
  return (
    <button
      className={`${styles.navItem} ${active === item.id ? styles.active : ''}`}
      onClick={onClick}
      title={item.label}
    >
      <span className={styles.navIcon}>{item.icon}</span>
      <span className={styles.navLabel}>{item.label}</span>
    </button>
  )
}

function User() {
  return (
    <div className={styles.bottom}>
      <div className={styles.userAvatar}>LS</div>
    </div>
  )
}