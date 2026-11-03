/**
 * Acceso del representante.
 * La tarjeta vive en la portada. Una credencial incorrecta no abre el expediente.
 */

const fieldClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-3 outline-none focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20"

export default function LoginForm({ onSubmit, loading, error }) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onSubmit(form.get("username"), form.get("password"))
  }

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl">
      <h2 className="font-display text-2xl font-semibold text-slate-900">Acceso de familias</h2>
      <p className="mt-1 text-sm text-slate-500">Sistema de gestión escolar</p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="portal-username">
            Usuario
          </label>
          <input
            className={fieldClass}
            id="portal-username"
            name="username"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="portal-password">
            Contraseña
          </label>
          <input
            className={fieldClass}
            id="portal-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
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
