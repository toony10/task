import type { LoginResponse } from '@/types/login.types'

const TOKEN_KEYS = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  mediaAccessToken: 'mediaAccessToken',
  expiresIn: 'expiresIn',
} as const

export function storeTokens(tokens: LoginResponse) {
  localStorage.setItem(TOKEN_KEYS.accessToken, tokens.accessToken)
  localStorage.setItem(TOKEN_KEYS.refreshToken, tokens.refreshToken)
  localStorage.setItem(TOKEN_KEYS.mediaAccessToken, tokens.mediaAccessToken)
  localStorage.setItem(TOKEN_KEYS.expiresIn, tokens.expiresIn)
}

export function clearTokens() {
  Object.values(TOKEN_KEYS).forEach((key) => localStorage.removeItem(key))
}

export function hasAccessToken(): boolean {
  if (typeof window === 'undefined') return false

  return Boolean(localStorage.getItem(TOKEN_KEYS.accessToken))
}
