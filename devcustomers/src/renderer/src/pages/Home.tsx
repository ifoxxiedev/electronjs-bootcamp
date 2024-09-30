import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <button>
        <Link to="/about">About</Link>
      </button>
    </div>
  )
}
