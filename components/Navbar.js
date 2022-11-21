import React from 'react'
import styles from '../styles/Home.module.css';
import {AppBar} from "@mui/material"
import dynamic from "next/dynamic"

const WalletMultiButton = dynamic(
async () => (
    await import("@solana/wallet-adapter-react-ui")
  ).WalletMultiButton, {ssr: false}
);

const Navbar = () => {
  return (
		<AppBar position='static' className={styles.appbar}>
		  <h2 className={styles.header}>Mint your own NFT</h2>
			<WalletMultiButton className={styles['wallet-adapter-button-trigger']} />
		</AppBar>
		// <h1>STuff</h1>
	);
  }
  


export default Navbar