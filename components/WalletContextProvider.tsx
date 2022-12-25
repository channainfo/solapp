import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as Web3 from "@solana/web3.js"
import * as WalletAdapter from "@solana/wallet-adapter-wallets"
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider = (props: any) => {
  const wallets = [
    new WalletAdapter.PhantomWalletAdapter(),
    new WalletAdapter.SolflareWalletAdapter(),
    new WalletAdapter.SlopeWalletAdapter(),
    new WalletAdapter.GlowWalletAdapter(),
    new WalletAdapter.TorusWalletAdapter(),
    new WalletAdapter.SolletWalletAdapter(),
    new WalletAdapter.SolongWalletAdapter(),
    new WalletAdapter.TokenPocketWalletAdapter()
  ]

  const endpoint = Web3.clusterApiUrl('devnet')

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          {props.children}
        </WalletModalProvider>
      </WalletProvider>

    </ConnectionProvider>
  )
}

export default WalletContextProvider;