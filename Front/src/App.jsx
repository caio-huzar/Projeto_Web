import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Cargo from './pages/Cargos/Cargo.jsx'
import Home from './pages/Home/Home.jsx'
import Pessoas from './pages/Pessoas/Pessoas.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pessoas" element={<Pessoas />} />
          <Route path="/cargos" element={<Cargo />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
