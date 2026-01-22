type User = {
  id: string
  code: string
  name: string
  role: string
  username: string
  active: boolean
  lastLogin?: string
  companyId?: number
}

type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = {
  user: User
  token: string
  expiredAt: string
}
