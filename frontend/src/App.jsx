/**
 * Portal familiar.
 * Con token de esta pestaña carga el expediente del representante.
 * Sin token muestra el acceso. La sesión no se guarda al cerrar el navegador.
 */

import { useEffect, useState } from "react"
import { fetchDashboard, login, logout } from "./api.js"
import FamilyPortal from "./FamilyPortal.jsx"
import LoginForm from "./LoginForm.jsx"

const TOKEN_KEY = "proaula-token"

export default function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "")
  const [dashboard, setDashboard] = useState(null)
  const [selectedCode, setSelectedCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setDashboard(null)
      return undefined
    }

    let active = true
    setLoading(true)
    setError("")
    fetchDashboard(token)
      .then((result) => {
        if (!active) return
        if (result.status === 200) {
          const children = result.data.children || []
          setDashboard(result.data)
          setSelectedCode((current) => {
            const stillThere = children.some((child) => child.enrollment_code === current)
            return stillThere ? current : children[0]?.enrollment_code || ""
          })
          return
        }
        sessionStorage.removeItem(TOKEN_KEY)
        setToken("")
        setDashboard(null)
        if (result.status === 401) {
          setError("La sesión ya no es válida. Vuelve a entrar.")
        } else if (result.status === 403) {
          setError("Esta cuenta es de personal del centro. El portal es solo para representantes.")
        } else {
          setError("No se pudo cargar el expediente.")
        }
      })
      .catch(() => {
        if (!active) return
        setError("No se pudo contactar con el colegio.")
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [token])

  async function handleLogin(username, password) {
    setLoading(true)
    setError("")
    try {
      const result = await login(username, password)
      if (result.status === 200 && result.data?.token) {
        sessionStorage.setItem(TOKEN_KEY, result.data.token)
        setToken(result.data.token)
        return
      }
      if (result.status === 400) {
        setError("El usuario o la contraseña no coinciden.")
        return
      }
      setError("No se pudo iniciar la sesión.")
    } catch {
      setError("No se pudo contactar con el colegio.")
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    const current = token
    sessionStorage.removeItem(TOKEN_KEY)
    setToken("")
    setDashboard(null)
    setSelectedCode("")
    setError("")
    if (!current) return
    try {
      await logout(current)
    } catch {
      // La pantalla ya volvió al acceso. El token local no se conserva.
    }
  }

  if (!token) {
    return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
  }

  if (loading || !dashboard) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-6 py-10 font-sans text-meadow-yale">
        <p>{error || "Cargando el expediente…"}</p>
        {error ? (
          <button
            className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-meadow-teal px-5 font-medium text-white"
            type="button"
            onClick={handleLogout}
          >
            Volver al acceso
          </button>
        ) : null}
      </main>
    )
  }

  return (
    <FamilyPortal
      parent={dashboard.parent}
      children={dashboard.children}
      selectedCode={selectedCode}
      onSelect={setSelectedCode}
      onLogout={handleLogout}
    />
  )
}
