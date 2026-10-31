/**
 * Acceso del representante al portal.
 * Una credencial incorrecta no abre el expediente.
 */

export default function LoginForm({ onSubmit, loading, error }) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    onSubmit(form.get("username"), form.get("password"))
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans text-meadow-yale">
      <header className="bg-meadow-yale px-6 py-4 text-white">
        <p className="font-display text-2xl font-semibold">ProAula</p>
        <p className="text-sm text-meadow-lime">Portal familiar</p>
      </header>
      <section className="mx-auto mt-10 max-w-xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="font-display text-xl">Acceso de familias</h1>
        <p className="mt-2 text-sm">
          Consulta las notas, la asistencia, los comunicados y las
          mensualidades de tus hijos.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">
            Usuario
            <input
              className="mt-1 w-full rounded-xl border border-meadow-willow px-3 py-3 outline-none focus:border-meadow-teal"
              name="username"
              autoComplete="username"
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Contraseña
            <input
              className="mt-1 w-full rounded-xl border border-meadow-willow px-3 py-3 outline-none focus:border-meadow-teal"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? (
            <p className="text-sm font-medium" role="alert">
              {error}
            </p>
          ) : null}
          <button
            className="inline-flex min-h-12 items-center rounded-xl bg-meadow-teal px-5 font-medium text-white hover:bg-meadow-bondi disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  )
}
