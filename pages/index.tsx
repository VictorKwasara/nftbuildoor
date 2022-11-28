import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Disconnected from "../components/Disconnected"
import {useWallet} from "@solana/wallet-adapter-react"
import Connected from "../components/Connected"

export default function Home() {
  const {connected} = useWallet()
  return (
		<div className={styles.home}>
			<Head>
				<title>Buldoor</title>
				<link rel='icon' href='favicon.ico' />
			</Head>

			<main className={styles.main}>
				{!connected ? <Disconnected /> : <Connected />}
			</main>
		</div>
	);
}
