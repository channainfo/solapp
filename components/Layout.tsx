
import styles from './Layout.module.css';
import AppBar from './AppBar';
import WalletContextProvider from './WalletContextProvider';
import { Inter } from '@next/font/google'
import Breadcrumbs from './Breadcrumbs';

const inter = Inter({ subsets: ['latin'] })

const defaultPageTitle = 'Welcome to Solana DEV';
const defaultTitle = 'Welcome to SolReview';

export default function Layout(props: { children: any, home: boolean, title?: string, pageTitle?: string, breadcrumbs?: Array<Map<string, any>> }) {
  const pageTitle = props.pageTitle || defaultPageTitle;
  const title = props.title || defaultTitle;

  return (
    <div className={styles.container}>
      <WalletContextProvider>
        <AppBar />
        <main>
          {<Breadcrumbs data={props.breadcrumbs} />}
          {props.children}
          <br />
          <br />
        </main>

      </WalletContextProvider>
    </div>
  );
}