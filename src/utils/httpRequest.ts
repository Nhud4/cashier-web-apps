import { clearStorage, getUserToken } from '@storage/index'

const SERVER_HOST = import.meta.env.REACT_APP_API_HOST || ''
const basicCredentials = Buffer.from(
  `${import.meta.env.REACT_APP_BASIC_AUTH_USERNAME}:${import.meta.env.REACT_APP_BASIC_AUTH_PASSWORD}`,
  'utf-8'
).toString('base64')
const timeoutDuration = 30000

export const baseFetch = async (
  endpoint: string,
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH',
  body?: Record<string, unknown>
) => {
  const url = `${SERVER_HOST}${endpoint}`
  const headers = new Headers()
  const controller = new AbortController()
  const user = getUserToken() as UserToken
  const timeoutId = setTimeout(() => controller.abort(), timeoutDuration)
  const isFormData = body instanceof FormData
  if (!isFormData) {
    headers.set('Content-Type', 'application/json')
  }
  if (!user) headers.set('Authorization', `Basic ${basicCredentials}`)
  if (user) {
    const { token } = user
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  return fetch(url, {
    body: isFormData ? body : JSON.stringify(body),
    headers,
    method,
    signal: controller.signal,
  }).then((response) => {
    clearTimeout(timeoutId)
    if ([401].includes(response.status)) {
      clearStorage()
      window.location.href = '/'
    }
    return response
  })
}

export const basicFetch = async (
  endpoint: string,
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH',
  body?: Record<string, unknown>
) => {
  const url = `${SERVER_HOST}${endpoint}`
  const headers = new Headers()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutDuration)
  const isFormData = body instanceof FormData
  if (!isFormData) {
    headers.set('Content-Type', 'application/json')
  }

  headers.set('Authorization', `Basic ${basicCredentials}`)

  return fetch(url, {
    body: isFormData ? body : JSON.stringify(body),
    headers,
    method,
    signal: controller.signal,
  }).then((response) => {
    clearTimeout(timeoutId)
    if ([401].includes(response.status)) {
      clearStorage()
      window.location.href = '/'
    }
    return response
  })
}

export async function post<T>(endpoint: string, body: Record<string, unknown>) {
  const response = await baseFetch(endpoint, 'POST', body)
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return data as T
}

export async function put<T>(endpoint: string, body: Record<string, unknown>) {
  const response = await baseFetch(endpoint, 'PUT', body)
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return data as T
}

export async function patch<T>(
  endpoint: string,
  body: Record<string, unknown>
) {
  const response = await baseFetch(endpoint, 'PATCH', body)
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return data as T
}

export async function remove<T>(
  endpoint: string,
  body?: Record<string, unknown>
) {
  const response = await baseFetch(endpoint, 'DELETE', body)
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return data as T
}

export async function get<T>(
  endpoint: string,
  params?: Record<string, unknown>
) {
  const query: string = params
    ? Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')
    : ''
  const response = await baseFetch(`${endpoint}?${query}`, 'GET')
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return data as T
}

export async function basicGet<T>(
  endpoint: string,
  params?: Record<string, unknown>
) {
  const query: string = params
    ? Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')
    : ''
  const response = await basicFetch(`${endpoint}?${query}`, 'GET')
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return data as T
}

export async function basicPost<T>(
  endpoint: string,
  body: Record<string, unknown>
) {
  const response = await basicFetch(endpoint, 'POST', body)
  const data = await response.json()
  if (response.status >= 400) throw data as T
  return { ...data, code: 200, success: true } as T
}
