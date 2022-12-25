import Layout from '../components/Layout'
import Link from 'next/link'


export default function Home() {
  return (
    <Layout home={true}>
      <ul>
        <li>
          <Link href='/introduction'> Introduction App</Link>
        </li>
      </ul>
    </Layout>
  )
}
