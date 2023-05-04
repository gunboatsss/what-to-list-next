import Head from 'next/head'
import Table from './Table'

export default function Home() {
  return (
    <>
      <Head>
        <title>What to List Next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='description' content='Look at asset to listed on Synthetix Perps' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table />
    </>
  )
}
