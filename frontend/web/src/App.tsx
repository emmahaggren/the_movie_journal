import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-beige text-dark font-cozy">
      <header className="bg-blue p-4 shadow-accent text-beige text-3xl font-vintage">
        Your Movie Tracker
      </header>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  )
}
