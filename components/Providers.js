'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {WagmiProvider} from 'wagmi'
import {http, createConfig} from 'wagmi'
import {mainnet, sepolia} from 'wagmi/chains'

export const config = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
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
