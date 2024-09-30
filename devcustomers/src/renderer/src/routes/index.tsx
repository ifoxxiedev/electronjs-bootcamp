import { Router } from '../../../lib/electron-router-dom'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import Create from '../pages/Create'
import About from '../pages/About'
import Detail from '../pages/Detail'
import Layout from '../components/Layout'

export default function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      }
    ></Router>
  )
}
