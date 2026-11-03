import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegação principal">
        <Link to="/" className="site-brand">
          Gestão
        </Link>
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