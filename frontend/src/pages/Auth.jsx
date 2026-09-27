import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = formData.get('password')

    if (isRegister && password !== formData.get('confirmPassword')) {
      setNotice('The passwords do not match.')
      return
    }

    setNotice('Account access is not connected yet. Your details have not been saved.')
  }

  return (
    <section className="auth-page">
      <div className="auth-layout">
        <aside className="auth-intro">
          <span className="auth-kicker">Civil Consultancy Services</span>
          <h1>{isRegister ? 'Build with confidence.' : 'Welcome back.'}</h1>
          <p>
            {isRegister
              ? 'Create an account to keep your project conversations and consultancy requests together.'
              : 'Sign in to continue your project conversations with our consultancy team.'}
          </p>
          <div className="auth-intro-rule" />
          <span className="auth-intro-caption">Engineering expertise. Digital precision.</span>
        </aside>

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

            {notice && <p className="auth-notice" role="status">{notice}</p>}
            <button className="auth-submit" type="submit">{isRegister ? 'Create account' : 'Log in'}</button>
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