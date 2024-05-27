import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppContext } from '../../core/utils/app-provider'

const Logout = () => {
  const { setToken, setAccountId } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    setToken(null)
    setAccountId(null)
    navigate('/login', { replace: true })
  }, [navigate, setToken, setAccountId])

  return null
}

export default Logout
