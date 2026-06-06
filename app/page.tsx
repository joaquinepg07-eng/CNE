import Link from 'next/link'
import { BarChart3, MapPin, Users, Search, Vote, Shield, Clock, ChevronRight } from 'lucide-react'
import { mockElecciones, mockDashboardStats } from '@/lib/mock-data'
import { formatNumber, formatPercent, formatDate, ESTADO_COLORS, ESTADO_ELECCION_LABELS } from '@/lib/utils'
import { Badge } from '@/components/ui'

const features = [
  { icon: BarChart3, title: 'Dashboard Electoral',   desc: 'Visualiza resultados en tiempo real con gráficas interactivas y mapas de calor por estado.', href: '/dashboard',  color: 'text-[#C9A84C]', bg: 'bg-[#C9A84C]/10' },
  { icon: Users,     title: 'Candidatos',            desc: 'Consulta el perfil de todos los candidatos participantes, sus partidos y votación obtenida.',  href: '/candidatos', color: 'text-blue-400',   bg: 'bg-blue-400/10' },
  { icon: Vote,      title: 'Resultados',            desc: 'Resultados detallados por estado, municipio y parroquia con comparativas históricas.',           href: '/resultados', color: 'text-red-400',    bg: 'bg-red-400/10' },
  { icon: MapPin,    title: 'Centros de Votación',   desc: 'Encuentra tu centro de votación más cercano con información de mesas y electores.',              href: '/centros',    color: 'text-green-400',  bg: 'bg-green-400/10' },
  { icon: Search,    title: 'Consulta de Votante',   desc: 'Verifica tu centro asignado, número de mesa y condición electoral de forma rápida y segura.',    href: '/consulta',   color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { icon: Shield,    title: 'Transparencia',         desc: 'Acceso abierto a datos electorales, actas y estadísticas para garantizar la confianza ciudadana.', href: '/dashboard',  color: 'text-[#C9A84C]', bg: 'bg-[#C9A84C]/10' },
]

export default function HomePage() {
  const { totalElectores, participacion, mesasEscrutadas, totalMesas, escrutinioPorcentaje } = mockDashboardStats

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-hero-pattern">
        <div className="absolute inset-0 bg-gradient-radial from-[#001F5B]/30 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CC0000]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-8">
            <div className="pulse-dot" />
            <span className="text-[#C9A84C] text-xs font-mono uppercase tracking-widest">Sistema Electoral Activo</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-none mb-6">
            <span className="text-white">Consejo Nacional</span>
            <br />
            <span className="text-gold-gradient">Electoral</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            República Bolivariana de Venezuela. Portal de transparencia y acceso ciudadano
            a la información electoral, resultados y estadísticas en tiempo real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C9A84C] hover:bg-[#B8903B] text-[#0A0E1A] font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#C9A84C]/20 text-sm">
              Ver Dashboard <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/consulta"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-all duration-200 text-sm">
              <Search className="w-4 h-4" /> Consultar Votante
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section className="border-y border-[rgba(201,168,76,0.1)] bg-[#0D1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Electores Habilitados', value: formatNumber(totalElectores), accent: 'text-[#C9A84C]' },
              { label: 'Participación',          value: formatPercent(participacion),  accent: 'text-green-400' },
              { label: 'Mesas Escrutadas',       value: `${formatNumber(mesasEscrutadas)} / ${formatNumber(totalMesas)}`, accent: 'text-blue-400' },
              { label: '% Escrutinio',           value: formatPercent(escrutinioPorcentaje), accent: 'text-[#C9A84C]' },
            ].map(({ label, value, accent }) => (
              <div key={label}>
                <p className={`text-2xl sm:text-3xl font-display font-bold ${accent}`}>{value}</p>
                <p className="text-gray-500 text-xs font-mono uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming elections ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-5 h-5 text-[#C9A84C]" />
          <h2 className="font-display text-2xl font-bold text-white">Procesos Electorales</h2>
        </div>

        <div className="grid gap-4">
          {mockElecciones.map((e) => (
            <div key={e.id}
              className="card-glow bg-[#111827] rounded-xl p-5 border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.2)] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={ESTADO_COLORS[e.estado]}>
                    {e.estado === 'en_curso' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                    {ESTADO_ELECCION_LABELS[e.estado]}
                  </Badge>
                  <span className="text-gray-600 text-xs font-mono uppercase">{e.tipo}</span>
                </div>
                <h3 className="text-white font-semibold">{e.nombre}</h3>
                <p className="text-gray-500 text-sm mt-1">{e.descripcion}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <div className="text-right">
                  <p className="text-[#C9A84C] font-mono font-bold text-sm">{formatDate(e.fecha)}</p>
                  {e.participacion_porcentaje && (
                    <p className="text-gray-500 text-xs">Participación: {formatPercent(e.participacion_porcentaje)}</p>
                  )}
                </div>
                <Link href="/dashboard"
                  className="px-4 py-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#C9A84C] text-sm rounded-lg transition-colors border border-[#C9A84C]/20 whitespace-nowrap">
                  Ver detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Servicios del Portal
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Accede a todas las herramientas del sistema electoral venezolano desde una sola plataforma.
          </p>
          <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, href, color, bg }) => (
            <Link key={title} href={href}
              className="card-glow bg-[#111827] rounded-xl p-6 border border-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.2)] transition-all duration-200 group">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#C9A84C] transition-colors">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${color}`}>
                Explorar <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
