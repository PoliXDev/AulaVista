/**
 * Acceso del representante.
 * Se abre desde Acceso familias. Una credencial incorrecta no abre el expediente.
 * La contraseña se puede mostrar para comprobarla antes de enviar.
 */

import { useState } from "react"

const fieldClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-3 outline-none focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"

export default function LoginForm({ onSubmit, loading, error }) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onSubmit(form.get("username"), form.get("password"))
  }

  return (
    <section className="w-full rounded-3xl border border-meadow-cerulean/40 bg-white/95 p-8 shadow-xl backdrop-blur-sm">
      <div className="text-center">
        <img className="mx-auto h-14 w-14 object-contain" src="/favicon.png" alt="" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-slate-900">Acceso de familias</h2>
        <p className="mt-1 text-sm text-meadow-cerulean">Colegio Los Pinos</p>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-700" htmlFor="portal-username">
          Usuario
          <input
            className={fieldClass}
            id="portal-username"
            name="username"
            autoComplete="username"
            required
          />
        </label>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="portal-password">
            Contraseña
          </label>
          <div className="relative">
            <input
              className={`${fieldClass} pr-24`}
              id="portal-password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              required
            />
            <button
              className="absolute bottom-2 right-2 min-h-9 rounded-lg px-2 text-sm font-medium text-meadow-cerulean hover:bg-slate-100"
              type="button"
              aria-controls="portal-password"
              aria-pressed={passwordVisible}
              onClick={() => setPasswordVisible((current) => !current)}
            >
              {passwordVisible ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
        {error ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        ) : null}
        <button
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-teal-600 px-5 font-medium text-white hover:bg-teal-700 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </section>
  )
}
