const USER = 'user_data'
const TOKEN = 'user_token'

// USER DATA
export const setUserData = () => {
  localStorage.setItem(USER, 'true')
}

export const getUserData = () => {
  const data = localStorage.getItem(USER)
  return data ? JSON.parse(data || '') : ''
}

// USER TOKEN
export const setUserToken = (data: UserToken) => {
  localStorage.setItem(TOKEN, JSON.stringify(data))
}

export const getUserToken = () => {
  const data = localStorage.getItem(TOKEN)

  if (data) {
    // const ONE_HOUR = 60 * 60 * 1000 /* ms */
    const item = JSON.parse(data) as UserToken
    const exp = new Date(item.exp)
    const date = new Date()

    if (exp.getTime() < date.getTime()) {
      clearStorage()
      return null
    }
  }

  return data ? JSON.parse(data) : null
}

const AUTH = 'auth'

export const setAuth = () => {
  localStorage.setItem(AUTH, JSON.stringify({ token: 'fdsa' }))
}

export const getAuth = () => {
  const data = localStorage.getItem(AUTH)
  return data ? JSON.parse(data) : null
}

export const clearStorage = () => {
  localStorage.clear()
}
