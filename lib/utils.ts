import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-VE').format(num)
}

export function formatPercent(num: number, decimals = 2): string {
  return `${num.toFixed(decimals)}%`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-VE', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export function getInitials(nombre: string, apellido: string): string {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export const ESTADOS_VENEZUELA = [
  'Amazonas','Anzoátegui','Apure','Aragua','Barinas','Bolívar','Carabobo',
  'Cojedes','Delta Amacuro','Distrito Capital','Falcón','Guárico','Lara',
  'Mérida','Miranda','Monagas','Nueva Esparta','Portuguesa','Sucre',
  'Táchira','Trujillo','La Guaira','Yaracuy','Zulia',
] as const

export const TIPO_ELECCION_LABELS: Record<string, string> = {
  presidencial:  'Presidencial',
  parlamentaria: 'Parlamentaria',
  regional:      'Regional',
  municipal:     'Municipal',
  referendo:     'Referendo',
}

export const ESTADO_ELECCION_LABELS: Record<string, string> = {
  programada:  'Programada',
  en_curso:    'En Curso',
  finalizada:  'Finalizada',
  suspendida:  'Suspendida',
}

export const ESTADO_COLORS: Record<string, string> = {
  programada:  'text-blue-400 bg-blue-400/10',
  en_curso:    'text-green-400 bg-green-400/10',
  finalizada:  'text-gray-400 bg-gray-400/10',
  suspendida:  'text-red-400 bg-red-400/10',
}
