/**
 * Entrada de la portada.
 * El vídeo ocupa el hero y se apaga cuando heroReady pasa a verdadero,
 * unos segundos antes del final, para que el texto no espere al último fotograma.
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
  )
}
