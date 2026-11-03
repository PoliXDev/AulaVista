/**
 * Portada pública de AulaVista.
 * Sin token, el representante ve la plataforma y entra desde aquí.
 * El personal sigue en el panel del colegio, en otra puerta.
 */

import { useState } from "react"
import { API_URL } from "./api.js"
import BrandLogo from "./BrandLogo.jsx"
import LoginForm from "./LoginForm.jsx"

const BACKEND_ORIGIN = API_URL

const features = [
  {
    title: "Gestión académica",
    text: "Aulas, matrícula, calificaciones y asistencia del centro en un solo panel.",
  },
  {
    title: "Expediente familiar",
    text: "Cada representante consulta solo a sus hijos, con notas, asistencia y comunicados.",
  },
  {
    title: "Control de mensualidades",
    text: "El estado de cada pago queda visible para la familia y lo actualiza el personal.",
  },
]

function openFamilyAccess(event) {
  event.preventDefault()
  document.getElementById("acceso")?.scrollIntoView({ behavior: "smooth", block: "center" })
  document.getElementById("portal-username")?.focus({ preventScroll: true })
}

function ProductPreview() {
  const [videoReady, setVideoReady] = useState(true)

  return (
    <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <figcaption className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
        <span className="ml-2 text-xs text-slate-500">Expediente familiar</span>
      </figcaption>
      <div className="relative aspect-video bg-slate-50">
        <div className="grid h-full content-center gap-3 p-6 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Nota</p>
            <p className="mt-2 font-display text-2xl font-semibold text-teal-700">18.5<span className="text-base text-slate-400">/20</span></p>
            <p className="text-sm text-slate-600">Matemáticas</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Asistencia</p>
            <p className="mt-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">Presente</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Mensualidad</p>
            <p className="mt-2 inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Pendiente</p>
          </article>
        </div>
        {videoReady ? (
          <video
            className="absolute inset-0 h-full w-full bg-slate-50 object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/aulavista-demo.mp4"
            onError={() => setVideoReady(false)}
          />
        ) : null}
      </div>
    </figure>
  )
}

export default function Landing({ onSubmit, loading, error }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 font-sans text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <a href="#recorrido" aria-label="Ir al inicio">
            <BrandLogo />
          </a>
          <nav className="hidden flex-1 justify-center gap-8 text-sm font-medium text-slate-600 md:flex" aria-label="Secciones">
            <a className="hover:text-teal-700" href="#recorrido">Recorrido</a>
            <a className="hover:text-teal-700" href="#modulos">Módulos</a>
            <a className="hover:text-teal-700" href="#acceso">Acceso</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a
              className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              href={`${BACKEND_ORIGIN}/acceso/`}
            >
              Panel del personal
            </a>
            <a
              className="inline-flex min-h-12 items-center rounded-xl bg-teal-600 px-4 text-sm font-medium text-white hover:bg-teal-700"
              href="#acceso"
              onClick={openFamilyAccess}
            >
              Acceso familias
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="recorrido" className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800">
              Plataforma educativa integral
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              El centro y las familias, en una sola <span className="text-teal-600">vista</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              AulaVista reúne la gestión del colegio y el expediente que cada
              familia consulta de sus hijos.
            </p>
            <ProductPreview />
          </div>
          <div id="acceso">
            <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
          </div>
        </section>

        <section id="modulos" className="mx-auto max-w-6xl px-6 pb-20" aria-labelledby="aportes">
          <h2 id="aportes" className="font-display text-3xl font-semibold text-slate-900">
            Qué resuelve
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Tres piezas del día a día del colegio, con el mismo criterio visual.
          </p>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.title}>
                <article className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/70">
                  <h3 className="font-display text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-6 py-6 text-center text-sm text-slate-500">
        AulaVista · Sistema de gestión escolar
      </footer>
    </div>
  )
}
