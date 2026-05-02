import { AppProvider, useApp } from './context/AppContext'
import { Sidebar } from './components/Sidebar'
import { ConversationList } from './components/ConversationList'
import { ChatWindow } from './components/ChatWindow'
import { ContactDetails } from './components/ContactDetails'

import './styles/global.css'
import styles from './App.module.css'

function AppLayout() {
  const { detailsOpen } = useApp()

  return (
    <div className={styles.app}>
      <Sidebar />
      <ConversationList />
      <ChatWindow />
      {detailsOpen && <ContactDetails />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  )
}