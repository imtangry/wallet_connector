'use client'

import {useAccount} from "wagmi";
import {useState} from "react";

import WalletListDialog from "./WalletListDialog";


const ConnectButton = () => {
        const {status, address} = useAccount()
        const [dialogShow, setDialogShow] = useState(false);
        return (
            <div className='select-none'>
                {status !== 'connected' &&
                <button className='btn-primary' onClick={() => {
                    setDialogShow(true)
                }}>连接钱包</button>
                }
                {status === 'connected' &&
                <div className='text-center leading-9 text-ellipsis max-w-32 px-2 text-slate-950 rounded-xl bg-slate-100 border-2 border-slate-400'>
                    {address}
                </div>
                }
                <WalletListDialog open={dialogShow} setOpen={setDialogShow}/>
            </div>
        )
    }
;

export default ConnectButton;
