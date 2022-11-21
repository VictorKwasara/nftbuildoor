import{ React, useCallback} from 'react'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import {container, button} from "../styles/Disconnected.module.css"
import { useWalletModal} from "@solana/wallet-adapter-react-ui"
import {useWallet} from "@solana/wallet-adapter-react"

const Disconnected = () => {

  const modalState = useWalletModal()
  const {wallet, connect} = useWallet()

  const handleClick = useCallback(
    (event) => {
      if(event.defaultPrevented) {
        return
      }

      if (!wallet) {
        modalState.setVisible(true)
      }else {
        connect().catch(()=> {})
      }
    },[wallet, connect, modalState]
  )
   
  return (
		<div className={container}>
			<Button
				size='large'
			
				variant='contained'
				endIcon={<SendIcon />}
        onClick={handleClick}
        className={button}
			>
				Collect Your Own NFT
			</Button>
		</div>
	);
}

export default Disconnected