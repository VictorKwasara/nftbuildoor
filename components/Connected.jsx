import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Image from "next/image";
import {textH1, textP, textcontainer, stack} from "../styles/Connected.module.css";
import {motion} from "framer-motion";

const Connected = () => {
	return (
		<Stack spacing={8} className={stack}>
			<Box>
				<Stack direction='column' spacing={1} className={textcontainer}>
					<h1 className={textH1}>Welcome to Buildoor</h1>
					<p className={textP}>
						Each buildoor is randomly generated and can be staked to receive
						<strong> $BLD</strong> Use your <strong> $BLD</strong> to upgrade
						your buildoor and receive perks within the community!
					</p>
				</Stack>
			</Box>
			{/* <motion.div></motion.div> */}
			<Stack direction={{xs:'column',md:'row' }} spacing={8}>
				<motion.div whileHover={{ scale: 1.05 }}>
					<Image src='/avatar1.png' alt='' height='200' width='200' />
				</motion.div>
				<motion.div whileHover={{ scale: 1.05 }}>
					<Image src='/avatar2.png' alt='' height='200' width='200' />
				</motion.div>
				<motion.div whileHover={{ scale: 1.05 }}>
					<Image src='/avatar4.png' alt='' height='200' width='200' />
				</motion.div>
				<motion.div whileHover={{ scale: 1.05 }}>
					<Image src='/avatar5.png' alt='' height='200' width='200' />
				</motion.div>
				<motion.div whileHover={{ scale: 1.05 }}>
					<Image src='/avatar3.png' alt='' height='200' width='200' />
				</motion.div>
			</Stack>
			<Button
				size='large'
				color='secondary'
				variant='contained'
				endIcon={<SendIcon />}
				sx={{ color: '#BFA5A8', width: '230px' }}
			>
				Mint Buildoor
			</Button>
		</Stack>
	);
};

export default Connected;
