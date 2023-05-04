import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { optimism } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'

const { provider } = configureChains(
    [optimism],
    [publicProvider()]
)
const client = createClient({
    provider
})

export default function App({ Component, pageProps }: AppProps) {
  return <WagmiConfig client={client}>
    <Component {...pageProps} />
  </WagmiConfig>
}
