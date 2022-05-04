import Head from 'next/head';
import Navbar from '../components/Navbar';
import DropzoneComponent from '../components/DropzoneComponent';
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>MVP | Jake Gilfix</title>
        <meta name="description" content="MVP Project for Hack Reactor RFP 2202" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen h-screen max-h-fit flex flex-col">
        <Navbar />

        <main className="grid items-center min-h-fit h-full w-screen mt-[150px]">
          <DropzoneComponent />
        </main>

      </div>
    </>
  )
}
