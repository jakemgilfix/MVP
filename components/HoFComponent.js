import HoFDog from "./HoFDog";

function HoFComponent({ hotdogs, loading }) {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-xl font-bold p-2">Hot Dog Hall of Fame</h1>
      {hotdogs.length
        ? <ol className="list-decimal">
          {hotdogs.map((dog, i) => <li key={i} className="py-2"><HoFDog dog={dog} /></li>)}
        </ol>
        : <p>{loading ? 'Loading...' : 'No dogs'}</p>
      }
    </section>
  )
}

export default HoFComponent
