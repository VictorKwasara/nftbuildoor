import React, { MouseEventHandler, useCallback, useState, useMemo } from 'react';
import { NextPage } from 'next';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {PublicKey} from "@solana/web3.js";
import {useWallet, useConnection} from "@solana/wallet-adapter-react"
import { walletAdapterIdentity , Metaplex, } from '@metaplex-foundation/js';
import { useEffect } from 'react';
import Image from "next/image"
import Stack from '@mui/material/Stack';
import styles from '../styles/Connected.module.css';

interface NewMintProps{
  mint: PublicKey;
}

const NewMint: NextPage<NewMintProps> = ({mint}) => {
  const [metadata, setMetadata] = useState<any>()
  const {connection} = useConnection()
  const walletAdapter = useWallet()


  const metaplex = useMemo(()=> {
    return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
  },[connection,walletAdapter])
  
  useEffect(()=>{
    //what this does is to allow us to find the NFT object 
    // based on the given mint address 

    metaplex
			.nfts()
			.findByMint({ mintAddress: new PublicKey(mint) })
			.then((nft) => {
				// We then fetch the NFT uri to fetch the NFT metadata
				fetch(nft.uri)
					.then((res) => res.json())
					.then((metadata) => {
						setMetadata(metadata);
					});
			});
  }, [mint, metaplex, walletAdapter])
  
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {},
    []
  );
  return (
		<Stack spacing={8} className={styles.stack}>
			<h1 className={styles.textH1}>
				You can stack Your Zimbo bird and Earn Zee tokens
			</h1>
			<img src={metadata?.image ?? ''} alt='' height='200' width='200' />
			<Button
				size='large'
				color='secondary'
				variant='contained'
				endIcon={<SendIcon />}
				sx={{ color: '#BFA5A8', width: '230px' }}
				onClick={handleClick}
			>
				Stack Zimbo Bird
			</Button>
		</Stack>
	);
}

NewMint.getInitialProps = async ({query}) => {
	const {mint} = query ;

	if (!mint) throw { error: "No mint"};

	try {
		const mintPubkey = new PublicKey(mint)
		return {mint: mintPubkey} ;
	}catch {
		throw({error: "Invalid mint"}) ;
	}
}


export default NewMint