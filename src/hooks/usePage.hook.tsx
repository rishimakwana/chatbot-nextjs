import { useRouter } from 'next/router'

export const usePage = () => {
  const router = useRouter()

  return {
    isDashboard: router.pathname.startsWith('/dashboard'),
    isAuthPage: router.pathname.startsWith('/auth/'),
  }
}
