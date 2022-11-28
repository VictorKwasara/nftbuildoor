import React, {MouseEventHandler, useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Image from "next/image";
import {textH1, textP, textcontainer, stack} from "../styles/Connected.module.css";
import {motion} from "framer-motion";
import { useRouter } from 'next/router';
import { walletAdapterIdentity } from '@metaplex-foundation/js';
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {Metaplex} from "@metaplex-foundation/js"
import { useEffect } from 'react';
import * as web3 from "@solana/web3.js"


const Connected = () => {
	const [nftData, setNftData] = useState(null) ;
	const [isMinting, setIsMinting] = useState(false); ;
	const [candyMachine, setCandyMachine] = useState(null)
	const [pageItems, setPageItems] = useState(null)
	const [page, setPage] = useState(1)
	const router = useRouter();
	const {connection} = useConnection()
	const wallet = useWallet() 
	const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet))
	
  const CANDY_MACHINE_ADDRESS = '41WNRSMMGJpkR8hQ9C4CG8HRSBvyqyVBZDckRGT4T38d';


	const fetchCandyMachine = async () => {

		 setPage(1)
			//fetch candymachine data
			try {
				const candyMachine = await metaplex 
				  .candyMachinesV2()
					.findByAddress({
						address: new web3.PublicKey(CANDY_MACHINE_ADDRESS)
					})
					
					setCandyMachine(candyMachine)
			} catch (e){
				alert("Please submit a valid CMv2 address  ", e)
			}
	}

	 //paging
	const getPage = async (page, perPage) => {
		const pageItems = candyMachine.items.slice(
			(page - 1) * perPage,
			 page * perPage
		)

		//fetch metadata of NFTs for page

		let nftData = []
		for (let i = 0; i < pageItems.length; i++) {
			let fetchResult = await fetch(pageItems[i].uri)
			let json = await fetchResult.json()
			nftData.push(json)
		}
		
		//set state
		setPageItems(nftData)
		
	}

	const prev = async () => {
		if(page - 1 < 1) {
			setPage(1)
		} else {
			setPage(page -1)
		}
	}

	//next page
	const next = async () => {
		setPage(page + 1)
	}

	useEffect(()=> {
		fetchCandyMachine()
	}, [])

	//fetch metadata for NFTs when page or candy machine changes 
  useEffect(()=> {
		if (!candyMachine){
			return
		}
		getPage(page, 5)
	},[candyMachine, page])

	const handleClick = useCallback(
		
		async (event) => {
			
			if(event.defaultPrevented) return;
			if(walletAdapterIdentity.connected || !candyMachine) return ;
      
			try {
				setIsMinting(true);
         console.log("called")
				const nft = await metaplex
				  .candyMachinesV2()
					.mint({candyMachine});
					console.log("reached")
          
					router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);
					
			} catch (error) {
				alert(error);
			} finally {
				setIsMinting(false);
			}
		},
		[metaplex, wallet, candyMachine]
	)
	return (
		<Stack spacing={8} className={stack}>
			<Box>
				<Stack direction='column' spacing={1} className={textcontainer}>
					<h1 className={textH1}>Welcome to Buildoor</h1>
					<p className={textP}>
						Each Zimbo Bird is randomly generated and can be staked to receive
						<strong> $Zeee </strong> Use your <strong> $Zeee</strong> to receive
						 perks within the community!
					</p>
				</Stack>
			</Box>
			{/* <motion.div></motion.div> */}
			<Stack direction={{ xs: 'column', md: 'row' }} spacing={8}>
				{pageItems &&
					pageItems.map((v, i) => {
						console.log('v ', v);
						return (
							<motion.div key={i + v.name} whileHover={{ scale: 1.05 }}>
								<img src={v.image} alt='' height='200' width='200' />
							</motion.div>
						);
					})}
			</Stack>
			{page == 1 ? (
				<Button
					onClick={next}
					variant='outlined'
					style={{ color: '#FFD200' }}
					size='large'
				>
					Next
				</Button>
			) : page > 1 && page < candyMachine.items.length / 5 ? (
				<Stack direction='row' spacing={4}>
					<Button
						onClick={prev}
						variant='outlined'
						style={{ color: '#FFD200' }}
						size='large'
					>
						Prev
					</Button>
					<Button
						onClick={next}
						variant='outlined'
						style={{ color: '#FFD200' }}
						size='large'
					>
						Next
					</Button>
				</Stack>
			) : (
				<Button
					onClick={prev}
					variant='outlined'
					size='large'
					style={{ color: '#FFD200' }}
				>
					Prev
				</Button>
			)}
			<Button
				size='large'
				color='secondary'
				variant='contained'
				endIcon={<SendIcon />}
				sx={{ color: '#BFA5A8', width: '230px' }}
				onClick={handleClick}
			>
				Mint Zimbo Bird
			</Button>
		</Stack>
	);
};

export default Connected;
