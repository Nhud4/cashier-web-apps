import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const loginSchema = z.object({
  password: z.string().nonempty('Password harus diisi.'),
  username: z.string().nonempty('Username harus diisi.'),
})

export const resolver = zodResolver(loginSchema)
