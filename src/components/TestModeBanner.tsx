import { useTranslation } from 'react-i18next'

export function TestModeBanner() {
  const { t } = useTranslation()

  return (
    <div className="bg-yellow-400 text-black py-2 px-4 text-center">
      {t('testModeActive')}
    </div>
  )
}