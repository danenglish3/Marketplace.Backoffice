import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Backoffice({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className='mx-auto'>
				<Header />
				<main className='main'>
					<Component {...pageProps} />
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Backoffice
