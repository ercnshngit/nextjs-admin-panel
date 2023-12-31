import axiosClient from '@/lib/axios'
import {Login} from '@/types/auth'

export const login = async ({username, password}: Login) => {
  return axiosClient.post('/auth/login', {email: username, password})
}