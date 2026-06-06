import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { mockResultadosPorEstado } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eleccionId = searchParams.get('eleccion_id') ?? '1'
  const estado = searchParams.get('estado')
  const demo = !process.env.SUPABASE_SERVICE_ROLE_KEY

  if (demo) {
    let data = mockResultadosPorEstado.filter(r => r.eleccion_id === eleccionId)
    if (estado) data = data.filter(r => r.estado === estado)
    return NextResponse.json({ data, error: null })
  }

  try {
    const admin = supabaseAdmin()
    let query = admin
      .from('resultados_por_estado')
      .select('*')
      .eq('eleccion_id', eleccionId)
      .order('votos', { ascending: false })

    if (estado) query = query.eq('estado', estado)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ data, error: null })
  } catch (err: any) {
    return NextResponse.json({ data: null, error: err.message }, { status: 500 })
  }
}
