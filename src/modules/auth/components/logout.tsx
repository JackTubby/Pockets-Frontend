import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth'
import { useEffect } from 'react'

const Logout = () => {
  const { setToken, setAccountId } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setToken(null)
    setAccountId(null)
    navigate('/login', { replace: true })
  }, [navigate, setToken, setAccountId])

  return null
}

export default Logout
