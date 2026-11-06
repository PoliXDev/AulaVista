/**
 * Expediente que ve el representante después de entrar.
 * El hijo activo se elige por su matrícula. Las etiquetas de
 * asignatura y de estado llegan ya en español desde el colegio.
 */

import BrandLogo from "./BrandLogo.jsx"

function formatDate(value) {
  if (!value) return ""
  // Año-mes-día, sin hora: se arma en hora local para no restar un día.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number)
    return new Date(year, month - 1, day).toLocaleDateString("es-ES")
  }
  return new Date(value).toLocaleDateString("es-ES")
}

function attendanceClass(status) {
  if (status === "PRESENT") return "bg-meadow-emerald text-meadow-yale"
  if (status === "LATE") return "bg-meadow-lime text-meadow-yale"
  return "bg-meadow-yale text-white"
}

function feeClass(status) {
  if (status === "PAID") return "bg-meadow-emerald text-meadow-yale"
  return "bg-meadow-lime text-meadow-yale"
}

function SectionIcon({ children }) {
  return (
    <svg className="h-5 w-5 text-meadow-teal" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  )
}

function SectionTitle({ icon, children }) {
  return (
    <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
      {icon}
      {children}
    </h2>
  )
}

export default function FamilyPortal({
  parent,
  students,
  selectedCode,
  onSelect,
  onLogout,
}) {
  const child = students.find((item) => item.enrollment_code === selectedCode)

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-[#e4eef3] font-sans text-meadow-yale">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <div>
            <BrandLogo />
            <p className="mt-1 text-sm text-slate-500">{parent.full_name}</p>
          </div>
          <button
            className="inline-flex min-h-12 items-center rounded-xl bg-teal-600 px-5 font-medium text-white hover:bg-teal-700"
            type="button"
            onClick={onLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <nav aria-label="Hijos">
          <ul className="flex flex-wrap gap-3">
            {students.map((item) => {
              const active = item.enrollment_code === selectedCode
              return (
                <li key={item.enrollment_code}>
                  <button
                    type="button"
                    aria-pressed={active}
                    className={
                      active
                        ? "inline-flex min-h-12 items-center rounded-full bg-meadow-teal px-5 font-medium text-white"
                        : "inline-flex min-h-12 items-center rounded-full border border-meadow-willow bg-white px-5 font-medium"
                    }
                    onClick={() => onSelect(item.enrollment_code)}
                  >
                    {item.first_name} {item.last_name}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {!child ? (
          <>
            <h1 className="mt-8 font-display text-2xl font-semibold">Expediente familiar</h1>
            <p className="mt-3 rounded-2xl bg-white p-6 text-sm shadow-sm">
              No hay alumnos asociados a esta cuenta.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-6 font-display text-2xl font-semibold">
              {child.first_name} {child.last_name}
            </h1>
            <p className="mt-1 text-sm text-meadow-cerulean">
              {child.classroom.name} {child.classroom.section} ·{" "}
              {child.classroom.school_year} · {child.enrollment_code}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <SectionTitle
                  icon={(
                    <SectionIcon>
                      <path d="M4 19.5V6.2c2.2-.8 4.6-.8 6.8 0 2.2.8 4.6.8 6.8 0 2.2-.8 4.6-.8 6.8 0V19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M12 6.2V19.5" stroke="currentColor" strokeWidth="1.6" />
                    </SectionIcon>
                  )}
                >
                  Calificaciones
                </SectionTitle>
                {child.grades.length === 0 ? <p className="mt-3 text-sm">Sin calificaciones.</p> : null}
                <ul className="mt-3 space-y-3">
                  {child.grades.map((grade) => (
                    <li key={`${grade.subject}-${grade.evaluation_name}-${grade.date}`}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{grade.subject_label}</p>
                        <span className="rounded-full bg-meadow-lime px-3 py-1 text-sm font-semibold">
                          {grade.score}
                        </span>
                      </div>
                      <p className="text-sm">
                        {grade.evaluation_name} · {formatDate(grade.date)}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <SectionTitle
                  icon={(
                    <SectionIcon>
                      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M12 8v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </SectionIcon>
                  )}
                >
                  Asistencia
                </SectionTitle>
                {child.attendances.length === 0 ? <p className="mt-3 text-sm">Sin asistencias.</p> : null}
                <ul className="mt-3 space-y-3">
                  {child.attendances.map((item) => (
                    <li key={item.date} className="flex items-center justify-between gap-3">
                      <span>{formatDate(item.date)}</span>
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${attendanceClass(item.status)}`}>
                        {item.status_label}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <SectionTitle
                  icon={(
                    <SectionIcon>
                      <path d="M5 7h14v10H5z" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M5 7l7 6 7-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </SectionIcon>
                  )}
                >
                  Comunicados
                </SectionTitle>
                {child.announcements.length === 0 ? <p className="mt-3 text-sm">Sin comunicados.</p> : null}
                <ul className="mt-3 space-y-4">
                  {child.announcements.map((item) => (
                    <li key={item.title}>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm">{item.message}</p>
                      <p className="text-sm text-meadow-cerulean">{formatDate(item.created_at)}</p>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <SectionTitle
                  icon={(
                    <SectionIcon>
                      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M4 10h16" stroke="currentColor" strokeWidth="1.6" />
                    </SectionIcon>
                  )}
                >
                  Mensualidades
                </SectionTitle>
                {child.tuition_fees.length === 0 ? <p className="mt-3 text-sm">Sin mensualidades.</p> : null}
                <ul className="mt-3 space-y-3">
                  {child.tuition_fees.map((fee) => (
                    <li key={`${fee.concept}-${fee.due_date}`}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{fee.concept}</p>
                        <span className={`rounded-full px-3 py-1 text-sm font-medium ${feeClass(fee.status)}`}>
                          {fee.status_label}
                        </span>
                      </div>
                      <p className="text-sm">
                        {fee.amount_usd} USD · vence {formatDate(fee.due_date)}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
