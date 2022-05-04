import Image from 'next/image';

function HoFDog({ dog }) {
  return (
    <div className="relative text-center h-[200px] w-[350px] group">
      <Image
        alt=""
        height="200px"
        width="350px"
        className="h-fit w-fit p-0 m-0"
        src={dog.image}
      />
      {/* <h1 
        className="text-center absolute left-1/2 top-1/2 font-bold text-2xl
          text-red-700 bg-black hidden group-hover:block"
      >
        {dog.confidence + '%'}
      </h1> */}
      <div
        className="absolute left-1/2 top-1/2 h-[200px] w-[350px]
          transform -translate-x-1/2 -translate-y-1/2 bg-black/50
          hidden group-hover:grid items-center"
      >
        <h1 className="text-red-50 font-bold text-2xl">{dog.confidence + '%'}</h1>
      </div>
    </div>
  )
}

export default HoFDog
