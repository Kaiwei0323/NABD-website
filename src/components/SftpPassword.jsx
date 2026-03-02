import { useAuth } from '../context/AuthContext'

const SftpPassword = ({ password = 'Great#525Inventec' }) => {
  const { user } = useAuth()
  const allowed = user?.role === 'admin' || user?.role === 'customer'

  if (allowed) return <code>{password}</code>

  return <span className="dev-password-contact">Become our partner to view password</span>
}

export default SftpPassword

