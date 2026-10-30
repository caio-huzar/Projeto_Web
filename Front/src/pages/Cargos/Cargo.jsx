import { useCallback, useEffect, useState } from 'react'
import { cargosApi } from '../../services/api.js'
import './Cargo.css'

function Cargo() {
  const [cargos, setCargos] = useState([])
  const [nome, setNome] = useState('')
  const [cargoEmEdicao, setCargoEmEdicao] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  const carregarCargos = useCallback(async () => {
    setCarregando(true)
    setErro('')

    try {
      setCargos(await cargosApi.listar())
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    let ativo = true

    cargosApi
      .listar()
      .then((registros) => {
        if (ativo) {
          setCargos(registros)
        }
      })
      .catch((error) => {
        if (ativo) {
          setErro(error.message)
        }
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false)
        }
      })

    return () => {
      ativo = false
    }
  }, [])

  function iniciarEdicao(cargo) {
    setCargoEmEdicao(cargo)
    setNome(cargo.car_nome)
    setErro('')
  }

  function cancelarEdicao() {
    setCargoEmEdicao(null)
    setNome('')
  }

  async function salvarCargo(event) {
    event.preventDefault()
    setSalvando(true)
    setErro('')

    try {
      if (cargoEmEdicao) {
        await cargosApi.atualizar(cargoEmEdicao.car_id, nome.trim())
      } else {
        await cargosApi.criar(nome.trim())
      }

      cancelarEdicao()
      await carregarCargos()
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  async function excluirCargo(cargo) {
    if (!window.confirm(`Deseja excluir o cargo "${cargo.car_nome}"?`)) {
      return
    }

    setErro('')

    try {
      await cargosApi.excluir(cargo.car_id)
      if (cargoEmEdicao?.car_id === cargo.car_id) {
        cancelarEdicao()
      }
      await carregarCargos()
    } catch (error) {
      setErro(error.message)
    }
  }

  return (
    <section className="management-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CADASTROS</span>
          <h1>Cargos</h1>
          <p>Cadastre e mantenha os cargos disponíveis no sistema.</p>
        </div>
      </div>

      <form className="record-form" onSubmit={salvarCargo}>
        <label htmlFor="cargo-nome">
          {cargoEmEdicao ? 'Editar cargo' : 'Nome do cargo'}
        </label>
        <div className="record-form-fields">
          <input
            id="cargo-nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome do cargo"
            maxLength={50}
            required
          />
          <button className="button button-primary" type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : cargoEmEdicao ? 'Salvar alterações' : 'Adicionar cargo'}
          </button>
          {cargoEmEdicao && (
            <button
              className="button button-secondary"
              type="button"
              onClick={cancelarEdicao}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {erro && (
        <p className="feedback feedback-error" role="alert">
          {erro}
        </p>
      )}

      <div className="records-panel">
        <div className="records-heading">
          <h2>Lista de cargos</h2>
          <span>{cargos.length} {cargos.length === 1 ? 'registro' : 'registros'}</span>
        </div>
        {carregando ? (
          <p className="records-empty">Carregando cargos...</p>
        ) : cargos.length === 0 ? (
          <p className="records-empty">Nenhum cargo cadastrado ainda.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cargos.map((cargo) => (
                  <tr key={cargo.car_id}>
                    <td>{cargo.car_id}</td>
                    <td>{cargo.car_nome}</td>
                    <td>
                      <div className="record-actions">
                        <button
                          className="button button-secondary button-small"
                          type="button"
                          onClick={() => iniciarEdicao(cargo)}
                        >
                          Editar
                        </button>
                        <button
                          className="button button-danger button-small"
                          type="button"
                          onClick={() => excluirCargo(cargo)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cargo