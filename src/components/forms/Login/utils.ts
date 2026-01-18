import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const loginSchema = z.object({
  password: z
    .string()
    .nonempty('Password harus diisi.')
    .min(8, { message: 'Password harus lebih dari 8 karakter.' }),
  username: z
    .string()
    .nonempty('Username harus diisi.')
    .min(4, { message: 'Username harus lebih dari 4 karakter.' }),
})

export const resolver = zodResolver(loginSchema)
