import { useEffect, useState } from 'react'

const DEFAULT_STATUS = 'new'

const formatStatus = (status) => {
  if (!status) return 'Pending'
  if (status === 'closed') return 'Completed'
  if (status === 'in-progress') return 'In Progress'
  return 'Pending'
}

const statusClass = (status) => {
  if (status === 'closed') return 'status-pill completed'
  if (status === 'in-progress') return 'status-pill in-progress'
  return 'status-pill pending'
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem('adminApiKey') || '')
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isKeyReady, setIsKeyReady] = useState(Boolean(localStorage.getItem('adminApiKey')))

  function saveAdminKey(nextKey) {
    if (!nextKey.trim()) {
      localStorage.removeItem('adminApiKey')
      setIsKeyReady(false)
      setError('Add the admin API key to view inquiry requests.')
      setInquiries([])
      return
    }

    localStorage.setItem('adminApiKey', nextKey.trim())
    setAdminKey(nextKey.trim())
    setIsKeyReady(true)
    setError('')
  }

  async function loadInquiries() {
    const key = localStorage.getItem('adminApiKey') || ''
    if (!key) {
      setInquiries([])
      setError('Add the admin API key to view inquiry requests.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/inquiries?page=1&limit=20&status=${DEFAULT_STATUS}`, {
        headers: {
          'X-Admin-Key': key,
        },
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Unable to load inquiries.')
      }

      setInquiries(Array.isArray(result.data?.items) ? result.data.items : [])
    } catch (loadError) {
      setError(loadError.message)
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isKeyReady) {
      loadInquiries()
    }
  }, [isKeyReady])

  async function updateStatus(inquiryId, nextStatus) {
    const key = localStorage.getItem('adminApiKey') || ''
    if (!key) {
      setError('The admin API key is missing.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': key,
        },
        body: JSON.stringify({ status: nextStatus }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Unable to update inquiry status.')
      }

      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry._id === inquiryId ? { ...inquiry, status: result.data?.status || nextStatus } : inquiry,
        ),
      )
    } catch (updateError) {
      setError(updateError.message)
    } finally {
      setLoading(false)
    }
  }

  function handleKeySubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    saveAdminKey(String(formData.get('adminKey') || ''))
  }

  const totalRequests = inquiries.length
  const pendingRequests = inquiries.filter((item) => item.status !== 'closed').length
  const completedRequests = inquiries.filter((item) => item.status === 'closed').length

  return (
    <section className="admin-dashboard-page">
      <div className="admin-dashboard-shell">
        <h1 className="admin-dashboard-title">Welcome back, Admin — here&apos;s what&apos;s happening today</h1>

        <div className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon blue">
              <span>🏢</span>
            </div>
            <div className="admin-stat-body">
              <p>Total client request</p>
              <h2>{totalRequests}</h2>

            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon orange">
              <span>🕒</span>
            </div>
            <div className="admin-stat-body">
              <p>Pending client requests</p>
              <h2>{pendingRequests}</h2>

            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon green">
              <span>✓</span>
            </div>
            <div className="admin-stat-body">
              <p>Completed</p>
              <h2>{completedRequests}</h2>

            </div>
          </div>
        </div>

        {!isKeyReady ? (
          <div className="admin-key-card">
            <h2>Add admin key</h2>
            <p>The backend requires the same X-Admin-Key configured in your environment for inquiry management.</p>
            <form onSubmit={handleKeySubmit} className="admin-key-form">
              <label>
                <span>Admin API key</span>
                <input type="password" name="adminKey" placeholder="Enter your backend ADMIN_API_KEY" defaultValue={adminKey} />
              </label>
              <button type="submit">Save key</button>
            </form>
          </div>
        ) : (
          <div className="admin-requests-panel">
            <div className="admin-panel-header">
              <h2>Consultation requests</h2>
            </div>

            {error && <div className="admin-error-box">{error}</div>}

            {loading ? (
              <div className="admin-empty-state">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="admin-empty-state">No inquiries found for the current filter.</div>
            ) : (
              <>
                <div className="admin-table-wrap">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Sr No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry, index) => (
                        <tr key={inquiry._id || `${inquiry.email}-${index}`}>
                          <td>{String(index + 1).padStart(2, '0')}</td>
                          <td>{inquiry.name || 'Unnamed client'}</td>
                          <td>{inquiry.email || '—'}</td>
                          <td>{inquiry.phone || '—'}</td>
                          <td>{inquiry.service || inquiry.type || '—'}</td>
                          <td>
                            <span className={statusClass(inquiry.status)}>{formatStatus(inquiry.status)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="admin-table-footer">
                  <span>Showing {Math.min(inquiries.length, 5)} of {inquiries.length} results</span>
                  <div className="admin-pagination">
                    <button type="button">‹ Prev</button>
                    <span>1</span>
                    <button type="button">Next ›</button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
