/**
 * Solicitud de demostración al final de la portada.
 * El mensaje se queda en esta pantalla: el colegio no tiene un buzón en el servidor.
 */

import { useState } from "react"

const fieldClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"
const solidButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-5 text-base font-medium text-white hover:bg-teal-700"

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
        className={`mx-auto max-w-3xl rounded-3xl border border-meadow-cerulean bg-slate-150 px-6 py-10 shadow-sm transition-opacity duration-1000 ease-out sm:px-10 ${shown ? "opacity-100" : "opacity-0"}`}
      >
        <h2 id="titulo-contacto" className="text-center font-display text-4xl font-bold leading-tight text-slate-900">
          ¿Te interesa{" "}
          <span className="relative inline-block">
            mejorar
            <span className="absolute -bottom-2 left-1/2 h-1 w-[100%] -translate-x-1/2 rounded-full bg-teal-600" aria-hidden="true" />
          </span>{" "}
          la gestión académica de tu institución?
        </h2>
        <p className="mt-8 rounded-2xl bg-teal-600 px-6 py-5 text-center font-display text-xl font-bold text-white">
          Agenda una demostración para tu centro
        </p>
        {contactSent ? (
          <p className="mt-8 text-center text-base text-slate-700" role="status">
            Gracias, {contact.nombre}. Agradecemos tu interés en conocer AulaVista.
          </p>
        ) : (
          <form className="mt-8" onSubmit={sendContact}>
            <label className="block text-base font-medium text-slate-700">
              Nombre completo <span className="text-teal-700">*</span>
              <input className={fieldClass} name="nombre" value={contact.nombre} onChange={updateContact} required />
            </label>
            <label className="mt-5 block text-base font-medium text-slate-700">
              Institución <span className="text-teal-700">*</span>
              <input className={fieldClass} name="institucion" value={contact.institucion} onChange={updateContact} required />
            </label>
            <label className="mt-5 block text-base font-medium text-slate-700">
              Correo electrónico <span className="text-teal-700">*</span>
              <input className={fieldClass} type="email" name="correo" value={contact.correo} onChange={updateContact} required />
            </label>
            <label className="mt-5 block text-base font-medium text-slate-700">
              Teléfono
              <input className={fieldClass} type="tel" name="telefono" value={contact.telefono} onChange={updateContact} />
            </label>
            <label className="mt-5 block text-base font-medium text-slate-700">
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
