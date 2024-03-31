'use client'
import {Popover, Transition} from '@headlessui/react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import {useAccount, useBalance, useDisconnect} from "wagmi";
import {useState} from "react";
import ChainListDialog from "./ChainListDialog";

const Wallet = ({address}) => {
        const {chainId, chain} = useAccount()
        const {disconnect} = useDisconnect()
        const {data: balance} = useBalance({address})
        const [open, setOpen] = useState(false)
        console.log('Wallet balance',balance)

        return (
            <>
                <Popover className="relative">
                    <div className='flex h-10'>
                        <button className='btn-plain mr-2' onClick={() => {
                            setOpen(true)
                        }}>
                            <span className='pr-2'>{chain.name}</span>
                            <ChevronDownIcon className='w-4'/>
                        </button>
                        <Popover.Button
                            className={['flex text-base text-center items-center leading-9 max-w-32 px-2 text-slate-950 rounded-xl border-2', chain ? 'bg-slate-200 hover:bg-slate-100  border-slate-400' : 'bg-red-500 border-red-500 text-slate-100'].join(' ')}
                        >
                        <span className='flex-1 text-ellipsis'>
                            {chain ? address : '错误的网络'}
                        </span>
                            <ChevronDownIcon className='w-4'/>
                        </Popover.Button>
                    </div>

                    <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >

                        <Popover.Panel
                            className="absolute z-10 bg-slate-100 mt-2 right-0 w-52 p-4 text-slate-900 rounded-xl shadow-xl">
                            <div className="grid grid-cols-1">
                                <div className='mt-2 px-4 h-8 leading-8 hover:bg-slate-300 rounded-md cursor-pointer'>
                                    链ID：{chainId}
                                </div>
                                <div className='mt-2 px-4 h-8 leading-8 hover:bg-slate-300 rounded-md cursor-pointer'>
                                    账户余额：{balance ? balance.formatted + " " + balance.symbol : ''}
                                </div>
                                <button className="mt-4 mx-4 btn-primary" onClick={() => (disconnect())}>断开连接</button>
                            </div>
                        </Popover.Panel>

                    </Transition>
                </Popover>
                <ChainListDialog open={open} setOpen={setOpen}/>
            </>
        )
    }
;

export default Wallet;
