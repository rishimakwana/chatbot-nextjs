import ChatScreen from '@/components/chatScreen/ChatScreen.component'
import { TPage } from '@/types'

const ChatSession: TPage = () => {
  return <ChatScreen />
}

ChatSession.rootLayoutProps = {
  title: 'Chat Session',
  pageType: 'public',
}

export default ChatSession