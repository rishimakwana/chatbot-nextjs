
import { useRouter } from 'next/router'

import ChatContent from './components/chatContent/ChatContent.component'
import { TPage } from '@/types'

const ChatSession: TPage = () => {
  const router = useRouter()
  return <ChatContent key={router.query.id as string} />
}

ChatSession.rootLayoutProps = {
  title: 'DocBot',
  pageType: 'public',
}

export default ChatSession