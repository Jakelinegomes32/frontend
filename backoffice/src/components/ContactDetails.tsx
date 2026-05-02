import { useApp } from '../context/AppContext'
import styles from './ContactDetails.module.css'

const CHANNEL_STYLE: Record<string, string> = {
  WhatsApp: styles.chipWhatsapp,
  Instagram: styles.chipInstagram,
  Chat: styles.chipChat,
}

export function ContactDetails() {
  const { activeConversation, setDetailsOpen } = useApp()

  if (!activeConversation) return null
  const conv = activeConversation

  return (
    <aside className={styles.panel}>
      <Header onClose={() => setDetailsOpen(false)} />
      <Body conv={conv} />
    </aside>
  )
}

function Header({ onClose }: any) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>Detalhes do contato</h3>
      <button className={styles.closeBtn} onClick={onClose}>✕</button>
    </div>
  )
}

function Body({ conv }: any) {
  return (
    <div className={styles.body}>
      <ContactInfo conv={conv} />
      <ConversationInfo conv={conv} />
      <Notes />
      <Tags tags={conv.tags} />
      <Actions />
    </div>
  )
}

function ContactInfo({ conv }: any) {
  return (
    <>
      <div className={styles.contactCenter}>
        <div className={styles.contactAvatar} style={{ background: conv.avatarColor }}>
          {conv.initials}
        </div>
        <span className={styles.contactName}>{conv.name}</span>
      </div>

      <div className={styles.contactInfo}>
        <InfoRow icon="📧" value={conv.email} />
        <InfoRow icon="📞" value={conv.phone} />
        <InfoRow icon="📍" value={conv.location} />
      </div>
    </>
  )
}

function InfoRow({ icon, value }: any) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoIcon}>{icon}</span>
      <span className={styles.infoVal}>{value}</span>
    </div>
  )
}

function ConversationInfo({ conv }: any) {
  return (
    <>
      <p className={styles.sectionTitle}>Informações da conversa</p>

      <Detail label="ID da conversa" value={`#1${conv.id.padStart(4, '0')}`} />
      <Detail label="Início" value={conv.startedAt} />

      <Detail
        label="Canal"
        value={
          <span className={`${styles.chip} ${CHANNEL_STYLE[conv.channel] ?? ''}`}>
            {conv.channel}
          </span>
        }
      />

      <Detail
        label="Status"
        value={
          <span className={`${styles.chip} ${conv.status === 'open' ? styles.chipOpen : styles.chipClosed}`}>
            {conv.status === 'open' ? 'Aberta' : 'Fechada'}
          </span>
        }
      />

      <Detail
        label="Atendente"
        value={<span className={`${styles.chip} ${styles.chipIa}`}>{conv.agent}</span>}
      />
    </>
  )
}

function Detail({ label, value }: any) {
  return (
    <div className={styles.detailRow}>
      <span className={styles.detailLabel}>{label}</span>
      <span className={styles.detailValue}>{value}</span>
    </div>
  )
}

function Notes() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionTitle}>Notas</p>
        <button className={styles.addBtn}>+ Adicionar nota</button>
      </div>
      <p className={styles.emptyNote}>Nenhuma nota adicionada</p>
    </>
  )
}

function Tags({ tags }: any) {
  return (
    <>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionTitle}>Tags</p>
        <button className={styles.addBtn}>+ Adicionar tag</button>
      </div>
      <div className={styles.tags}>
        {tags.map((tag: string) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </>
  )
}

function Actions() {
  return (
    <>
      <p className={styles.sectionTitle}>Ações rápidas</p>
      <button className={`${styles.actionBtn} ${styles.transfer}`}>
        Transferir conversa
      </button>
      <button className={`${styles.actionBtn} ${styles.finalize}`}>
        Finalizar conversa
      </button>
    </>
  )
}