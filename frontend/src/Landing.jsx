/**
 * Portada pública de AulaVista.
 * Sin token se ve el recorrido del colegio.
 * Acceso familias abre el formulario. El personal entra por el panel.
 */

import { useEffect, useState } from "react"
import { API_URL } from "./api.js"
import BrandLogo from "./BrandLogo.jsx"
import LoginForm from "./LoginForm.jsx"

const BACKEND_ORIGIN = API_URL

const ghostButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
const solidButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-5 text-sm font-medium text-white hover:bg-teal-700"

const benefits = [
  "Aulas y matrícula por curso y sección",
  "Notas de 1 a 20",
  "Una asistencia por alumno y fecha",
  "Comunicados del centro y del aula",
  "Mensualidades pagadas o pendientes",
  "Cada familia ve solo a sus hijos",
]

const features = [
  {
    title: "Gestión académica del centro",
    lead: "El día a día del personal",
    text: "Aulas, matrícula, calificaciones y asistencia quedan ordenadas por curso y sección. El colegio consulta el mismo criterio en cada pantalla del panel.",
    image: "/images/img_gestion_academica.jpeg",
    imageAlt: "Resumen del panel del personal con aulas, alumnos y mensualidades",
    portrait: "/images/profesor.jpg",
    portraitAlt: "Personal del centro",
  },
  {
    title: "Expediente familiar",
    lead: "Solo los hijos de quien entra",
    text: "La familia elige al alumno y consulta notas, asistencia y comunicados. La sesión del portal no se mezcla con la del personal.",
    image: "/images/img_expediente_familiar.jpeg",
    imageAlt: "Expediente familiar con calificaciones, asistencia y comunicados",
  },
  {
    title: "Mensualidades",
    lead: "Pagada o pendiente",
    text: "El personal actualiza el estado del recibo y la familia lo ve en el expediente. El resumen muestra cuántas están al día.",
    image: "/images/img_control_mensualidades.jpeg",
    imageAlt: "Detalle y estado de las mensualidades del colegio",
  },
]

