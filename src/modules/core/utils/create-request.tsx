import axios, { AxiosInstance } from 'axios'

export default function createRequest(): AxiosInstance {
  const request = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 600000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return request
}
