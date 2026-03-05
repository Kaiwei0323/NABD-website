import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getApiUrl } from '../utils/api'
import './Admin.css'

const ROLES = ['admin', 'customer', 'guest']

const Admin = () => {
  const { user, loading } = useAuth()
  const [users, setUsers] = useState([])
  const [fetchError, setFetchError] = useState('')
  const [updating, setUpdating] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    if (user?.role !== 'admin') return
    const apiUrl = getApiUrl()
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.users)
        else setFetchError(data.message || 'Failed to load users')
      })
      .catch(() => setFetchError('Failed to load users'))
  }, [user?.role])

  const handleRoleChange = (username, newRole) => {
    if (!user || user.role !== 'admin') return
    setUpdating(username)
    const apiUrl = getApiUrl()
    fetch(`${apiUrl}/user/${encodeURIComponent(username)}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers((prev) =>
            prev.map((u) => (u.username === username ? { ...u, role: newRole } : u))
          )
        }
      })
      .finally(() => setUpdating(null))
  }

  const handleDelete = (username) => {
    if (!user || user.role !== 'admin') return
    if (username === user.username) return
    if (!window.confirm(`Delete user "${username}"? This cannot be undone.`)) return
    setDeleting(username)
    const apiUrl = getApiUrl()
    fetch(`${apiUrl}/user/${encodeURIComponent(username)}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers((prev) => prev.filter((u) => u.username !== username))
        } else {
          alert(data.message || 'Failed to delete user')
        }
      })
      .catch(() => alert('Failed to delete user'))
      .finally(() => setDeleting(null))
  }

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Admin – Role control</h1>
        <p className="admin-subtitle">Change user roles. Only admin users can access this page.</p>
        {fetchError && <div className="admin-error">{fetchError}</div>}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id || u.username}>
                  <td>{u.username}</td>
                  <td>
                    <select
                      className="admin-role-select"
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.username, e.target.value)}
                      disabled={updating === u.username}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    {updating === u.username && <span className="admin-saving">Saving…</span>}
                  </td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    {u.username !== user?.username ? (
                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={() => handleDelete(u.username)}
                        disabled={deleting === u.username}
                        title="Delete user"
                      >
                        {deleting === u.username ? 'Deleting…' : 'Delete'}
                      </button>
                    ) : (
                      <span className="admin-self">(you)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && !fetchError && <p className="admin-empty">No users yet.</p>}
      </div>
    </div>
  )
}

export default Admin
