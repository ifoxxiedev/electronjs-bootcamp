import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <h1 className="font-semibold text-5xl">About</h1>
      <button>
        <Link to="/">Ir para home</Link>
      </button>
    </div>
  )
}
