import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { mockCandidatos } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eleccionId = searchParams.get('eleccion_id')
  const demo = searchParams.get('demo') === 'true' || !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co')

  // Use mock data if no Supabase configured
  if (demo) {
    const data = eleccionId
      ? mockCandidatos.filter(c => c.eleccion_id === eleccionId)
      : mockCandidatos
    return NextResponse.json({ data, error: null, count: data.length })
  }

  try {
    const admin = supabaseAdmin()
    let query = admin.from('candidatos').select('*').order('votos', { ascending: false })
    if (eleccionId) query = query.eq('eleccion_id', eleccionId)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ data, error: null, count })
  } catch (err: any) {
    return NextResponse.json({ data: null, error: err.message }, { status: 500 })
  }
}
