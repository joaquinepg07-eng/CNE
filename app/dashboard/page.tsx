'use client'

import { useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { BarChart3, TrendingUp, Users, Vote, Award, Activity } from 'lucide-react'
import { mockCandidatos, mockDashboardStats, mockEstadistica, mockResultadosPorEstado } from '@/lib/mock-data'
import { formatNumber, formatPercent } from '@/lib/utils'
import { StatCard, SectionHeader, ProgressBar, Card } from '@/components/ui'

const PARTICIPATION_BY_HOUR = [
  { hora: '06:00', participacion: 5.2 }, { hora: '07:00', participacion: 12.8 },
  { hora: '08:00', participacion: 21.3 }, { hora: '09:00', participacion: 30.1 },
  { hora: '10:00', participacion: 38.4 }, { hora: '11:00', participacion: 44.7 },
  { hora: '12:00', participacion: 48.9 }, { hora: '13:00', participacion: 51.2 },
  { hora: '14:00', participacion: 53.8 }, { hora: '15:00', participacion: 55.6 },
  { hora: '16:00', participacion: 57.1 }, { hora: '17:00', participacion: 58.3 },
  { hora: '18:00', participacion: 59.06 },
]

const VOTOS_POR_ESTADO = [
  { estado: 'Zulia',        PSUV: 580000, PUD: 890000 },
  { estado: 'Miranda',      PSUV: 520000, PUD: 680000 },
  { estado: 'Carabobo',     PSUV: 450000, PUD: 380000 },
  { estado: 'D. Capital',   PSUV: 420000, PUD: 390000 },
  { estado: 'Lara',         PSUV: 260000, PUD: 320000 },
  { estado: 'Bolívar',      PSUV: 280000, PUD: 210000 },
  { estado: 'Aragua',       PSUV: 310000, PUD: 280000 },
  { estado: 'Táchira',      PSUV: 168000, PUD: 290000 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a2235] border border-[rgba(201,168,76,0.2)] rounded-lg p-3 shadow-xl text-sm">
      <p className="text-[#C9A84C] font-mono mb-2">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}:</span><span className="font-bold">{typeof p.value === 'number' && p.value > 1000 ? formatNumber(p.value) : `${p.value}%`}</span>
        </p>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'estados'>('general')
  const s = mockDashboardStats
  const e = mockEstadistica

  const pieData = mockCandidatos
    .filter(c => c.eleccion_id === '1')
    .map(c => ({ name: c.siglas_partido, value: c.votos!, color: c.color_partido }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

      <SectionHeader
        title="Dashboard Electoral"
        sub="Elecciones Presidenciales 2024 · República Bolivariana de Venezuela"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Electores"    value={formatNumber(s.totalElectores)} icon={<Users className="w-5 h-5" />}          accent="gold"  delay={0} />
        <StatCard label="Participación"      value={formatPercent(s.participacion)}  icon={<TrendingUp className="w-5 h-5" />}     accent="green" delay={100} />
        <StatCard label="Votos Válidos"      value={formatNumber(s.votosValidos)}     icon={<Vote className="w-5 h-5" />}           accent="gold"  delay={200} />
        <StatCard label="% Escrutinio"       value={formatPercent(s.escrutinioPorcentaje)} icon={<Activity className="w-5 h-5" />} accent="blue"  delay={300} />
      </div>

      {/* Mesas escrutadas progress */}
      <Card className="p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white font-medium">Mesas Escrutadas</p>
            <p className="text-gray-500 text-xs font-mono">{formatNumber(e.mesas_escrutadas)} de {formatNumber(e.total_mesas)} mesas</p>
          </div>
          <span className="text-[#C9A84C] font-mono font-bold text-lg">{formatPercent(e.porcentaje_escrutinio)}</span>
        </div>
        <ProgressBar value={e.porcentaje_escrutinio} animated />
        <div className="flex justify-between mt-3 text-xs text-gray-600 font-mono">
          <span>Votos nulos: {formatNumber(e.votos_nulos)}</span>
          <span>Votos válidos: {formatNumber(e.votos_validos)}</span>
        </div>
      </Card>

      {/* Tab selector */}
      <div className="flex gap-2 mb-6">
        {(['general', 'estados'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#C9A84C] text-[#0A0E1A]'
                : 'bg-white/5 text-gray-400 hover:text-white'}`}>
            {tab === 'general' ? 'Vista General' : 'Por Estado'}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Candidates result list */}
          <Card className="lg:col-span-2 p-5">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-4 h-4 text-[#C9A84C]" />
              <h3 className="text-white font-semibold">Resultados por Candidato</h3>
            </div>
            <div className="space-y-4">
              {mockCandidatos
                .filter(c => c.eleccion_id === '1')
                .sort((a, b) => (b.votos ?? 0) - (a.votos ?? 0))
                .map((c, i) => (
                  <div key={c.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-xs font-mono w-4">{i + 1}</span>
                        <div className="w-2 h-2 rounded-full" style={{ background: c.color_partido }} />
                        <span className="text-white text-sm font-medium">{c.apellido}</span>
                        <span className="text-gray-500 text-xs font-mono">{c.siglas_partido}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#C9A84C] font-mono text-sm font-bold">{formatPercent(c.porcentaje ?? 0)}</span>
                      </div>
                    </div>
                    <ProgressBar value={c.porcentaje ?? 0} color={c.color_partido} />
                    <p className="text-gray-600 text-xs font-mono mt-1">{formatNumber(c.votos ?? 0)} votos</p>
                  </div>
                ))}
            </div>
          </Card>

          {/* Pie chart */}
          <Card className="lg:col-span-3 p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-[#C9A84C]" />
              <h3 className="text-white font-semibold">Distribución de Votos</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} innerRadius={55}
                  dataKey="value" nameKey="name" paddingAngle={2}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ color: '#9CA3AF', fontSize: 12 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Participation timeline */}
          <Card className="lg:col-span-5 p-5">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-[#C9A84C]" />
              <h3 className="text-white font-semibold">Curva de Participación – 28 Jul 2024</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={PARTICIPATION_BY_HOUR} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="hora" tick={{ fill: '#6B7280', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="participacion" stroke="#C9A84C" strokeWidth={2.5}
                  dot={{ fill: '#C9A84C', r: 3 }} activeDot={{ r: 5, fill: '#F5D78E' }} name="Participación" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === 'estados' && (
        <Card className="p-5">
          <h3 className="text-white font-semibold mb-5">Votos por Estado – PSUV vs PUD</h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={VOTOS_POR_ESTADO} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="estado" tick={{ fill: '#6B7280', fontSize: 11 }} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ color: '#9CA3AF', fontSize: 12 }}>{v}</span>} />
              <Bar dataKey="PSUV" fill="#CC0000" radius={[3, 3, 0, 0]} />
              <Bar dataKey="PUD"  fill="#1D4ED8" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full cne-table">
              <thead>
                <tr>
                  <th className="text-left">Estado</th>
                  <th className="text-left">Ganador</th>
                  <th className="text-right">% Ganador</th>
                  <th className="text-right">Votos Ganador</th>
                </tr>
              </thead>
              <tbody>
                {mockResultadosPorEstado.map((r) => (
                  <tr key={r.estado}>
                    <td className="text-white font-medium">{r.estado}</td>
                    <td>
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        <span className="w-2 h-2 rounded-full" style={{ background: r.color_partido }} />
                        <span className="text-gray-300">{r.candidato_nombre}</span>
                        <span className="text-gray-600 font-mono text-xs">{r.partido}</span>
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="font-mono text-[#C9A84C]">{formatPercent(r.porcentaje)}</span>
                    </td>
                    <td className="text-right text-gray-400 font-mono text-sm">{formatNumber(r.votos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
