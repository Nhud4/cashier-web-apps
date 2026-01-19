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
  role: string
}

type LoginResponse = {
  user: User
  token: string
  expiredAt: string
}

type CreateUserRequest = {
  name: string
  role: string
  username: string
  password: string
  companyId?: number
}

type UpdateUserRequest = {
  name?: string
  role?: string
  username?: string
  password?: string
  active?: string
  companyId?: number
}
