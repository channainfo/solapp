import Layout from '../components/Layout'
import Link from 'next/link'


export default function Home() {
  return (
    <Layout home={true} breadcrumbs={[]}>
      <div className='container'>
        <ul>
          <li> <Link href='/introduction'> Introduction App</Link> </li>
          <li> <Link href='/profile'> Profile App</Link> </li>
        </ul>
      </div>

    </Layout>
  )
}
