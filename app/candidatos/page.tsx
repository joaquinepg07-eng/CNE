'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Users, Search, Trophy } from 'lucide-react'
import { mockCandidatos, mockElecciones } from '@/lib/mock-data'
import { formatNumber, formatPercent } from '@/lib/utils'
import { SectionHeader, ProgressBar, Card } from '@/components/ui'

export default function CandidatosPage() {
  const [search, setSearch] = useState('')
  const [selectedEleccion, setSelectedEleccion] = useState('1')

  const candidatos = mockCandidatos
    .filter(c => c.eleccion_id === selectedEleccion)
    .filter(c => {
      const q = search.toLowerCase()
      return !q || c.nombre.toLowerCase().includes(q) || c.apellido.toLowerCase().includes(q) || c.partido.toLowerCase().includes(q)
    })
    .sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))

  const winner = candidatos[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <SectionHeader title="Candidatos" sub="Candidatos registrados por proceso electoral" />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <select
          value={selectedEleccion}
          onChange={e => setSelectedEleccion(e.target.value)}
          className="bg-[#111827] border border-[rgba(201,168,76,0.15)] text-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] font-mono"
        >
          {mockElecciones.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar candidato o partido..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#111827] border border-[rgba(201,168,76,0.15)] text-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] placeholder-gray-600"
          />
        </div>
      </div>

      {/* Winner highlight */}
      {winner?.votos && (
        <Card className="p-6 mb-8 border-[rgba(201,168,76,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/5 rounded-full blur-2xl" />
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-mono uppercase tracking-widest">Candidato Más Votado</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0" style={{ borderColor: winner.color_partido }}>
                <Image src={winner.foto_url ?? `https://ui-avatars.com/api/?name=${winner.nombre}+${winner.apellido}&background=111827&color=C9A84C`}
                  alt={winner.nombre} width={64} height={64} className="object-cover" />
              </div>
              <div>
                <h3 className="text-white text-xl font-display font-bold">{winner.nombre} {winner.apellido}</h3>
                <p className="text-gray-400 text-sm">{winner.cargo_aspirado}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: winner.color_partido }} />
                  <span className="text-gray-500 text-xs font-mono">{winner.partido} ({winner.siglas_partido})</span>
                </div>
              </div>
            </div>
            <div className="sm:ml-auto text-center sm:text-right">
              <p className="text-4xl font-display font-black text-[#C9A84C]">{formatPercent(winner.porcentaje ?? 0)}</p>
              <p className="text-gray-500 text-sm font-mono">{formatNumber(winner.votos)} votos</p>
            </div>
          </div>
        </Card>
      )}

      {/* Candidates grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {candidatos.map((c, i) => (
          <Card key={c.id} className="p-5 hover:border-[rgba(201,168,76,0.25)] transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: c.color_partido + '60' }}>
                    <Image src={c.foto_url ?? `https://ui-avatars.com/api/?name=${c.nombre}+${c.apellido}&background=111827&color=C9A84C`}
                      alt={c.nombre} width={48} height={48} className="object-cover" />
                  </div>
                  {i === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center">
                      <Trophy className="w-2.5 h-2.5 text-[#0A0E1A]" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{c.nombre} {c.apellido}</p>
                  <p className="text-gray-500 text-xs">C.I. {c.cedula}</p>
                </div>
              </div>
              <span className="text-gray-600 font-mono text-xs">#{i + 1}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-sm" style={{ background: c.color_partido }} />
              <span className="text-xs font-mono text-gray-400">{c.siglas_partido}</span>
              <span className="text-gray-600 text-xs">·</span>
              <span className="text-gray-500 text-xs truncate">{c.partido}</span>
            </div>

            <p className="text-[#C9A84C] text-xs font-mono uppercase tracking-wide mb-3">{c.cargo_aspirado}</p>

            {c.votos !== undefined && (
              <>
                <div className="flex justify-between mb-1.5">
                  <span className="text-gray-500 text-xs">Votos obtenidos</span>
                  <span className="text-white font-mono text-xs font-bold">{formatPercent(c.porcentaje ?? 0)}</span>
                </div>
                <ProgressBar value={c.porcentaje ?? 0} color={c.color_partido} />
                <p className="text-gray-600 font-mono text-xs mt-1">{formatNumber(c.votos)}</p>
              </>
            )}
          </Card>
        ))}
      </div>

      {candidatos.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No se encontraron candidatos.</p>
        </div>
      )}
    </div>
  )
}
