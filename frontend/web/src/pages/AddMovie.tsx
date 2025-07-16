import { useState } from 'react'

export default function AddMovie() {
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, rating, comment })
    // TODO: Save the movie to state/backend
  }

  return (
    <form onSubmit={handleSubmit} className="bg-beige p-6 rounded shadow-soft space-y-4">
      <h2 className="text-2xl font-vintage text-dark">Add a Movie</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
        className="block w-full p-2 border border-dark rounded font-cozy"
        required
      />

      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="Rating (1-5)"
        className="block w-full p-2 border border-dark rounded font-cozy"
        min="1"
        max="5"
        required
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your thoughts..."
        className="block w-full p-2 border border-dark rounded font-cozy"
      />

      <button type="submit" className="bg-red text-beige px-4 py-2 rounded font-cozy">
        Save Movie
      </button>
    </form>
  )
}
