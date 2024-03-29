'use client'

import {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from '@headlessui/react'

import {WALLET_LIST} from "../../lib/constant";
import {BounceLoader} from "react-spinners";

const installCheck = {
    "OKX": () => {
        return typeof window.okxwallet !== 'undefined'
    },
    "UniSat": () => {
        return typeof window.unisat !== 'undefined'
    },
}
const WalletListDialog = ({open, setOpen}) => {
    const cancelButtonRef = useRef(null)
    const [currentWallet, setCurrentWallet] = useState({})
    const [walletStatus, setWalletStatus] = useState('disconnected')
    const [toast, setToast] = useState(false)
    const [toastContent, setToastContent] = useState({
        type: 'error',
        title: '',
        body: ''
    })

    const connect = (wallet) => {
        try {
            if (!installCheck[wallet.name]()) {
                setToastContent({
                    type: 'error',
                    title: `${wallet.name} Wallet 还没有安装`,
                    body: <div className='text-gray-900'><a className='text-blue-600 text-bold' href={wallet.url}
                                                            target='_blank'>点击</a> 下载钱包</div>
                })
                return setToast(true)
            }

            // 开始连接钱包
            connecting(wallet)
        } catch (e) {
            setToastContent({
                type: 'error',
                title: `本Demo不支持当前钱包`,
                body: '目前仅支持OKX，UniSat'
            })
            return setToast(true)
        }
    }

    const connecting = async (wallet) => {
        setCurrentWallet(wallet)
        setWalletStatus('connecting')
        if (wallet.name === 'OKX') {
            try {
                // const accounts = await window.okxwallet.request({
                //     method: "eth_requestAccounts",
                // });
                const result = await window.okxwallet.bitcoin.connect()
                console.log(result)
                setWalletStatus('connected')
            } catch (e) {
                setWalletStatus('disconnecting')
            }

        } else if (wallet.name === 'UniSat') {

        }
    }

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10 select-none" initialFocus={cancelButtonRef}
                        onClose={() => (false)}>
                    {/*弹窗背景*/}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    {/*弹窗*/}
                    <div className="fixed inset-0 z-10 w-screen px-10 overflow-y-auto">
                        <div className="flex min-h-full items-start justify-center p-4 text-center pt-[20vh]">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <Dialog.Title as="h2"
                                                      className="text-base font-semibold leading-6 text-gray-900 text-center text-xl sm:text-2xl"
                                        >
                                            钱包列表
                                        </Dialog.Title>
                                        {
                                            walletStatus === 'disconnected' && WALLET_LIST.map((w) => (
                                                <div key={w.id}
                                                     className="cursor-pointer flex justify-between mt-6 sm:mx-4 p-4 rounded-xl border-2 hover:border-slate-200 hover:bg-slate-100"
                                                     onClick={() => {
                                                         connect(w)
                                                     }
                                                     }
                                                >
                                                    <img src={w.icon} className='w-6' alt="钱包图标"/>
                                                    <span
                                                        className='flex-1 text-center text-gray-900'>{w.name} Wallet</span>
                                                </div>
                                            ))
                                        }
                                        {/*钱包正在连接时展示下面的界面*/}
                                        {
                                            walletStatus === 'connecting' || walletStatus === 'connected' && <div
                                                className="cursor-pointer flex flex-col justify-between text-gray-900 items-center mt-6 sm:mx-4 p-4"
                                            >
                                                <img src={currentWallet.icon} className='w-10' alt="钱包图标"/>
                                                <span className='font-bold my-4'>{currentWallet.name} Wallet</span>
                                                <div className='flex items-center'>
                                                    <BounceLoader size={30} color="#000"/>
                                                    <span
                                                        className='ml-4'>{walletStatus === 'connecting' ? '正在连接中' : '钱包已连接'}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-10">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => {
                                                if (walletStatus === 'connecting') {
                                                    setWalletStatus('disconnected')
                                                } else {
                                                    setOpen(false)
                                                }
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            {walletStatus === 'connecting' && '返回'}
                                            {walletStatus === 'disconnected' && '关闭'}
                                            {walletStatus === 'connected' && '关闭'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={toast} as={Fragment}>
                <Dialog as="div" className="relative z-10 select-none" onClose={() => (false)}>
                    {/*toast*/}
                    <div className="fixed right-0 top-10 z-20">
                        <div className="flex min-h-full items-start justify-center p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="flex items-center relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg"
                                >
                                    <div className="flex-1 bg-white p-4">
                                        <Dialog.Title as="h3"
                                                      className={"text-base font-semibold leading-6 text-md" + (toastContent.type === 'error' ? ' text-red-600 ' : ' text-gray-900 ')}
                                        >
                                            {toastContent.title}
                                        </Dialog.Title>
                                        <div>
                                            {toastContent.body}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center rounded-md bg-red-600 h-6  px-2 py-1 text-sm text-white shadow-sm hover:bg-red-500"
                                            onClick={() => setToast(false)}
                                        >
                                            关闭
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
};

export default WalletListDialog;
