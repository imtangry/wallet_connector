import {Popover, Transition} from '@headlessui/react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import {useDisconnect} from "wagmi";

const Wallet = ({address}) => {
        const {disconnect} = useDisconnect()
        return (
            <Popover className="relative">
                <Popover.Button
                    className='flex text-center items-center leading-9 max-w-32 px-2 text-slate-950 rounded-xl bg-slate-100 border-2 border-slate-400'>
                    <span className='flex-1 text-ellipsis'>
                        {address}
                    </span>
                    <ChevronDownIcon className='w-4'/>
                </Popover.Button>

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
                            <div className='mt-2 py-1 px-4 hover:bg-slate-300 rounded-md cursor-pointer'>
                                链：
                            </div>
                            <div className='mt-2 py-1 px-4 hover:bg-slate-300 rounded-md cursor-pointer'>
                                账户余额：
                            </div>
                            <div className='mt-2 py-1 px-4 hover:bg-slate-300 rounded-md cursor-pointer'
                                 onClick={() => (disconnect())}>
                                断开连接
                            </div>
                        </div>
                    </Popover.Panel>

                </Transition>
            </Popover>
        )
    }
;

export default Wallet;
