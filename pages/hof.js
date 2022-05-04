import axios from 'axios';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import HoFComponent from '../components/HoFComponent';

export default function HoF() {
  const [hofHotDogs, setHofHotDogs] = useState([]);
  const [dogsLoading, setDogsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/hof')
      .then(({ data: dogs }) => {
        setHofHotDogs(dogs);
        setDogsLoading(false);
        // console.log(`Setting dogs to: ${JSON.stringify(dogs, null, 2)}`)
      })
      .catch(console.log);
  }, [])

  return (
    <>
      <Head>
        <title>Hot Dog HoF | Jake Gilfix</title>
        <meta name="description" content="MVP Project for Hack Reactor RFP 2202" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen h-screen flex flex-col">
        <Navbar />

        <main className="grid items-center h-full w-screen content-center mt-[120px]">
          <HoFComponent hotdogs={hofHotDogs} loading={dogsLoading} />
        </main>

      </div>
    </>
  )
}
