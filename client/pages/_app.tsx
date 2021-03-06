import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { AuthProvider } from '../contexts/AuthContext.'
import Header from '../components/header'




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>





    </>

  )


}





export default MyApp
