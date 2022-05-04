import Head from 'next/head';
import Navbar from '../components/Navbar';
import HoFComponent from '../components/HoFComponent';

export default function HoF() {
  return (
    <>
      <Head>
        <title>Hot Dog HoF | Jake Gilfix</title>
        <meta name="description" content="MVP Project for Hack Reactor RFP 2202" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col">
        <Navbar />

        <main className="grid items-center h-full w-screen content-center">
          <HoFComponent />
        </main>

      </div>
    </>
  )
}
