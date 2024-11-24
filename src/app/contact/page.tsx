'use client'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`)
      }

      if (!response.ok) throw new Error('Failed to send message')

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      console.error('Failed to send message:', err)
      setError(err instanceof Error ? err.message : t('errorSendingMessage'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-light-muted dark:text-dark-text">{t('contact')}</h1>
        <p className="text-light-muted/70 dark:text-dark-text/70 mb-12">{t('contactDesc')}</p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg mb-8 animate-fadeIn">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-400 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 px-6 py-4 rounded-lg mb-8 animate-fadeIn">
            {t('messageSentSuccess')}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-8 text-light-muted dark:text-dark-text">{t('contactInfo')}</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200">{t('address')}</h3>
                  <p className="text-light-muted/70 dark:text-dark-text/70">
                    123 Business Street,<br />
                    Kokand, Uzbekistan
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200">{t('phoneNumbers')}</h3>
                  <p className="text-light-muted/70 dark:text-dark-text/70">
                    +998 94 163 70 07<br />
                    +998 91 203 63 35
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-light-accent/10 dark:bg-dark-accent/10 rounded-lg p-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-light-accent dark:text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-light-muted dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-200">{t('email')}</h3>
                  <p className="text-light-muted/70 dark:text-dark-text/70">info@condor.uz</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-light-secondary dark:bg-dark-secondary rounded-xl p-8 border border-light-accent/10 dark:border-dark-accent/10 shadow-lg space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-muted dark:text-dark-text mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-light-primary dark:bg-dark-primary border border-light-accent/20 dark:border-dark-accent/20 text-light-muted dark:text-dark-text placeholder-light-muted/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-200"
                placeholder={t('namePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-muted dark:text-dark-text mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-light-primary dark:bg-dark-primary border border-light-accent/20 dark:border-dark-accent/20 text-light-muted dark:text-dark-text placeholder-light-muted/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-200"
                placeholder={t('emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-light-muted dark:text-dark-text mb-2">
                {t('subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-light-primary dark:bg-dark-primary border border-light-accent/20 dark:border-dark-accent/20 text-light-muted dark:text-dark-text placeholder-light-muted/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-200"
                placeholder={t('subjectPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-light-muted dark:text-dark-text mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-light-primary dark:bg-dark-primary border border-light-accent/20 dark:border-dark-accent/20 text-light-muted dark:text-dark-text placeholder-light-muted/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition-all duration-200 resize-none"
                placeholder={t('messagePlaceholder')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg font-medium text-light-primary dark:text-dark-primary bg-light-accent dark:bg-dark-accent hover:bg-light-accent/90 dark:hover:bg-dark-accent/90 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:ring-offset-2 transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin mr-2" />
                  {t('sending')}
                </div>
              ) : (
                t('sendMessage')
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
