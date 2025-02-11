import { removeCookie, setCookie } from './cookie.util'

export const handleLogout = () => {
  removeCookie('token')
  location.replace('/')
}

export const TOKEN_EXPIRE_DURATION = 1

export const setUser = ({ token, redirection = true }: { token: string; redirection?: boolean }) => {
  setCookie('token', token, TOKEN_EXPIRE_DURATION)

  if (redirection) {
    const urlParams = new URLSearchParams(location.search)
    const returnTo = urlParams.get('returnTo')
    const redirectUrl = returnTo ?? '/dashboard/home'

    location.replace(redirectUrl)
  }
}
