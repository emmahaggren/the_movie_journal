import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type OmdbMovie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Genre: string;
  Year: string;
};

export default function AddMovie() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchResult, setSearchResult] = useState<OmdbMovie | null>(null);
  const [searchError, setSearchError] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [addError, setAddError] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);
    setAddMessage("");
    setAddError("");

    if (!searchTitle.trim()) {
      setSearchError("Please enter a movie title");
      return;
    }

    const query = new URLSearchParams({ title: searchTitle.trim() });
    if (searchYear.trim()) query.append("year", searchYear.trim());

    try {
      const res = await fetch(`/omdb/search?${query.toString()}`);
      const data = await res.json();

      if (data.error) {
        setSearchError(data.error);
      } else {
        setSearchResult({
          imdbID: data.imdbID,
          Title: data.title,
          Poster: data.poster,
          Genre: data.genre,
          Year: data.year,
        });
      }
    } catch {
      setSearchError("Search failed, try again.");
    }
  }

  async function handleAddMovie() {
    if (!searchResult) return;

    setAddMessage("");
    setAddError("");

    try {
      const res = await fetch("/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: searchResult.imdbID,
          title: searchResult.Title,
          poster: searchResult.Poster,
          genre: searchResult.Genre,
          year: Number(searchResult.Year),
          rating,
          comment,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setAddError(err.error || "Failed to add movie");
        return;
      }

      setAddMessage("Movie added successfully!");
      setSearchResult(null);
      setSearchTitle("");
      setSearchYear("");
      setRating(0);
      setComment("");
      navigate("/");
    } catch {
      setAddError("Failed to add movie");
    }
  }

  return (
    <main className="max-w-md mx-auto p-8 text-darkGray font-sans">
      <h1 className="text-3xl font-bold mb-6">Add a Movie</h1>

      <form onSubmit={handleSearch} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Movie title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Year (optional)"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 w-full"
          min={1888}
          max={new Date().getFullYear()}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search OMDb
        </button>
      </form>

      {searchError && <p className="text-red-600 mb-4">{searchError}</p>}

      {searchResult && (
        <div className="bg-beige rounded-xl p-4 shadow-soft flex flex-col">
          <img
            src={
              searchResult.Poster && searchResult.Poster !== "N/A"
                ? searchResult.Poster
                : "/no-poster.png"
            }
            alt={searchResult.Title}
            className="w-full h-72 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold mb-1">{searchResult.Title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            {searchResult.Year} • {searchResult.Genre}
          </p>

          <label className="block mb-2">
            Your rating (0-10):
            <input
              type="number"
              min={0}
              max={10}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border border-gray-400 rounded px-2 py-1 w-20 ml-2"
            />
          </label>
          <label className="block mb-4">
            Your comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-400 rounded px-2 py-1 w-full mt-1"
              rows={3}
              placeholder="Write a comment..."
            />
          </label>

          <button
            onClick={handleAddMovie}
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Movie
          </button>

          {addMessage && <p className="text-green-600 mt-4">{addMessage}</p>}
          {addError && <p className="text-red-600 mt-4">{addError}</p>}
        </div>
      )}
    </main>
  );
}
