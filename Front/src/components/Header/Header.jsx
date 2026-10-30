import { NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegação principal">
        <NavLink to="/" end className="site-brand">
          Gestão
        </NavLink>
        <div className="site-nav-links">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/pessoas">Pessoas</NavLink>
          <NavLink to="/cargos">Cargos</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header