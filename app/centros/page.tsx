'use client'

import { useState } from 'react'
import { MapPin, Search, Building2, Users, Hash } from 'lucide-react'
import { mockCentros } from '@/lib/mock-data'
import { ESTADOS_VENEZUELA, formatNumber } from '@/lib/utils'
import { SectionHeader, Card, StatCard } from '@/components/ui'

export default function CentrosPage() {
  const [search, setSearch] = useState('')
  const [estado, setEstado] = useState('')

  const centros = mockCentros.filter(c => {
    const q = search.toLowerCase()
    const matchQ = !q || c.nombre.toLowerCase().includes(q) || c.municipio.toLowerCase().includes(q) || c.codigo.toLowerCase().includes(q)
    const matchE = !estado || c.estado === estado
    return matchQ && matchE
  })

  const totalElectores = mockCentros.reduce((s, c) => s + c.total_electores, 0)
  const totalMesas = mockCentros.reduce((s, c) => s + c.total_mesas, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <SectionHeader title="Centros de Votación" sub="Directorio nacional de centros electorales activos" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Centros Activos"   value={mockCentros.filter(c => c.activo).length} icon={<Building2 className="w-5 h-5" />} accent="gold" />
        <StatCard label="Total de Mesas"    value={formatNumber(totalMesas)}                   icon={<Hash className="w-5 h-5" />}      accent="blue" />
        <StatCard label="Total Electores"   value={formatNumber(totalElectores)}               icon={<Users className="w-5 h-5" />}     accent="green" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, municipio o código..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#111827] border border-[rgba(201,168,76,0.15)] text-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] placeholder-gray-600"
          />
        </div>
        <select
          value={estado}
          onChange={e => setEstado(e.target.value)}
          className="bg-[#111827] border border-[rgba(201,168,76,0.15)] text-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C] font-mono min-w-[180px]"
        >
          <option value="">Todos los estados</option>
          {ESTADOS_VENEZUELA.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full cne-table">
            <thead>
              <tr>
                <th className="text-left">Código</th>
                <th className="text-left">Centro de Votación</th>
                <th className="text-left">Estado</th>
                <th className="text-left">Municipio / Parroquia</th>
                <th className="text-right">Mesas</th>
                <th className="text-right">Electores</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {centros.map((c) => (
                <tr key={c.id}>
                  <td className="font-mono text-[#C9A84C] text-xs">{c.codigo}</td>
                  <td>
                    <p className="text-white font-medium text-sm">{c.nombre}</p>
                    <p className="text-gray-600 text-xs mt-0.5 truncate max-w-[200px]">{c.direccion}</p>
                  </td>
                  <td className="text-gray-300 text-sm">{c.estado}</td>
                  <td>
                    <p className="text-gray-300 text-sm">{c.municipio}</p>
                    <p className="text-gray-600 text-xs">{c.parroquia}</p>
                  </td>
                  <td className="text-right font-mono text-gray-300">{c.total_mesas}</td>
                  <td className="text-right font-mono text-gray-300">{formatNumber(c.total_electores)}</td>
                  <td className="text-center">
                    <span className={`badge ${c.activo ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                      {c.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {centros.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>No se encontraron centros de votación.</p>
          </div>
        )}

        <div className="px-5 py-3 border-t border-[rgba(201,168,76,0.08)] text-gray-600 text-xs font-mono">
          Mostrando {centros.length} de {mockCentros.length} centros · Datos de muestra
        </div>
      </Card>
    </div>
  )
}
