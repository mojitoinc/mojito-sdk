import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AuthenticationProvider from '@/provider/AuthenticationProvider';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </AuthenticationProvider>
  )
}
