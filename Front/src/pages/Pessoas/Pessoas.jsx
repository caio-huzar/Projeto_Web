import { useCallback, useEffect, useState } from 'react'
import { pessoasApi } from '../../services/api.js'
import './Pessoas.css'

function Pessoas() {
  const [pessoas, setPessoas] = useState([])
  const [nome, setNome] = useState('')
  const [pessoaEmEdicao, setPessoaEmEdicao] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  const carregarPessoas = useCallback(async () => {
    setCarregando(true)
    setErro('')

    try {
      setPessoas(await pessoasApi.listar())
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    let ativa = true

    pessoasApi
      .listar()
      .then((registros) => {
        if (ativa) {
          setPessoas(registros)
        }
      })
      .catch((error) => {
        if (ativa) {
          setErro(error.message)
        }
      })
      .finally(() => {
        if (ativa) {
          setCarregando(false)
        }
      })

    return () => {
      ativa = false
    }
  }, [])

  function iniciarEdicao(pessoa) {
    setPessoaEmEdicao(pessoa)
    setNome(pessoa.pes_nome ?? '')
    setErro('')
  }

  function cancelarEdicao() {
    setPessoaEmEdicao(null)
    setNome('')
  }

  async function salvarPessoa(event) {
    event.preventDefault()
    setSalvando(true)
    setErro('')

    try {
      if (pessoaEmEdicao) {
        await pessoasApi.atualizar(pessoaEmEdicao.pes_id, nome.trim())
      } else {
        await pessoasApi.criar(nome.trim())
      }

      cancelarEdicao()
      await carregarPessoas()
    } catch (error) {
      setErro(error.message)
    } finally {
      setSalvando(false)
    }
  }

  async function excluirPessoa(pessoa) {
    if (!window.confirm(`Deseja excluir ${pessoa.pes_nome}?`)) {
      return
    }

    setErro('')

    try {
      await pessoasApi.excluir(pessoa.pes_id)
      if (pessoaEmEdicao?.pes_id === pessoa.pes_id) {
        cancelarEdicao()
      }
      await carregarPessoas()
    } catch (error) {
      setErro(error.message)
    }
  }

  return (
    <section className="management-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CADASTROS</span>
          <h1>Pessoas</h1>
          <p>Cadastre e mantenha os registros de pessoas.</p>
        </div>
      </div>

      <form className="record-form" onSubmit={salvarPessoa}>
        <label htmlFor="pessoa-nome">
          {pessoaEmEdicao ? 'Editar pessoa' : 'Nome da pessoa'}
        </label>
        <div className="record-form-fields">
          <input
            id="pessoa-nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome"
            maxLength={255}
            required
          />
          <button className="button button-primary" type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : pessoaEmEdicao ? 'Salvar alterações' : 'Adicionar pessoa'}
          </button>
          {pessoaEmEdicao && (
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
          <h2>Lista de pessoas</h2>
          <span>{pessoas.length} {pessoas.length === 1 ? 'registro' : 'registros'}</span>
        </div>
        {carregando ? (
          <p className="records-empty">Carregando pessoas...</p>
        ) : pessoas.length === 0 ? (
          <p className="records-empty">Nenhuma pessoa cadastrada ainda.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.map((pessoa) => (
                  <tr key={pessoa.pes_id}>
                    <td>{pessoa.pes_id}</td>
                    <td>{pessoa.pes_nome}</td>
                    <td>
                      <div className="record-actions">
                        <button
                          className="button button-secondary button-small"
                          type="button"
                          onClick={() => iniciarEdicao(pessoa)}
                        >
                          Editar
                        </button>
                        <button
                          className="button button-danger button-small"
                          type="button"
                          onClick={() => excluirPessoa(pessoa)}
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

export default Pessoas