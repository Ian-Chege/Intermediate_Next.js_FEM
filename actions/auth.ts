'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'
import { redirect } from 'next/navigation'

import { signin, signup } from '@/utils/authTools'
import { COOKIE_NAME } from '@/utils/constants'

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerUser = async (prevState: any, formData: FormData) => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token } = await signup(data)
    cookies().set(COOKIE_NAME, token)
  } catch (e) {
    console.error(e)
    return { message: 'Failed to register user' }
  }

  redirect('/dashboard')
}
