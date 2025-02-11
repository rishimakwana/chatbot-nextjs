import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { getCookie, removeCookie } from '@/utils'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { useLazyGetUserQuery } from '@/redux/api/auth.api'
import { setWebsiteLoader } from '@/redux/slice/layout.slice'
import { RootLayoutProps } from '@/layouts/rootLayout/RootLayout.type'

export const useAuth = ({ pageType, roles }: RootLayoutProps) => {
  const router = useRouter()
  const token = getCookie('token')
  const dispatch = useReduxDispatch()

  const [loading, setLoading] = useState(pageType === 'public' ? false : true)
  const [permission, setPermission] = useState(true)
  const [error, setError] = useState(false)

  const [getUser] = useLazyGetUserQuery()
  const { isLoggedIn, role, userData } = useReduxSelector((state) => state.user)

  useEffect(() => {
    dispatch(setWebsiteLoader(loading))
  }, [loading])

  useEffect(() => {
    if (token) {
      getUser(undefined, true)
        .unwrap()
        .catch(async (err) => {
          if (err?.status === 401) {
            removeCookie('token')
            if (pageType !== 'auth') await router.replace('/auth/login')
          } else setError(true)

          setLoading(false)
        })
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!token && pageType === 'protected') await router.replace(`/auth/login?returnTo=${location.pathname}${location.search}${location.hash}`)
      else if (!token) setLoading(false)
      else if (token && pageType === 'auth' && isLoggedIn && (await validate())) await router.replace('/dashboard/home')
      else if (pageType === 'protected' && isLoggedIn && (await validate())) {
        let isPermission: boolean = true
        if (roles && isPermission) isPermission = roles.includes(role)
        setPermission(isPermission)
        setLoading(false)
      }
    })()
  }, [router.pathname, isLoggedIn])

  const validate = async () => {
    if (role === 'lawyer' && userData.status === 'pending') {
      if (pageType !== 'auth') await router.push('/auth/lawyer/register')
      setLoading(false)
      return false
    }

    if (role === 'client' && !userData.profile.isProfileSetup && router.pathname !== '/client/onboard') {
      await router.push('/client/onboard')
      setLoading(false)
      return false
    } else if (role === 'client' && userData.profile.isProfileSetup && router.pathname === '/client/onboard') {
      await router.push('/dashboard/home')
      setLoading(false)
      return false
    }

    if (role === 'client' && userData.status === 'verified' && router.pathname !== '/subscription') {
      await router.push('/subscription')
      setLoading(false)
      return false
    } else if (role === 'client' && userData.status !== 'verified' && router.pathname === '/subscription') {
      await router.push('/dashboard/home')
      setLoading(false)
      return false
    }

    return true
  }

  return {
    isLoading: loading,
    isPermission: permission,
    isError: error,
  }
}
