async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const responseText = await response.text()
  let data

  if (responseText) {
    try {
      data = JSON.parse(responseText)
    } catch {
      throw new Error('A resposta do servidor está em um formato inválido.')
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.erro || data?.mensagem || `Não foi possível concluir a solicitação (${response.status}).`,
    )
  }

  return data
}

export const pessoasApi = {
  listar: () => request('/pessoas'),
  criar: (pes_nome) =>
    request('/pessoas', {
      method: 'POST',
      body: JSON.stringify({ pes_nome }),
    }),
  atualizar: (id, pes_nome) =>
    request(`/pessoas/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ pes_nome }),
    }),
  excluir: (id) => request(`/pessoas/${id}`, { method: 'DELETE' }),
}

export const cargosApi = {
  listar: () => request('/cargos'),
  criar: (car_nome) =>
    request('/cargos', {
      method: 'POST',
      body: JSON.stringify({ car_nome }),
    }),
  atualizar: (id, car_nome) =>
    request(`/cargos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ car_nome }),
    }),
  excluir: (id) => request(`/cargos/${id}`, { method: 'DELETE' }),
}
