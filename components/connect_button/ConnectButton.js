'use client'

import {useEffect, useState} from "react";
import WalletListDialog from "./WalletListDialog";
import Wallet from "./Wallet";
import {useWalletContext} from "../Providers";


const ConnectButton = () => {
    const [dialogShow, setDialogShow] = useState(false);
    // const {status, address} = useAccount()
    // useAccountEffect({
    //     onConnect(data) {
    //         setTimeout(() => {
    //             setDialogShow(false)
    //         }, 300)
    //     },
    //     onDisconnect() {
    //         console.log('Disconnected!')
    //     },
    // })

    // 自定义context
    const {state: {status, connector}, setState} = useWalletContext()

    useEffect(() => {
        console.log('status change in connect_button', status)
        if (status === 'disconnected') {
            console.log('Disconnected!')
        } else if (status === 'connected') {
            setTimeout(() => {
                setDialogShow(false)
            }, 3000)
            // 监听账户切换事件 没有销毁 会不会内存溢出
            connector.accountChanged((address) => {
                setState((v) => {
                    return {...v, address}
                })
            })
        }
    }, [status])



    return (
        <div className='select-none'>
            {status !== 'connected' &&
            <button className='btn-primary' onClick={() => (setDialogShow(true))}>连接钱包</button>}

            {status === 'connected' && <Wallet/>}

            <WalletListDialog open={dialogShow} setOpen={setDialogShow}/>
        </div>
    )
};

export default ConnectButton;
