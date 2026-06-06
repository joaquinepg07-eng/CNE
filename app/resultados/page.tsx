'use client'

import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Vote, Filter } from 'lucide-react'
import { mockResultadosPorEstado, mockCandidatos, mockEstadistica } from '@/lib/mock-data'
import { formatNumber, formatPercent } from '@/lib/utils'
import { SectionHeader, Card, ProgressBar, StatCard } from '@/components/ui'
import { TrendingUp, BarChart3 } from 'lucide-react'

const radarData = [
  { subject: 'Zulia',        PSUV: 38.8, PUD: 61.2 },
  { subject: 'Miranda',      PSUV: 41.3, PUD: 58.7 },
  { subject: 'Carabobo',     PSUV: 52.1, PUD: 47.9 },
  { subject: 'D. Capital',   PSUV: 48.5, PUD: 51.5 },
  { subject: 'Lara',         PSUV: 44.7, PUD: 55.3 },
  { subject: 'Táchira',      PSUV: 36.6, PUD: 63.4 },
]

export default function ResultadosPage() {
  const [view, setView] = useState<'tabla' | 'radar'>('tabla')

  const candidatosOrdenados = mockCandidatos
    .filter(c => c.eleccion_id === '1')
    .sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))

  const e = mockEstadistica

  const ganadores = mockResultadosPorEstado.reduce<Record<string,string>>((acc, r) => {
    acc[r.estado] = r.partido
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <SectionHeader title="Resultados Electorales" sub="Elecciones Presidenciales 2024 · 100% de actas escrutadas" />

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Votos Emitidos"   value={formatNumber(e.votos_emitidos)}   icon={<Vote className="w-5 h-5" />}        accent="gold"  delay={0} />
        <StatCard label="Participación"    value={formatPercent(e.participacion)}    icon={<TrendingUp className="w-5 h-5" />}  accent="green" delay={100} />
        <StatCard label="Votos Válidos"    value={formatNumber(e.votos_validos)}     icon={<BarChart3 className="w-5 h-5" />}   accent="gold"  delay={200} />
        <StatCard label="Votos Nulos"      value={formatNumber(e.votos_nulos)}       icon={<Filter className="w-5 h-5" />}      accent="red"   delay={300} />
      </div>

      {/* National result cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {candidatosOrdenados.map((c, i) => (
          <Card key={c.id} className={`p-5 ${i === 0 ? 'border-[rgba(201,168,76,0.3)]' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-gray-600 text-xs">#{i + 1}</span>
                <div className="w-3 h-3 rounded-sm" style={{ background: c.color_partido }} />
                <span className="text-white font-medium text-sm">{c.apellido}, {c.nombre.split(' ')[0]}</span>
              </div>
              <span className="font-mono text-xs text-gray-500">{c.siglas_partido}</span>
            </div>
            <p className="text-2xl font-display font-bold" style={{ color: c.color_partido }}>
              {formatPercent(c.porcentaje ?? 0)}
            </p>
            <p className="text-gray-500 text-xs font-mono mb-3">{formatNumber(c.votos ?? 0)} votos</p>
            <ProgressBar value={c.porcentaje ?? 0} color={c.color_partido} />
          </Card>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-5">
        {(['tabla', 'radar'] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              view === v ? 'bg-[#C9A84C] text-[#0A0E1A]' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}>
            {v === 'tabla' ? 'Tabla por Estado' : 'Gráfico Radar'}
          </button>
        ))}
      </div>

      {view === 'tabla' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full cne-table">
              <thead>
                <tr>
                  <th className="text-left">Estado</th>
                  <th className="text-left">Partido Ganador</th>
                  <th className="text-right">% Obtenido</th>
                  <th className="text-right">Votos</th>
                  <th className="text-left">Distribución</th>
                </tr>
              </thead>
              <tbody>
                {mockResultadosPorEstado.map((r) => (
                  <tr key={r.estado}>
                    <td className="text-white font-medium">{r.estado}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: r.color_partido }} />
                        <span className="text-gray-300 text-sm font-mono">{r.partido}</span>
                      </div>
                    </td>
                    <td className="text-right font-mono text-[#C9A84C] font-bold">{formatPercent(r.porcentaje)}</td>
                    <td className="text-right text-gray-400 font-mono text-sm">{formatNumber(r.votos)}</td>
                    <td className="w-32">
                      <ProgressBar value={r.porcentaje} color={r.color_partido} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {view === 'radar' && (
        <Card className="p-5">
          <h3 className="text-white font-semibold mb-5">PSUV vs PUD por Estado (%)</h3>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Radar name="PSUV" dataKey="PSUV" stroke="#CC0000" fill="#CC0000" fillOpacity={0.2} />
              <Radar name="PUD"  dataKey="PUD"  stroke="#1D4ED8" fill="#1D4ED8" fillOpacity={0.2} />
              <Tooltip
                contentStyle={{ background: '#1a2235', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, color: '#E5E7EB' }}
                formatter={(v: number) => `${v.toFixed(1)}%`}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  )
}
