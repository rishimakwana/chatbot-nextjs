export const formatToTitleCase = (value: string) => {
  value = String(value || '')
  value = value
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
  value = value.toLowerCase()
  value = value.replace(/(^|\s)\w/g, (match) => match.toUpperCase())
  return value
}

export const removeSpace = (value: string) => value.replaceAll(' ', '')

export const htmlToText = (html: string): string => {
  const tempElement = document.createElement('div')
  tempElement.innerHTML = html
  return (tempElement.textContent || tempElement.innerText || '').trim()
}

type Color = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'

export const getStatusColor = (status: string): Color => {
  status = String(status)

  const color: Record<string, string> = {
    active: 'success',
    verified: 'warning',
    pending: 'default',
    inactive: 'default',
    deteled: 'error',
    underReview: 'warning',
    accept: 'success',
    reject: 'error',
    success: 'success',
    failed: 'error',
  }

  return (color[status] || 'default') as Color
}