export default function Landing({ onSubmit, loading, error }) {
  const [showAccess, setShowAccess] = useState(Boolean(error))
  const [showVideo, setShowVideo] = useState(false)
  const [heroReady, setHeroReady] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    if (!showVideo) return undefined
    function onKey(event) {
      if (event.key === "Escape") setShowVideo(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showVideo])

  function fadeIntro(event) {
    const video = event.currentTarget
    if (video.duration && video.duration - video.currentTime < 2.8) {
      setHeroReady(true)
    }
  }

  function openFamilyAccess(event) {
    event.preventDefault()
    setShowAccess(true)
    window.setTimeout(() => {
      document.getElementById("portal-username")?.focus()
    }, 0)
  }

  function showTour(event) {
    if (!showAccess) return
    event.preventDefault()
    const id = event.currentTarget.getAttribute("href")?.replace("#", "")
    setShowAccess(false)
    window.setTimeout(() => {
      if (id) document.getElementById(id)?.scrollIntoView()
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-[#e4eef3] font-sans text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <a href="#inicio" aria-label="Ir al inicio" onClick={showTour}>
            <BrandLogo />
          </a>
          <nav className="hidden flex-1 justify-center gap-8 text-sm font-medium text-slate-600 md:flex" aria-label="Secciones">
            <a className="hover:text-teal-700" href="#modulos" onClick={showTour}>Módulos</a>
            <a className="hover:text-teal-700" href="#acceso" onClick={openFamilyAccess}>Acceso</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <a className={ghostButton} href={`${BACKEND_ORIGIN}/acceso/`}>Panel del personal</a>
            <a className={solidButton} href="#acceso" onClick={openFamilyAccess}>Acceso familias</a>
          </div>
        </div>
      </header>

      {showAccess ? (
        <main id="acceso" className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
          <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
          <button
            className="mt-6 text-sm font-medium text-slate-600 hover:text-teal-700"
            type="button"
            onClick={() => setShowAccess(false)}
          >
            Volver al recorrido
          </button>
        </main>
      ) : (
        <main id="inicio">
          <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-16">
            <video
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2500ms] ease-out ${heroReady ? "pointer-events-none opacity-0" : "opacity-100"}`}
              src="/video/intro.webm"
              autoPlay
              muted
              playsInline
              aria-hidden="true"
              onTimeUpdate={fadeIntro}
              onEnded={() => setHeroReady(true)}
              onError={() => setHeroReady(true)}
            />
            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
              <div className={`transition-opacity duration-1000 ease-out ${heroReady ? "opacity-100 delay-500" : "opacity-0"}`}>
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                  Sistema de gestión escolar
                </p>
                <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                  El centro y las familias, en una sola <span className="text-teal-600">vista</span>
                </h1>
                <p className="mt-4 max-w-xl text-lg text-slate-600">
                  El personal administra el colegio. Cada familia consulta el expediente de sus hijos.
                  Dos accesos, la misma información.
                </p>
              </div>
              <img
                className={`h-auto w-full transition-opacity duration-1000 ease-out ${heroReady ? "opacity-100 delay-1000" : "opacity-0"}`}
                src="/images/img_computadora_hero.png"
                alt="Panel del personal en el ordenador y portal familiar en el móvil"
              />
            </div>
          </section>

          <section id="modulos" className="relative overflow-hidden border-t border-slate-200/80" aria-labelledby="titulo-modulos">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/personal_administrativo.webp)" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 to-[#e4eef3]/85" aria-hidden="true" />
            <div className="relative mx-auto max-w-6xl px-6 py-20">
              <h2 id="titulo-modulos" className="max-w-2xl font-display text-3xl font-semibold">
                El colegio, ordenado para el personal y para las familias
              </h2>
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="rounded-2xl border border-white/80 bg-white/90 p-5 text-sm leading-6 text-slate-700 shadow-sm">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="px-6 pb-8 pt-36" aria-labelledby="titulo-accesos">
            <div className="relative mx-auto max-w-5xl">
              <div className="rounded-3xl bg-teal-600 px-8 py-10 md:min-h-56 md:py-12 md:pr-72">
                <h2 id="titulo-accesos" className="max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Fortalece la gestion academica de tu institucion con AulaVista
                </h2>
                <p className="mt-3 max-w-xl text-teal-50">
                  AulaVista reúne tus procesos en una plataforma que permite registrar, consultar y analiza la informacion de manera ordenada.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className="inline-flex min-h-12 items-center rounded-full border border-white px-5 text-sm font-medium text-white hover:bg-white/10"
                    type="button"
                  >
                    Contacta con ventas
                  </button>
                  <button
                    className="inline-flex min-h-12 items-center rounded-full bg-white px-5 text-sm font-medium text-teal-800 hover:bg-teal-50"
                    type="button"
                    onClick={() => setShowVideo(true)}
                  >
                    Demo
                  </button>
                </div>
              </div>
              <img
                className="mx-auto mt-6 h-56 w-auto object-contain md:absolute md:bottom-0 md:right-6 md:mx-0 md:mt-0 md:h-[440px]"
                src="/images/Estudiante.png"
                alt="Alumna con material escolar"
              />
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-6 py-20" aria-label="Módulos del colegio">
            <ul className="space-y-16">
              {features.map((feature, index) => (
                <li key={feature.title}>
                  <article className="grid items-center gap-10 lg:grid-cols-2">
                    <figure className={`overflow-hidden rounded-3xl bg-slate-100 shadow-sm ${index % 2 ? "lg:order-2" : ""}`}>
                      <img className="h-auto w-full object-contain" src={feature.image} alt={feature.imageAlt} />
                    </figure>
                    <div className={index % 2 ? "lg:order-1" : ""}>
                      {feature.portrait ? (
                        <img
                          className="mb-4 h-16 w-16 rounded-full object-cover"
                          src={feature.portrait}
                          alt={feature.portraitAlt}
                        />
                      ) : null}
                      <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">{feature.lead}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold">{feature.title}</h3>
                      <p className="mt-4 leading-7 text-slate-600">{feature.text}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </main>
      )}

      {showVideo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="w-full max-w-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="Recorrido de AulaVista"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <button
                className="inline-flex min-h-12 items-center rounded-xl bg-white px-4 text-sm font-medium text-slate-700"
                type="button"
                onClick={() => setShowVideo(false)}
              >
                Cerrar
              </button>
            </div>
            <video className="w-full rounded-2xl bg-black" src="/video/demo.mp4" controls autoPlay />
          </div>
        </div>
      ) : null}

      <footer className="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-600">
        <p className="font-display text-base font-semibold text-slate-900">AulaVista</p>
        <p className="mt-1">Gestión del centro y expediente familiar.</p>
        <p className="mt-1">El panel del personal y el portal familiar no comparten sesión.</p>
      </footer>
    </div>
  )
}
