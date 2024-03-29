'use client'
import {Disclosure} from '@headlessui/react'
import ConnectButton from "../connect_button/ConnectButton";

function Header() {
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start sm:items-stretch">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <ConnectButton/>
                        </div>
                    </div>
                </div>
            )}
        </Disclosure>
    );
}

export default Header;
