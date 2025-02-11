import ChatScreen from '@/components/chatScreen/ChatScreen.component'
import { TPage } from '@/types'
import { GetServerSideProps } from 'next'

const Home: TPage = () => {
  return <ChatScreen />
}

Home.rootLayoutProps = {
  title: 'Home',
  pageType: 'public',
}

export const getServerSideProps = (async ({ req, res }) => {
  return {
    props: {},
  }
}) satisfies GetServerSideProps<{}>

export default Home
