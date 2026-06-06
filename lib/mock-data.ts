import type { Eleccion, Candidato, CentroVotacion, ResultadoEstado, Estadistica, DashboardStats } from '@/types'

export const mockElecciones: Eleccion[] = [
  {
    id: '1',
    nombre: 'Elecciones Presidenciales 2024',
    tipo: 'presidencial',
    fecha: '2024-07-28',
    estado: 'finalizada',
    descripcion: 'Elección del Presidente de la República Bolivariana de Venezuela para el período 2025-2031.',
    total_votantes_habilitados: 21159709,
    participacion_porcentaje: 59.06,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-07-28T23:59:59Z',
  },
  {
    id: '2',
    nombre: 'Elecciones Parlamentarias 2025',
    tipo: 'parlamentaria',
    fecha: '2025-11-30',
    estado: 'programada',
    descripcion: 'Elección de diputados a la Asamblea Nacional de Venezuela.',
    total_votantes_habilitados: 21500000,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '3',
    nombre: 'Referendo Consultivo 2023',
    tipo: 'referendo',
    fecha: '2023-12-03',
    estado: 'finalizada',
    descripcion: 'Referendo consultivo sobre el Esequibo.',
    total_votantes_habilitados: 20700000,
    participacion_porcentaje: 51.0,
    created_at: '2023-10-01T00:00:00Z',
    updated_at: '2023-12-03T23:59:59Z',
  },
]

export const mockCandidatos: Candidato[] = [
  {
    id: 'c1', eleccion_id: '1',
    nombre: 'Nicolás', apellido: 'Maduro Moros', cedula: 'V-9589383',
    partido: 'Partido Socialista Unido de Venezuela', siglas_partido: 'PSUV',
    color_partido: '#CC0000', cargo_aspirado: 'Presidente de la República',
    votos: 5150092, porcentaje: 51.95,
    foto_url: 'https://ui-avatars.com/api/?name=NM&background=CC0000&color=fff&size=200',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'c2', eleccion_id: '1',
    nombre: 'Edmundo', apellido: 'González Urrutia', cedula: 'V-3442865',
    partido: 'Plataforma Unitaria Democrática', siglas_partido: 'PUD',
    color_partido: '#1D4ED8', cargo_aspirado: 'Presidente de la República',
    votos: 4443978, porcentaje: 44.02,
    foto_url: 'https://ui-avatars.com/api/?name=EG&background=1D4ED8&color=fff&size=200',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'c3', eleccion_id: '1',
    nombre: 'Luis Eduardo', apellido: 'Martínez', cedula: 'V-6255272',
    partido: 'Acción Democrática', siglas_partido: 'AD',
    color_partido: '#D97706', cargo_aspirado: 'Presidente de la República',
    votos: 155096, porcentaje: 1.56,
    foto_url: 'https://ui-avatars.com/api/?name=LM&background=D97706&color=fff&size=200',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'c4', eleccion_id: '1',
    nombre: 'Javier', apellido: 'Bertucci', cedula: 'V-12975026',
    partido: 'El Cambio', siglas_partido: 'EC',
    color_partido: '#059669', cargo_aspirado: 'Presidente de la República',
    votos: 103455, porcentaje: 1.04,
    foto_url: 'https://ui-avatars.com/api/?name=JB&background=059669&color=fff&size=200',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'c5', eleccion_id: '1',
    nombre: 'Enrique', apellido: 'Márquez', cedula: 'V-3734720',
    partido: 'Centrados en Venezuela', siglas_partido: 'CV',
    color_partido: '#7C3AED', cargo_aspirado: 'Presidente de la República',
    votos: 51773, porcentaje: 0.52,
    foto_url: 'https://ui-avatars.com/api/?name=EM&background=7C3AED&color=fff&size=200',
    created_at: '2024-01-15T00:00:00Z',
  },
]

