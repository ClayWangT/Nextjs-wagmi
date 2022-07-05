import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {createClient, WagmiConfig, configureChains, Chain} from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import {BSC_RPC_URLS} from "../config/constants";
import {Provider} from "react-redux";
import {getStore} from "../store";

const rpc = (chain: Chain) => {
  return ({
    http: chain.rpcUrls?.default || 'https://data-seed-prebsc-2-s2.binance.org:8545/'
  })
}

const { chains, provider } = configureChains([{
  id: 97,
  name: 'Binance Smart Chain Testnet',
  rpcUrls: {'default': BSC_RPC_URLS[0]},
  network: 'unknown'
}], [ jsonRpcProvider({rpc})])

const connectors = [
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'sora'
    }
  }),
  new WalletConnectConnector({
    chains,
    options: {
      qrcode: true,
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Injected',
      shimDisconnect: true,
    },
  }),
]

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
})

function App({ Component, pageProps }: AppProps) {

  return <WagmiConfig client={client}>
    <Provider store={getStore()}>
      <Component {...pageProps} />
    </Provider>
  </WagmiConfig>
}

export default App
