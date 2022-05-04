import Link from 'next/link';

function Navbar() {
  return (
    <div className="fixed w-screen z-50">
      <nav className='flex flex-row justify-between items-center flex-wrap bg-indigo-700 p-3'>
        <Link href='/'>
          <a className="ml-2 text-xl text-white font-bold uppercase tracking-wide">
            WUT DIS?
          </a>
        </Link>
        <Link href="/hof">
          <a className="p-3 text-white hover:text-yellow-400 outline-none">
            HD HoF
          </a>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar
