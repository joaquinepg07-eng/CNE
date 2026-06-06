import Link from 'next/link'
import { Vote, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[rgba(201,168,76,0.1)] bg-[#070B14] mt-auto">
      <div className="flag-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#CC0000] via-[#C9A84C] to-[#001F5B] flex items-center justify-center">
                <Vote className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">CNE Venezuela</p>
                <p className="text-[10px] text-[#C9A84C] tracking-widest uppercase font-mono">Portal Electoral</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Consejo Nacional Electoral de la República Bolivariana de Venezuela.
              Organismo rector del poder electoral.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-mono uppercase tracking-widest mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                ['/dashboard', 'Dashboard Electoral'],
                ['/candidatos', 'Candidatos'],
                ['/resultados', 'Resultados'],
                ['/centros', 'Centros de Votación'],
                ['/consulta', 'Consulta de Votante'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-500 hover:text-[#C9A84C] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-mono uppercase tracking-widest mb-4">Información</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3 text-[#C9A84C]" />
                <a href="https://www.cne.gob.ve" target="_blank" rel="noopener noreferrer"
                   className="hover:text-[#C9A84C] transition-colors">cne.gob.ve</a>
              </li>
              <li>Av. Vollmer, San Bernardino</li>
              <li>Caracas, Venezuela</li>
              <li className="text-xs text-gray-600 pt-2 font-mono">
                Datos con fines demostrativos
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-xs font-mono">
            © {year} CNE Venezuela – Portal Demo. Next.js + Supabase.
          </p>
          <p className="text-gray-700 text-xs">
            República Bolivariana de Venezuela 🇻🇪
          </p>
        </div>
      </div>
    </footer>
  )
}