export const mockCentros: CentroVotacion[] = [
  { id: 'cv1', codigo: 'DC-001', nombre: 'Escuela Básica Simón Bolívar', estado: 'Distrito Capital', municipio: 'Libertador', parroquia: 'El Recreo', direccion: 'Av. Principal de El Recreo, Caracas', latitud: 10.4880, longitud: -66.8792, total_mesas: 12, total_electores: 3200, activo: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'cv2', codigo: 'DC-002', nombre: 'Liceo Andrés Bello', estado: 'Distrito Capital', municipio: 'Libertador', parroquia: 'Candelaria', direccion: 'Esquina Candilito, Caracas', latitud: 10.5030, longitud: -66.9100, total_mesas: 18, total_electores: 4800, activo: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'cv3', codigo: 'ZU-001', nombre: 'Universidad del Zulia – Núcleo LUZ', estado: 'Zulia', municipio: 'Maracaibo', parroquia: 'Chiquinquirá', direccion: 'Av. Universidad, Maracaibo', latitud: 10.7067, longitud: -71.6437, total_mesas: 24, total_electores: 6400, activo: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'cv4', codigo: 'CA-001', nombre: 'Escuela Técnica Industrial', estado: 'Carabobo', municipio: 'Valencia', parroquia: 'San Blas', direccion: 'Calle 101, Valencia', latitud: 10.1740, longitud: -67.9950, total_mesas: 16, total_electores: 4200, activo: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'cv5', codigo: 'LA-001', nombre: 'Unidad Educativa Fe y Alegría', estado: 'Lara', municipio: 'Iribarren', parroquia: 'Catedral', direccion: 'Av. Libertador, Barquisimeto', latitud: 10.0700, longitud: -69.3200, total_mesas: 14, total_electores: 3700, activo: true, created_at: '2024-01-01T00:00:00Z' },
  { id: 'cv6', codigo: 'MI-001', nombre: 'Liceo Gustavo Herrera', estado: 'Miranda', municipio: 'Sucre', parroquia: 'Petare', direccion: 'Petare, Caracas', latitud: 10.4912, longitud: -66.7783, total_mesas: 20, total_electores: 5300, activo: true, created_at: '2024-01-01T00:00:00Z' },
]

export const mockResultadosPorEstado: ResultadoEstado[] = [
  { estado: 'Distrito Capital', candidato_id: 'c1', candidato_nombre: 'Nicolás Maduro', partido: 'PSUV', color_partido: '#CC0000', votos: 420000, porcentaje: 48.5, eleccion_id: '1' },
  { estado: 'Zulia', candidato_id: 'c2', candidato_nombre: 'Edmundo González', partido: 'PUD', color_partido: '#1D4ED8', votos: 890000, porcentaje: 61.2, eleccion_id: '1' },
  { estado: 'Miranda', candidato_id: 'c2', candidato_nombre: 'Edmundo González', partido: 'PUD', color_partido: '#1D4ED8', votos: 680000, porcentaje: 58.7, eleccion_id: '1' },
  { estado: 'Carabobo', candidato_id: 'c1', candidato_nombre: 'Nicolás Maduro', partido: 'PSUV', color_partido: '#CC0000', votos: 450000, porcentaje: 52.1, eleccion_id: '1' },
  { estado: 'Lara', candidato_id: 'c2', candidato_nombre: 'Edmundo González', partido: 'PUD', color_partido: '#1D4ED8', votos: 320000, porcentaje: 55.3, eleccion_id: '1' },
  { estado: 'Bolívar', candidato_id: 'c1', candidato_nombre: 'Nicolás Maduro', partido: 'PSUV', color_partido: '#CC0000', votos: 280000, porcentaje: 54.8, eleccion_id: '1' },
  { estado: 'Aragua', candidato_id: 'c1', candidato_nombre: 'Nicolás Maduro', partido: 'PSUV', color_partido: '#CC0000', votos: 310000, porcentaje: 53.2, eleccion_id: '1' },
  { estado: 'Táchira', candidato_id: 'c2', candidato_nombre: 'Edmundo González', partido: 'PUD', color_partido: '#1D4ED8', votos: 290000, porcentaje: 63.4, eleccion_id: '1' },
  { estado: 'Mérida', candidato_id: 'c2', candidato_nombre: 'Edmundo González', partido: 'PUD', color_partido: '#1D4ED8', votos: 220000, porcentaje: 59.1, eleccion_id: '1' },
  { estado: 'Anzoátegui', candidato_id: 'c1', candidato_nombre: 'Nicolás Maduro', partido: 'PSUV', color_partido: '#CC0000', votos: 340000, porcentaje: 51.7, eleccion_id: '1' },
]

export const mockEstadistica: Estadistica = {
  eleccion_id: '1',
  total_votantes: 21159709,
  votos_emitidos: 9914353,
  participacion: 59.06,
  mesas_escrutadas: 30026,
  total_mesas: 30026,
  porcentaje_escrutinio: 100,
  votos_nulos: 50000,
  votos_validos: 9864353,
  updated_at: '2024-07-29T02:00:00Z',
}

export const mockDashboardStats: DashboardStats = {
  totalElectores: 21159709,
  participacion: 59.06,
  mesasEscrutadas: 30026,
  totalMesas: 30026,
  votosValidos: 9864353,
  votosNulos: 50000,
  escrutinioPorcentaje: 100,
}
