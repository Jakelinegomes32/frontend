import type { Message } from '../types'
import styles from './MessageBubble.module.css'

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user'
  const lines = message.text.split('\n')

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : ''}`}>
      {!isUser && <div className={styles.botIcon}>🤖</div>}

      <div className={styles.content}>
        <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleBot}`}>
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}

          {message.plans && <Plans plans={message.plans} />}
          {message.bullets && <Bullets items={message.bullets} />}
          {message.products && <Products products={message.products} />}
        </div>

        <div className={`${styles.meta} ${isUser ? styles.metaUser : ''}`}>
          {message.time}
          {isUser && <span className={styles.checkmarks}>✓✓</span>}
        </div>
      </div>
    </div>
  )
}

function Plans({ plans }: any) {
  return (
    <div className={styles.plans}>
      {plans.map((p: any, i: number) => (
        <div key={i} className={styles.planItem}>
          <span className={styles.planIcon}>{p.icon}</span>
          <div>
            <div className={styles.planName}>{p.name}</div>
            <div className={styles.planDesc}>{p.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Bullets({ items }: any) {
  return (
    <ul className={styles.bullets}>
      {items.map((b: string, i: number) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  )
}

function Products({ products }: any) {
  return (
    <div className={styles.products}>
      {products.map((p: any, i: number) => (
        <div key={i} className={styles.productCard}>
          <div className={styles.productEmoji}>{p.emoji}</div>
          <div className={styles.productInfo}>
            <div className={styles.productName}>{p.name}</div>
            <div className={styles.productPrice}>{p.price}</div>
            <a href="#" className={styles.productLink}>Ver detalhes</a>
          </div>
        </div>
      ))}
    </div>
  )
}