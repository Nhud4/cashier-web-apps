import * as req from '@utils/httpRequest'

const endpoints = {
  auth: '/auth/login',
  users: '/users',
}

export const login = async (payload: LoginRequest) => {
  const data = await req.basicPost<ApiResponse<LoginResponse>>(
    endpoints.auth,
    payload
  )
  return data
}
