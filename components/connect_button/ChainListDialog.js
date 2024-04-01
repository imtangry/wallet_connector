// 'use client'
// import {Fragment, useRef} from "react";
// import {Dialog, Transition} from '@headlessui/react'
// import {useAccount, useChains} from "wagmi";
//
// const ChainListDialog = ({open, setOpen}) => {
//     const cancelButtonRef = useRef(null)
//     const {chain, connector} = useAccount()
//     const chains = useChains()
//
//     const changeChain = async (chain) => {
//         try {
//             const res = await connector.switchChain({chainId: chain.id})
//             console.log(res)
//         } catch (e) {
//             console.log(e)
//             setOpen(false)
//         }
//     }
//
//     return (
//         <>
//             <Transition.Root show={open} as={Fragment}>
//                 <Dialog as="div" className="relative z-10 select-none" initialFocus={cancelButtonRef}
//                         onClose={() => (false)}>
//                     {/*弹窗背景*/}
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
//                     </Transition.Child>
//
//                     {/*弹窗*/}
//                     <div className="fixed inset-0 z-10 w-screen px-10 overflow-y-auto">
//                         <div className="flex min-h-full items-start justify-center p-4 text-center pt-[20vh]">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             >
//                                 <Dialog.Panel
//                                     className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-sm">
//                                     <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                                         <Dialog.Title as="h2"
//                                                       className="font-semibold text-gray-900 text-center text-xl sm:text-2xl"
//                                         >
//                                             切换网络
//                                         </Dialog.Title>
//                                         {
//                                             chains.map((c) => (
//                                                 <div key={c.id}
//                                                      className={['cursor-pointer flex justify-between mt-4 py-1 px-4 rounded-xl border-2',
//                                                          chain.id === c.id ? 'bg-blue-600 text-slate-100' : 'hover:border-slate-200 hover:bg-slate-100 text-gray-900'].join(' ')}
//                                                      onClick={(e) => {
//                                                          changeChain(c)
//                                                      }
//                                                      }
//                                                 >
//                                                     <img src={c.icon} className='max-w-6 max-h-6' alt="钱包图标"/>
//                                                     <span
//                                                         className='flex-1 text-center'>{c.name}</span>
//                                                 </div>
//                                             ))
//                                         }
//                                     </div>
//                                     {/*底部按钮*/}
//                                     <div className="bg-gray-50 px-4 py-2 pt-0 sm:flex sm:flex-row-reverse sm:px-10">
//                                         <button
//                                             type="button"
//                                             className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                                             onClick={() => {
//                                                 setOpen(false)
//                                             }}
//                                             ref={cancelButtonRef}
//                                         >
//                                             关闭
//                                         </button>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition.Root>
//         </>
//     )
// };
//
// export default ChainListDialog;
