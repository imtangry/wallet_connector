'use client'

import {useAccount, useAccountEffect} from "wagmi";
import {useState} from "react";

import WalletListDialog from "./WalletListDialog";
import Wallet from "./Wallet";


const ConnectButton = () => {
    const {status, address} = useAccount()
    const [dialogShow, setDialogShow] = useState(false);


    useAccountEffect({
        onConnect(data) {
            setTimeout(() => {
                setDialogShow(false)
            }, 300)
        },
        onDisconnect() {
            console.log('Disconnected!')
        },
    })
    console.log('ConnectButton address', address)
    return (
        <div className='select-none'>
            {status !== 'connected' &&
            <button className='btn-primary' onClick={() => (setDialogShow(true))}>连接钱包</button>}

            {status === 'connected' && <Wallet address={address}/>}

            <WalletListDialog open={dialogShow} setOpen={setDialogShow}/>
        </div>
    )
};

export default ConnectButton;
