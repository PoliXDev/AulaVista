/**
 * Llamadas del portal familiar al colegio.
 * El token viaja en Authorization y no usa la cookie del panel.
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

async function request(path, { method = "GET", token, body } = {}) {
  const headers = { Accept: "application/json" }
  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }
  if (token) {
    headers.Authorization = `Token ${token}`
  }

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    const error = new Error("No se pudo contactar con el colegio.")
    error.kind = "network"
    throw error
  }

  let data = null
  if (response.status !== 204) {
    data = await response.json().catch(() => null)
  }
  return { status: response.status, data }
}

export function login(username, password) {
  return request("/api/login/", {
    method: "POST",
    body: { username, password },
  })
}

export function fetchDashboard(token) {
  return request("/api/parent/dashboard/", { token })
}

export function logout(token) {
  return request("/api/logout/", { method: "POST", token })
}
