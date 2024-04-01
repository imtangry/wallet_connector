'use client'
import {Popover, Transition} from '@headlessui/react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import {useEffect, useState} from "react";
import {useWalletContext} from "../Providers";

const Wallet = () => {
    const [balance, setBalance] = useState({formatted: '0', symbol: ''})
    const {state: {chainId, address, connector}, setState} = useWalletContext()

    useEffect(() => {
        console.log('wallet address', address)
        connector.getBalance().then((res) => {
            setBalance({formatted: (res.confirmed / 100000000).toFixed(4), symbol: 'BTC'})
        })
    }, [address])

    const handleDisconnect = () => {
        console.log('handleDisconnect')
        setState((v) => {
            return {...v, status: 'disconnected'}
        })
    }

    return (
        <>
            <Popover className="relative">
                <div className='flex h-10'>
                    {/*<button className='btn-plain mr-2' onClick={() => {*/}
                    {/*    setOpen(true)*/}
                    {/*}}>*/}
                    {/*    <span className='pr-2'>{chainId}</span>*/}
                    {/*    <ChevronDownIcon className='w-4'/>*/}
                    {/*</button>*/}
                    <Popover.Button
                        className={['flex text-base text-center items-center leading-9 max-w-32 px-2 text-slate-950 rounded-xl border-2', address ? 'bg-slate-200 hover:bg-slate-100  border-slate-400' : 'bg-red-500 border-red-500 text-slate-100'].join(' ')}
                    >
                        <span className='flex-1 text-ellipsis'>
                            {address}
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
                        className="absolute z-10 bg-slate-100 mt-2 right-0 w-60 p-4 text-slate-900 rounded-xl shadow-xl">
                        <div className="grid grid-cols-1">
                            <div className='mt-2 px-4 h-8 leading-8 hover:bg-slate-300 rounded-md cursor-pointer'>
                                链ID：{chainId}
                            </div>
                            <div className='mt-2 px-4 h-8 leading-8 hover:bg-slate-300 rounded-md cursor-pointer'>
                                余额：{balance ? balance.formatted + " " + balance.symbol : ''}
                            </div>
                            <button className="mt-4 mx-4 btn-primary" onClick={() => (
                                handleDisconnect()
                            )}>断开连接
                            </button>
                        </div>
                    </Popover.Panel>

                </Transition>
            </Popover>
            {/*<ChainListDialog open={open} setOpen={setOpen}/>*/}
        </>
    )
}

export default Wallet;
