import '../styles/globals.css'
import '@material-tailwind/react/tailwind.css'
import Head from 'next/head'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps}) {
  return(
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
        </Head>
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
        
    </>
  ) 
}

export default MyApp
