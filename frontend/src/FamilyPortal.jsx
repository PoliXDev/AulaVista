/**
 * Expediente que ve el representante después de entrar.
 * El hijo activo se elige por su matrícula. Las etiquetas de
 * asignatura y de estado llegan ya en español desde el colegio.
 */

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

export default function FamilyPortal({
  parent,
  children,
  selectedCode,
  onSelect,
  onLogout,
}) {
  const child = children.find((item) => item.enrollment_code === selectedCode)

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans text-meadow-yale">
      <header className="bg-meadow-yale px-6 py-4 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold">ProAula</p>
            <p className="text-sm text-meadow-lime">{parent.full_name}</p>
          </div>
          <button
            className="inline-flex min-h-12 items-center rounded-xl bg-meadow-teal px-5 font-medium text-white hover:bg-meadow-bondi"
            type="button"
            onClick={onLogout}
          >
            Salir
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap gap-3">
          {children.map((item) => {
            const active = item.enrollment_code === selectedCode
            return (
              <button
                key={item.enrollment_code}
                type="button"
                className={
                  active
                    ? "inline-flex min-h-12 items-center rounded-full bg-meadow-teal px-5 font-medium text-white"
                    : "inline-flex min-h-12 items-center rounded-full border border-meadow-willow bg-white px-5 font-medium"
                }
                onClick={() => onSelect(item.enrollment_code)}
              >
                {item.first_name} {item.last_name}
              </button>
            )
          })}
        </div>

        {!child ? (
          <p className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            No hay alumnos asociados a esta cuenta.
          </p>
        ) : (
          <>
            <p className="mt-6 text-sm text-meadow-cerulean">
              {child.classroom.name} {child.classroom.section} ·{" "}
              {child.classroom.school_year} · {child.enrollment_code}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="font-display text-lg font-semibold">Calificaciones</h2>
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
                <h2 className="font-display text-lg font-semibold">Asistencia</h2>
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
                <h2 className="font-display text-lg font-semibold">Comunicados</h2>
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
                <h2 className="font-display text-lg font-semibold">Mensualidades</h2>
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
      </div>
    </main>
  )
}
