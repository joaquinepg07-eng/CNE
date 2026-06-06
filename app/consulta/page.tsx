'use client'

import { useState } from 'react'
import { Search, User, MapPin, Hash, AlertCircle, CheckCircle2 } from 'lucide-react'
import { SectionHeader, Card } from '@/components/ui'

// Mock lookup for demo
const mockVotantes: Record<string, {
  nombre: string; apellido: string; cedula: string; estado: string;
  municipio: string; parroquia: string; centro: string; mesa: number; condicion: string
}> = {
  'V-12345678': { nombre: 'María', apellido: 'González Pérez', cedula: 'V-12345678', estado: 'Miranda', municipio: 'Sucre', parroquia: 'Petare', centro: 'Liceo Gustavo Herrera', mesa: 7, condicion: 'Hábil' },
  'V-9589383':  { nombre: 'Nicolás', apellido: 'Maduro Moros', cedula: 'V-9589383', estado: 'Distrito Capital', municipio: 'Libertador', parroquia: 'El Recreo', centro: 'Escuela Básica Simón Bolívar', mesa: 3, condicion: 'Hábil' },
  'V-11111111': { nombre: 'Carlos', apellido: 'Rodríguez López', cedula: 'V-11111111', estado: 'Zulia', municipio: 'Maracaibo', parroquia: 'Chiquinquirá', centro: 'Universidad del Zulia – Núcleo LUZ', mesa: 12, condicion: 'Hábil' },
}

function normalizeCedula(raw: string): string {
  const clean = raw.replace(/\s/g, '').toUpperCase()
  if (clean.startsWith('V-') || clean.startsWith('E-')) return clean
  return `V-${clean.replace(/\D/g, '')}`
}

export default function ConsultaPage() {
  const [cedula, setCedula] = useState('')
  const [result, setResult] = useState<typeof mockVotantes[string] | null | 'not_found'>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!cedula.trim()) return
    setLoading(true)
    setResult(null)
    await new Promise(r => setTimeout(r, 900)) // simulate API call
    const key = normalizeCedula(cedula)
    setResult(mockVotantes[key] ?? 'not_found')
    setLoading(false)
  }

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch() }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <SectionHeader title="Consulta de Votante" sub="Verifica tu centro de votación y número de mesa asignado" />

      {/* Search box */}
      <Card className="p-6 mb-6">
        <label className="block text-gray-400 text-sm mb-2 font-mono">Número de Cédula</label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ej: V-12345678"
            value={cedula}
            onChange={e => setCedula(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-[#0A0E1A] border border-[rgba(201,168,76,0.2)] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] placeholder-gray-600 font-mono tracking-wider"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-[#C9A84C] hover:bg-[#B8903B] text-[#0A0E1A] font-semibold rounded-lg transition-all disabled:opacity-60 flex items-center gap-2 text-sm"
          >
            {loading
              ? <div className="w-4 h-4 border-2 border-[#0A0E1A]/40 border-t-[#0A0E1A] rounded-full animate-spin" />
              : <Search className="w-4 h-4" />}
            Consultar
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-3 font-mono">
          * Ingresa tu cédula venezolana (V) o extranjera (E) · Datos de demostración
        </p>
      </Card>

      {/* Result */}
      {result === 'not_found' && (
        <Card className="p-6 border-red-500/20">
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Cédula no encontrada</p>
              <p className="text-red-400/70 text-sm mt-0.5">
                No se encontró el número de cédula <span className="font-mono">{normalizeCedula(cedula)}</span> en el Registro Electoral.
                Prueba con: V-12345678, V-9589383 o V-11111111
              </p>
            </div>
          </div>
        </Card>
      )}

      {result && result !== 'not_found' && (
        <Card className="p-6 border-[rgba(201,168,76,0.25)] animate-slide-up">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[rgba(201,168,76,0.1)]">
            <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-xs font-mono text-[#C9A84C] uppercase tracking-wider mb-0.5">Registro Encontrado</p>
              <h3 className="text-white text-lg font-display font-bold">{result.nombre} {result.apellido}</h3>
              <p className="text-gray-500 text-sm font-mono">{result.cedula}</p>
            </div>
          </div>

          {/* Data grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: MapPin, label: 'Centro de Votación', value: result.centro,    color: 'text-blue-400',   bg: 'bg-blue-400/10' },
              { icon: Hash,   label: 'N° de Mesa',         value: `Mesa ${result.mesa}`, color: 'text-[#C9A84C]', bg: 'bg-[#C9A84C]/10' },
              { icon: MapPin, label: 'Estado',             value: result.estado,     color: 'text-green-400',  bg: 'bg-green-400/10' },
              { icon: MapPin, label: 'Municipio',          value: result.municipio,  color: 'text-purple-400', bg: 'bg-purple-400/10' },
              { icon: MapPin, label: 'Parroquia',          value: result.parroquia,  color: 'text-orange-400', bg: 'bg-orange-400/10' },
              { icon: User,   label: 'Condición',          value: result.condicion,  color: 'text-green-400',  bg: 'bg-green-400/10' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-lg p-4 border border-white/5`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{label}</p>
                </div>
                <p className={`font-semibold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 bg-[#C9A84C]/5 border border-[#C9A84C]/10 rounded-lg">
            <p className="text-[#C9A84C]/70 text-xs font-mono text-center">
              ⚠ Esta consulta es para fines demostrativos. Para consultar el REP oficial visita cne.gob.ve
            </p>
          </div>
        </Card>
      )}

      {/* Info cards */}
      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {[
          { icon: '🗳️', title: 'Registro Electoral',   desc: 'Más de 21 millones de venezolanos habilitados para votar en todo el territorio nacional.' },
          { icon: '📍', title: 'Centro Asignado',       desc: 'Tu centro de votación se asigna según el domicilio registrado ante el CNE.' },
          { icon: '🔐', title: 'Datos Protegidos',      desc: 'La información electoral está protegida por la legislación venezolana vigente.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-[#0D1120] rounded-xl p-4 border border-[rgba(255,255,255,0.04)]">
            <p className="text-2xl mb-2">{icon}</p>
            <p className="text-white font-medium text-sm mb-1">{title}</p>
            <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
