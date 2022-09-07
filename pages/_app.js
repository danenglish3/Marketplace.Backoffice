import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'

function Backoffice({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='container mx-auto'>
				<Header />
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default Backoffice
