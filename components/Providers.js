'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {WagmiProvider} from 'wagmi'
import {http, createConfig} from 'wagmi'
import {mainnet} from 'wagmi/chains'

// 添加本系统 支持的链

const BTC = {
    id: 198,
    name: 'Bitcoin',
    nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.bitchain.biz'] },
    },
}

export const config = createConfig({
    chains: [mainnet, BTC],
    transports: {
        [mainnet.id]: http(),
    },
})

const queryClient = new QueryClient()

export default function Provides({children}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
