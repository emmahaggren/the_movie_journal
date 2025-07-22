import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-beige min-h-screen">
      <h1 className="text-4xl font-bold text-cinemaBlue">Välkommen till Movie Journal</h1>

      <div className="flex gap-4">
        <Link to="/add" className="bg-redOrange text-white font-semibold px-4 py-2 rounded-2xl hover:bg-opacity-80 transition">
          Lägg till film
        </Link>
        <Link to="/movies" className="bg-lightTurquoise text-white font-semibold px-4 py-2 rounded-2xl hover:bg-opacity-80 transition">
          Se filmer
        </Link>
      </div>

      <div className="mt-8 w-full max-w-md bg-white rounded-2xl shadow p-4">
        <h2 className="text-2xl font-semibold text-darkGray mb-4">Senast tillagda filmer</h2>
        {/* Här kommer du mappa filmer */}
        <p className="text-center text-gray-500">Inga filmer tillagda ännu</p>
      </div>
    </div>
  );
}
