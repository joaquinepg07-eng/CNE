import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { mockEstadistica, mockDashboardStats } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const eleccionId = searchParams.get('eleccion_id') ?? '1'
  const demo = !process.env.SUPABASE_SERVICE_ROLE_KEY

  if (demo) {
    return NextResponse.json({ data: { estadistica: mockEstadistica, dashboard: mockDashboardStats }, error: null })
  }

  try {
    const admin = supabaseAdmin()
    const { data, error } = await admin
      .from('estadisticas')
      .select('*')
      .eq('eleccion_id', eleccionId)
      .single()

    if (error) throw error
    return NextResponse.json({ data, error: null })
  } catch (err: any) {
    return NextResponse.json({ data: null, error: err.message }, { status: 500 })
  }
}
