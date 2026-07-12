const placeholderPatterns = ['your-', 'your_', 'example.com', 'your-email', 'your-username']

export function isUsableContactLink(value) {
  if (!value || typeof value !== 'string') return false
  const normalizedValue = value.toLowerCase()
  return !placeholderPatterns.some((pattern) => normalizedValue.includes(pattern))
}

export function getEmailAddress(emailValue) {
  if (!emailValue) return ''
  return emailValue.replace(/^mailto:/i, '').split('?')[0].trim()
}
