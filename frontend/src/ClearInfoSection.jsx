/**
 * Resumen del colegio en tableta y franja de demostración.
 * Cada bloque llega oculto. La portada lo muestra al entrar en pantalla,
 * y solo después de que el vídeo de entrada haya terminado.
 */

import { FiBookOpen, FiCalendar, FiCreditCard, FiMail } from "react-icons/fi"

const benefits = [
  { text: "Aulas y matrícula por curso y sección", icon: FiBookOpen },
  { text: "Una asistencia por alumno y fecha", icon: FiCalendar },
  { text: "Comunicados del centro y del aula", icon: FiMail },
  { text: "Mensualidades pagadas o pendientes", icon: FiCreditCard },
]

export default function ClearInfoSection({ titleRef, gridRef, bannerRef, reveal, onOpenDemo }) {
  return (
    <section className="px-6 py-16" aria-labelledby="titulo-claro">
      <div className="mx-auto max-w-6xl">
        <h2
          id="titulo-claro"
          ref={titleRef}
          data-reveal="title"
          className={`text-center font-display text-3xl font-semibold transition-opacity duration-1000 ease-out ${reveal.title ? "opacity-100" : "opacity-0"}`}
        >
          Informacion clara para{" "}
          <span className="relative inline-block">
            tomar
            <span className="absolute -bottom-2 left-1/2 h-1 w-[100%] -translate-x-1/2 rounded-full bg-teal-600" aria-hidden="true" />
          </span>
          {" "}desiciones acadèmicas
        </h2>
        <div ref={gridRef} data-reveal="grid" className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <img
            className={`mx-auto h-auto w-[70%] object-contain transition-opacity duration-[1500ms] ease-out ${reveal.grid ? "opacity-100" : "opacity-0"}`}
            src="/images/tableta-aulavista.png"
            alt="Resumen del colegio en una tableta"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <li
                  key={benefit.text}
                  className={`flex items-center gap-3 rounded-2xl border border-teal-500 bg-white px-4 py-3 text-sm leading-5 text-slate-700 shadow-sm transition-opacity duration-1000 ease-out ${reveal.grid ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: reveal.grid ? `${280 + index * 160}ms` : "0ms" }}
                >
                  <Icon className="h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                  {benefit.text}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div ref={bannerRef} data-reveal="banner" className="relative mx-auto mt-8 max-w-5xl pt-28">
        <div className={`rounded-3xl bg-teal-600 px-8 py-10 transition-opacity duration-1000 ease-out md:min-h-56 md:py-12 md:pr-72 ${reveal.banner ? "opacity-100" : "opacity-0"}`}>
          <h2 id="titulo-accesos" className="max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Fortalece la gestion academica de tu institucion con AulaVista
          </h2>
          <p className="mt-3 max-w-xl text-teal-50">
            AulaVista reúne tus procesos en una plataforma que permite registrar, consultar y analiza la informacion de manera ordenada.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-12 items-center rounded-full border border-white px-5 text-sm font-medium text-white hover:bg-white/10"
              href="#contacto"
            >
              Contacta con ventas
            </a>
            <button
              className="inline-flex min-h-12 items-center rounded-full bg-white px-5 text-sm font-medium text-teal-800 hover:bg-teal-50"
              type="button"
              onClick={onOpenDemo}
            >
              Demo
            </button>
          </div>
        </div>
        <img
          className={`mx-auto mt-6 h-56 w-auto object-contain transition-opacity duration-[1500ms] ease-out md:absolute md:bottom-0 md:right-6 md:mx-0 md:mt-0 md:h-[440px] ${reveal.banner ? "opacity-100 delay-700" : "opacity-0"}`}
          src="/images/Estudiante.png"
          alt="Alumna con material escolar"
        />
      </div>
    </section>
  )
}
