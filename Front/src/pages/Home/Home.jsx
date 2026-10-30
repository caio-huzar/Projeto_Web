import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <section className="home-page">
      <div className="home-hero">
        <span className="eyebrow">PAINEL DE GESTÃO</span>
        <h1>Organize pessoas e cargos em um só lugar.</h1>
        <p>
          Cadastre, consulte e mantenha os registros do seu sistema de forma
          simples.
        </p>
      </div>

      <div className="home-cards">
        <Link className="home-card" to="/pessoas">
          <span className="home-card-icon" aria-hidden="true">
            P
          </span>
          <span className="home-card-content">
            <strong>Pessoas</strong>
            <span>Gerencie os cadastros de pessoas.</span>
          </span>
          <span className="home-card-arrow" aria-hidden="true">
            →
          </span>
        </Link>

        <Link className="home-card" to="/cargos">
          <span className="home-card-icon" aria-hidden="true">
            C
          </span>
          <span className="home-card-content">
            <strong>Cargos</strong>
            <span>Gerencie os cargos disponíveis.</span>
          </span>
          <span className="home-card-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}

export default Home