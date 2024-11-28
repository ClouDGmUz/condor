'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'

export default function AdminLogin() {
  const router = useRouter()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Add recaptcha script manually to ensure it's loaded
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.onload = () => setIsRecaptchaLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!recaptchaRef.current) {
        throw new Error('reCAPTCHA not loaded')
      }

      const recaptchaToken = await recaptchaRef.current.executeAsync()
      if (!recaptchaToken) {
        throw new Error('Failed to get reCAPTCHA token')
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...credentials,
          recaptchaToken
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid credentials')
        if (data.attemptsLeft) {
          setError(prev => `${prev} (${data.attemptsLeft} attempts remaining)`)
        }
      }
    } catch (err) {
      console.error('Login failed:', err)
      setError('Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
      recaptchaRef.current?.reset()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(221,216,196)] dark:bg-[rgb(26,29,26)] px-4">
      <div className="max-w-md w-full space-y-8 bg-light-secondary dark:bg-dark-secondary p-8 rounded-xl shadow-lg border border-light-accent/10 dark:border-dark-accent/10">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Image
              src="/logo.svg"
              alt="Condor Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-light-text dark:text-dark-text">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border border-light-accent/20 dark:border-dark-accent/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-light-text dark:text-dark-text">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border border-light-accent/20 dark:border-dark-accent/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {isRecaptchaLoaded && (
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            />
          )}

          <button
            type="submit"
            disabled={isLoading || !isRecaptchaLoaded}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-accent hover:bg-light-accent/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent dark:focus:ring-dark-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
