/**
 * Entrada de la portada.
 * El vídeo ocupa el hero y se apaga cuando heroReady pasa a verdadero,
 * unos segundos antes del final, para que el texto no espere al último fotograma.
 * Abajo, una máscara del mismo degradado de la página funde el vídeo con el fondo.
 */

export default function Hero({ heroReady, onTimeUpdate, onFinish }) {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-16">
      <video
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2500ms] ease-out ${heroReady ? "pointer-events-none opacity-0" : "opacity-100"}`}
        src="/video/intro.webm"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        onTimeUpdate={onTimeUpdate}
        onEnded={onFinish}
        onError={onFinish}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-r from-slate-50 to-[#e4eef3] transition-opacity duration-[2500ms] ease-out [mask-image:linear-gradient(to_top,black,transparent)] ${heroReady ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.45fr_1fr]">
        <div className={`min-w-0 transition-opacity duration-1000 ease-out ${heroReady ? "opacity-100 delay-500" : "opacity-0"}`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Gestión escolar y portal familiar
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-[2.6rem] xl:text-5xl">
            El colegio y las familias,
            <br />
            <span className="whitespace-nowrap">
              conectados en una sola <span className="text-teal-600">vista</span>
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Centraliza aulas, calificaciones, asistencia, comunicados y estado de
            mensualidades en una misma base de datos, con accesos independientes
            para el personal del centro y las familias.
          </p>
        </div>
        <img
          className={`h-auto w-[110%] max-w-none origin-center transition-opacity duration-1000 ease-out ${heroReady ? "opacity-100 delay-1000" : "opacity-0"}`}
          src="/images/img_computadora_hero.png"
          alt="Panel del personal en el ordenador y portal familiar en el móvil"
        />
      </div>
    </section>
  )
}
