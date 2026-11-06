/**
 * Bloque de la plataforma web.
 * La foto y el velo esperan a introDone, que solo se enciende
 * cuando el vídeo de entrada ha terminado. El contenido entra un segundo después.
 */

export default function ModulesSection({ introDone }) {
  return (
    <section id="modulos" className="relative overflow-hidden border-t border-slate-200/80" aria-labelledby="titulo-modulos">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-out ${introDone ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/personal_administrativo.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-meadow-cerulean/85 to-meadow-yale/80" />
      </div>
      <div className={`relative mx-auto max-w-6xl px-6 py-20 text-center transition-opacity duration-1000 ease-out ${introDone ? "opacity-100 delay-1000" : "opacity-0"}`}>
        <h2 id="titulo-modulos" className="font-display text-3xl font-semibold text-white">
          Una plataforma para{" "}
          <span className="relative inline-block">
            cada
            <span className="absolute -bottom-2 left-1/2 h-1 w-[100%] -translate-x-1/2 rounded-full bg-white" aria-hidden="true" />
          </span>
          {" "}parte del colegio
        </h2>
        <div className="mt-12 grid items-center gap-10 text-left lg:grid-cols-2">
          <img
            className="h-auto w-full object-contain"
            src="/images/img-_ordenador_estadis.png"
            alt="Resumen del colegio en un ordenador"
          />
          <div className="rounded-3xl border border-white/70 bg-white/20 p-8 shadow-sm backdrop-blur-md">
            <h3 className="font-display text-2xl font-bold text-white">Plataforma web</h3>
            <p className="mt-2 border-b border-white/40 pb-4 text-sm text-white/90">
              Dirigido a directivos, control escolar y padres.
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-white">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                <span>Administra la estructura acadèmica.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                <span>Gestiona estudiantes, docentes y materias.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                <span>Consultas y edicion controlada de asistencias y calificaciones.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                <span>Estado de las mensualidades.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                <span>Comunicados para el personal y las familias.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
