import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const [notice, setNotice] = useState('')
  const [noticeType, setNoticeType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const formData = new FormData(formElement)
    const password = formData.get('password')

    if (isRegister && password !== formData.get('confirmPassword')) {
      setNoticeType('error')
      setNotice('The passwords do not match.')
      return
    }

    setIsSubmitting(true)
    setNotice('')

    try {
      const body = {
        email: formData.get('email'),
        password,
        ...(isRegister ? { name: formData.get('name') } : {}),
      }
      const result = await apiRequest(`/auth/${isRegister ? 'register' : 'login'}`, { method: 'POST', body })
      localStorage.setItem('authToken', result.data.token)
      setNoticeType('success')
      setNotice(isRegister ? 'Account created successfully.' : 'Logged in successfully.')
      formElement.reset()
    } catch (error) {
      setNoticeType('error')
      setNotice(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <div className="auth-panel">
          <div className="auth-panel-heading">
            <span className="auth-step">{isRegister ? 'NEW CLIENT' : 'CLIENT ACCESS'}</span>
            <h2>{isRegister ? 'Create your account' : 'Log in to your account'}</h2>
            <p>{isRegister ? 'A few details to get started.' : 'Enter your details below to continue.'}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && (
              <label>
                Full name
                <input className="form-control" name="name" type="text" autoComplete="name" required />
              </label>
            )}
            <label>
              Email address
              <input className="form-control" name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Password
              <input className="form-control" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={8} required />
            </label>
            {isRegister && (
              <label>
                Confirm password
                <input className="form-control" name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required />
              </label>
            )}

            {notice && <p className={`auth-notice auth-notice-${noticeType}`} role={noticeType === 'error' ? 'alert' : 'status'}>{notice}</p>}
            <button className="auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Please wait...' : isRegister ? 'Create account' : 'Log in'}</button>
          </form>

          <p className="auth-switch">
            {isRegister ? 'Already have an account?' : 'New to Civil Consultancy Services?'}{' '}
            <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create an account'}</Link>
          </p>
        </div>
      </div>
    </section>
  )
}