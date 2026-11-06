/**
 * Solicitud de demostración al final de la portada.
 * El mensaje se queda en esta pantalla: el colegio no tiene un buzón en el servidor.
 */

import { useState } from "react"
import { FiBookOpen, FiCheck, FiUsers } from "react-icons/fi"

const contactPoints = [
  { icon: FiUsers, text: "Panel del personal y portal familiar, cada uno con su sesión." },
  { icon: FiBookOpen, text: "Notas, asistencia, comunicados y mensualidades con el mismo criterio." },
  { icon: FiCheck, text: "Cada familia consulta solo el expediente de sus hijos." },
]

const fieldClass = "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
const solidButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-5 text-sm font-medium text-white hover:bg-teal-700"

export default function ContactSection({ nodeRef, shown }) {
  const [contact, setContact] = useState({
    nombre: "",
    institucion: "",
    correo: "",
    telefono: "",
    mensaje: "",
  })
  const [contactSent, setContactSent] = useState(false)

  function updateContact(event) {
    const { name, value } = event.target
    setContact((current) => ({ ...current, [name]: value }))
  }

  function sendContact(event) {
    event.preventDefault()
    setContactSent(true)
  }

  return (
    <section id="contacto" className="px-6 py-16" aria-labelledby="titulo-contacto">
      <div
        ref={nodeRef}
        data-reveal="contact"
        className={`mx-auto max-w-3xl rounded-3xl bg-white/80 px-6 py-10 shadow-sm transition-opacity duration-1000 ease-out sm:px-10 ${shown ? "opacity-100" : "opacity-0"}`}
      >
        <h2 id="titulo-contacto" className="text-center font-display text-3xl font-semibold text-slate-900">
          ¿Te interesa mejorar la gestión académica de tu institución?
        </h2>
        <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-teal-600" aria-hidden="true" />
        <ul className="mt-8 space-y-4 text-sm text-slate-700">
          {contactPoints.map((point) => {
            const Icon = point.icon
            return (
              <li key={point.text} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                <span>{point.text}</span>
              </li>
            )
          })}
        </ul>
        <p className="mt-8 rounded-2xl bg-teal-600 px-6 py-4 text-center font-display text-lg font-semibold text-white">
          El personal administra y la familia consulta el mismo colegio
        </p>
        {contactSent ? (
          <p className="mt-8 text-center text-slate-700" role="status">
            Gracias, {contact.nombre}. La solicitud queda en esta pantalla: AulaVista no la envía a un servidor.
          </p>
        ) : (
          <form className="mt-8" onSubmit={sendContact}>
            <p className="text-sm leading-6 text-slate-600">
              Pide una demostración para ver el panel del personal y el portal familiar.
            </p>
            <label className="mt-5 block text-sm font-medium text-slate-700">
              Nombre completo <span className="text-teal-700">*</span>
              <input className={fieldClass} name="nombre" value={contact.nombre} onChange={updateContact} required />
            </label>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Institución <span className="text-teal-700">*</span>
              <input className={fieldClass} name="institucion" value={contact.institucion} onChange={updateContact} required />
            </label>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Correo electrónico <span className="text-teal-700">*</span>
              <input className={fieldClass} type="email" name="correo" value={contact.correo} onChange={updateContact} required />
            </label>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Teléfono
              <input className={fieldClass} type="tel" name="telefono" value={contact.telefono} onChange={updateContact} />
            </label>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Mensaje
              <textarea className={fieldClass} name="mensaje" rows="4" value={contact.mensaje} onChange={updateContact} />
            </label>
            <div className="mt-6 flex justify-center">
              <button className={solidButton} type="submit">Agendar demo</button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
