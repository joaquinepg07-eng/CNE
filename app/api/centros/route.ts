import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { mockCentros } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') ?? '1')
  const pageSize = parseInt(searchParams.get('pageSize') ?? '20')
  const demo = !process.env.SUPABASE_SERVICE_ROLE_KEY

  if (demo) {
    let data = [...mockCentros]
    if (estado) data = data.filter(c => c.estado === estado)
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(c =>
        c.nombre.toLowerCase().includes(q) ||
        c.municipio.toLowerCase().includes(q) ||
        c.codigo.toLowerCase().includes(q)
      )
    }
    return NextResponse.json({ data, error: null, count: data.length })
  }

  try {
    const admin = supabaseAdmin()
    let query = admin.from('centros_votacion')
      .select('*', { count: 'exact' })
      .eq('activo', true)
      .order('estado')
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (estado) query = query.eq('estado', estado)
    if (search) query = query.ilike('nombre', `%${search}%`)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ data, error: null, count, page, pageSize, totalPages: Math.ceil((count ?? 0) / pageSize) })
  } catch (err: any) {
    return NextResponse.json({ data: null, error: err.message }, { status: 500 })
  }
}
