'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {WagmiProvider} from 'wagmi'
import {http, createConfig} from 'wagmi'
import {injected} from 'wagmi/connectors'
import {mainnet} from 'wagmi/chains'
import {createContext, useContext, useMemo, useState} from "react";

// 添加本系统 支持的链
const BTC = {
    id: 198,
    name: 'Bitcoin',
    nativeCurrency: {name: 'Bitcoin', symbol: 'BTC', decimals: 18},
    rpcUrls: {
        default: {http: ['https://rpc.bitchain.biz']},
    },
}

const config = createConfig({
    chains: [mainnet, BTC],
    connectors: [injected()],
    transports: {
        [mainnet.id]: http(),
    },
})

const queryClient = new QueryClient()

// wagmi基于ethers 不支持BTC 所有操作状态需要自己维护
const walletStates = {
    wallet: null, // 当前连接的钱包
    status: 'disconnected', // 钱包的连接状态
    address: undefined, // 钱包里的账户地址
    chainId: undefined, // 当前链
    connector: null, // 钱包的一些通用方法
}
const WalletContext = createContext(null)
export const useWalletContext = () => (useContext(WalletContext))
export const Providers = ({children}) => {
    const [state, setState] = useState(walletStates)
    const contextValue = useMemo(() => {
        return {state, setState}
    }, [state, setState])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletContext.Provider value={contextValue}>
                    {children}
                </WalletContext.Provider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
