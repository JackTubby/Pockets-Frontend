import createRequest from '../../core/utils/create-request'
import { AxiosResponse } from 'axios'

interface LoginParams {
  email: string
  password: string
}

const authRequest = createRequest()

export const login = async (credentials: LoginParams): Promise<AxiosResponse> => {
  const data = await authRequest({
    method: 'post',
    url: '/signin',
    data: credentials,
  })

  return data
}

export default {
  login,
}
