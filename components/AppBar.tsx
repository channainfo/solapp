import styles from "./AppBar.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

export default function AppBar() {

  return (
    <div className={styles.AppHeader}>
      <Image src='/images/profile.jpg' width={30} height={30} alt='Review' />
      <h3>{process.env.APP_NAME}</h3>
      <WalletMultiButton />
    </div>
  )
}