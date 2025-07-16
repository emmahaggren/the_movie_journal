export default function Movies() {
  return (
    <div>
      <h2 className="text-2xl font-vintage text-dark mb-4">Your Movies</h2>

      {/* Example movie list */}
      <ul className="space-y-4">
        <li className="bg-beige p-4 shadow-soft rounded border border-dark">
          <h3 className="font-vintage text-xl text-blue">Movie Title</h3>
          <p className="font-cozy text-dark">Your rating: ⭐⭐⭐⭐</p>
          <p className="text-red font-cozy">"Loved the plot twist!"</p>
        </li>
        {/* Repeat for each movie */}
      </ul>
    </div>
  )
}
