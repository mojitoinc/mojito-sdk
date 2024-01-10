import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import AuthProvider from '@/provider/AuthProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Script src="https://cdn.checkout.com/js/framesv2.min.js" />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
