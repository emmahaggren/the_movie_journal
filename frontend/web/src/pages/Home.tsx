import React from "react";
import { Link } from "react-router-dom";

const exampleMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    poster: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 3,
    title: "Parasite",
    year: 2019,
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-8 bg-beige min-h-screen text-darkGray font-sans">
      <h1 className="text-4xl font-bold mb-6">Latest Movies</h1>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {exampleMovies.map((movie) => (
          <article
            key={movie.id}
            className="bg-white rounded-2xl shadow-soft p-4 flex flex-col items-center"
          >
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              className="rounded-lg mb-4 w-40 h-auto"
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.year}</p>
            <p className="mt-2 font-bold text-redOrange">Rating: {movie.rating}</p>
          </article>
        ))}
      </section>
      
      <div className="flex gap-6 justify-center">
        <Link
          to="/add"
          className="bg-redOrange text-beige font-semibold px-6 py-3 rounded-2xl shadow-soft hover:bg-cinemaBlue transition"
        >
          Add Movie
        </Link>
        
        <Link
          to="/movies"
          className="bg-cinemaBlue text-beige font-semibold px-6 py-3 rounded-2xl shadow-soft hover:bg-redOrange transition"
        >
          See All Movies
        </Link>
      </div>
    </main>
  );
}
