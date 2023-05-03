import Head from 'next/head'
import Table from './Table'

export default function Home() {
  return (
    <>
      <Head>
        <title>What to list next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table />
    </>
  )
}
