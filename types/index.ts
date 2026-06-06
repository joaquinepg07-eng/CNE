// ─── Database Types ───────────────────────────────────────────────────────────

export type EstadoVenezuela =
  | 'Amazonas' | 'Anzoátegui' | 'Apure' | 'Aragua' | 'Barinas'
  | 'Bolívar' | 'Carabobo' | 'Cojedes' | 'Delta Amacuro' | 'Distrito Capital'
  | 'Falcón' | 'Guárico' | 'Lara' | 'Mérida' | 'Miranda' | 'Monagas'
  | 'Nueva Esparta' | 'Portuguesa' | 'Sucre' | 'Táchira' | 'Trujillo'
  | 'La Guaira' | 'Yaracuy' | 'Zulia';

export type TipoEleccion =
  | 'presidencial'
  | 'parlamentaria'
  | 'regional'
  | 'municipal'
  | 'referendo';

export type EstadoEleccion = 'programada' | 'en_curso' | 'finalizada' | 'suspendida';

export interface Eleccion {
  id: string;
  nombre: string;
  tipo: TipoEleccion;
  fecha: string;
  estado: EstadoEleccion;
  descripcion?: string;
  total_votantes_habilitados: number;
  participacion_porcentaje?: number;
  created_at: string;
  updated_at: string;
}

export interface Candidato {
  id: string;
  eleccion_id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  partido: string;
  siglas_partido: string;
  color_partido: string;
  cargo_aspirado: string;
  estado?: EstadoVenezuela;
  municipio?: string;
  foto_url?: string;
  votos?: number;
  porcentaje?: number;
  created_at: string;
}

export interface CentroVotacion {
  id: string;
  codigo: string;
  nombre: string;
  estado: EstadoVenezuela;
  municipio: string;
  parroquia: string;
  direccion: string;
  latitud?: number;
  longitud?: number;
  total_mesas: number;
  total_electores: number;
  activo: boolean;
  created_at: string;
}

export interface ResultadoEstado {
  estado: EstadoVenezuela;
  candidato_id: string;
  candidato_nombre: string;
  partido: string;
  color_partido: string;
  votos: number;
  porcentaje: number;
  eleccion_id: string;
}

export interface Estadistica {
  eleccion_id: string;
  total_votantes: number;
  votos_emitidos: number;
  participacion: number;
  mesas_escrutadas: number;
  total_mesas: number;
  porcentaje_escrutinio: number;
  votos_nulos: number;
  votos_validos: number;
  updated_at: string;
}

export interface Votante {
  cedula: string;
  nombre: string;
  apellido: string;
  estado: EstadoVenezuela;
  municipio: string;
  parroquia: string;
  centro_votacion: string;
  mesa_numero: number;
  condicion?: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  count?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Chart Types ─────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
  porcentaje?: number;
}

export interface TimeSeriesPoint {
  fecha: string;
  participacion: number;
  votos: number;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export interface DashboardStats {
  totalElectores: number;
  participacion: number;
  mesasEscrutadas: number;
  totalMesas: number;
  votosValidos: number;
  votosNulos: number;
  escrutinioPorcentaje: number;
}
