'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Vote, BarChart3, MapPin, Users, Search, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',           label: 'Inicio',      icon: Home },
  { href: '/dashboard',  label: 'Dashboard',   icon: BarChart3 },
  { href: '/candidatos', label: 'Candidatos',  icon: Users },
  { href: '/resultados', label: 'Resultados',  icon: Vote },
  { href: '/centros',    label: 'Centros',     icon: MapPin },
  { href: '/consulta',   label: 'Consulta',    icon: Search },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 glass border-b border-[rgba(201,168,76,0.12)]">
      {/* Flag stripe */}
      <div className="flag-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#CC0000] via-[#C9A84C] to-[#001F5B] flex items-center justify-center shadow-lg group-hover:shadow-[#C9A84C]/20 transition-shadow">
                <Vote className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <p className="font-display font-bold text-white leading-none text-sm tracking-wide">CNE</p>
              <p className="text-[10px] text-[#C9A84C] leading-none tracking-widest uppercase font-mono">Venezuela</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    active
                      ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[rgba(201,168,76,0.1)] bg-[#0A0E1A]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all',
                    active
                      ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
