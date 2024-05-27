import { AxiosResponse } from 'axios'
import { axios } from '../../core/utils/app-provider'

interface LoginParams {
  email: string
  password: string
}

export const login = async (credentials: LoginParams): Promise<AxiosResponse> => {
  const data = await axios({
    method: 'post',
    url: '/signin',
    data: credentials,
  })

  return data
}

export default {
  login,
}
