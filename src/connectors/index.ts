import { ChainId } from '@kukuswap/sdk'
import { FortmaticConnector } from './Fortmatic'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './NetworkConnector'
import { PortisConnector } from '@web3-react/portis-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { Web3Provider } from '@ethersproject/providers'
import { BscConnector } from '@binance-chain/bsc-connector'

const RPC = {
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org'
}

export const network = new NetworkConnector({
    defaultChainId: 56,
    urls: RPC
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
    supportedChainIds: [
        56 // bsc
    ]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
    rpc: {
        [ChainId.BSC]: RPC[ChainId.BSC]
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000
})


// mainnet only
export const fortmatic = new FortmaticConnector({
    apiKey: process.env.REACT_APP_FORTMATIC_API_KEY ?? '',
    chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
    dAppId: process.env.REACT_APP_PORTIS_ID ?? '',
    networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
    url: RPC[ChainId.BSC],
    appName: 'LeoSwap',
    appLogoUrl: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png'
})

export const bscConnector = new BscConnector({ supportedChainIds: [56] })
