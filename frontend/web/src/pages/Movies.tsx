import React, { useEffect, useState } from "react";

type Movie = {
  movie_id: string;
  movie_title: string | null;
  movie_poster: string | null;
  movie_genre: string | null;
  movie_year: number | null;
  movie_rating: number;
  movie_comment: string | null;
};

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/movies") // matcha backend-URL
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data.movies || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch movies");
        setLoading(false);
      });
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-8 text-darkGray font-sans">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="bg-beige rounded-xl p-4 shadow-soft flex flex-col"
          >
            <img
              src={
                movie.movie_poster && movie.movie_poster !== "N/A"
                  ? movie.movie_poster
                  : "/no-poster.png"
              }
              alt={movie.movie_title || "No title"}
              className="w-full h-72 object-cover rounded-md mb-4"
            />

            <h2 className="text-xl font-bold mb-1">{movie.movie_title || "No title"}</h2>
            <p className="text-sm text-gray-600 mb-2">
              {(movie.movie_year ?? "Unknown year")} • {movie.movie_genre ?? "Unknown genre"}
            </p>
            <p className="text-sm">⭐ {movie.movie_rating}/10</p>
            {movie.movie_comment && (
              <p className="text-sm mt-2 italic">“{movie.movie_comment}”</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
