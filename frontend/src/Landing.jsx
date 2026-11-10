/**
 * Portada pública de AulaVista.
 * Sin token se ve el recorrido del colegio.
 * Acceso familias abre el formulario. El personal entra por el panel.
 * heroReady adelanta el texto del hero. introDone espera al final del vídeo
 * para el resto de las secciones.
 */

import { useEffect, useRef, useState } from "react"
import { API_URL } from "./api.js"
import BrandLogo from "./BrandLogo.jsx"
import ClearInfoSection from "./ClearInfoSection.jsx"
import ContactSection from "./ContactSection.jsx"
import Hero from "./Hero.jsx"
import LoginForm from "./LoginForm.jsx"
import ModulesSection from "./ModulesSection.jsx"

const ghostButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50"
const solidButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-5 text-sm font-medium text-white hover:bg-teal-700"

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
  const [activeFeature, setActiveFeature] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [heroReady, setHeroReady] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [introDone, setIntroDone] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [reveal, setReveal] = useState(() => {
    const ready = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return { title: ready, grid: ready, banner: ready, contact: ready }
  })
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const bannerRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    if (introDone) return undefined
    const timer = window.setTimeout(() => setIntroDone(true), 10000)
    return () => window.clearTimeout(timer)
  }, [introDone])

  useEffect(() => {
    if (!introDone) return undefined
    const targets = [titleRef.current, gridRef.current, bannerRef.current, contactRef.current].filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const key = entry.target.getAttribute("data-reveal")
        setReveal((current) => (current[key] ? current : { ...current, [key]: true }))
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.2 })
    targets.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [introDone])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const timer = window.setInterval(() => {
      setActiveFeature((current) => (current + 1) % features.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

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

  function finishIntro() {
    setHeroReady(true)
    setIntroDone(true)
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
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-slate-50 to-[#e4eef3] font-sans text-slate-900">
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
            <a className={ghostButton} href={`${API_URL}/acceso/`}>Panel del personal</a>
            <a className={solidButton} href="#acceso" onClick={openFamilyAccess}>Acceso familias</a>
          </div>
        </div>
      </header>

      {showAccess ? (
        <main id="acceso" className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-10">
          <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-meadow-cerulean/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-16 bottom-8 h-80 w-80 rounded-full bg-meadow-yale/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-200/30 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 w-full max-w-md">
            <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
            <button
              className="mt-6 w-full text-center text-sm font-medium text-meadow-cerulean hover:text-teal-700"
              type="button"
              onClick={() => setShowAccess(false)}
            >
              Volver al recorrido
            </button>
          </div>
        </main>
      ) : (
        <main id="inicio" className="flex-1">
          <Hero heroReady={heroReady} onTimeUpdate={fadeIntro} onFinish={finishIntro} />
          <ModulesSection introDone={introDone} />
          <ClearInfoSection
            titleRef={titleRef}
            gridRef={gridRef}
            bannerRef={bannerRef}
            reveal={reveal}
            onOpenDemo={() => setShowVideo(true)}
          />

          {/* Las fichas cambian solas cada 4 s. El scroll no elige la imagen. */}
          <section className="relative overflow-hidden border-t border-slate-200/80" aria-label="Módulos del colegio">
              <div className="absolute inset-0" aria-hidden="true">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/profesor.jpg)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-meadow-cerulean/85 to-meadow-yale/80" />
              </div>
              <div className="relative mx-auto max-w-6xl px-6 py-20">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <ul className="space-y-2">
                    {features.map((feature, index) => {
                      const open = index === activeFeature
                      return (
                        <li key={feature.title} className={open ? "border-l-4 border-white pl-4" : "border-l-4 border-transparent pl-4"}>
                          <button
                            className="w-full py-3 text-left"
                            type="button"
                            aria-expanded={open}
                            onClick={() => setActiveFeature(index)}
                          >
                            {feature.portrait ? (
                              <img
                                className="mb-3 h-14 w-14 rounded-full object-cover"
                                src={feature.portrait}
                                alt={feature.portraitAlt}
                              />
                            ) : null}
                            <p className={`text-sm font-semibold uppercase tracking-wide ${open ? "text-white" : "text-white/50"}`}>{feature.lead}</p>
                            <h3 className={`mt-1 font-display text-2xl font-semibold ${open ? "text-white" : "text-white/50"}`}>{feature.title}</h3>
                          </button>
                          <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <p className="overflow-hidden leading-7 text-white/90">{feature.text}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <img
                  className="h-auto w-full object-contain"
                  src={features[activeFeature].image}
                  alt={features[activeFeature].imageAlt}
                />
              </div>
              </div>
          </section>

          <ContactSection nodeRef={contactRef} shown={reveal.contact} />
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

      <footer className="bg-gradient-to-r from-meadow-cerulean to-meadow-yale px-6 py-10 text-center text-white">
        <p className="font-display text-lg font-semibold">AulaVista</p>
        <p className="mt-2 text-sm text-white/80">{new Date().getFullYear()} · Proyecto Conquerblocks</p>
      </footer>
    </div>
  )
}
