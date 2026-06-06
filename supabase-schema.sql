-- ============================================================
--  CNE Venezuela – Supabase Schema
--  Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Elecciones ────────────────────────────────────────────────
create table if not exists public.elecciones (
  id                          uuid primary key default uuid_generate_v4(),
  nombre                      text not null,
  tipo                        text not null check (tipo in ('presidencial','parlamentaria','regional','municipal','referendo')),
  fecha                       date not null,
  estado                      text not null default 'programada' check (estado in ('programada','en_curso','finalizada','suspendida')),
  descripcion                 text,
  total_votantes_habilitados  bigint not null default 0,
  participacion_porcentaje    numeric(5,2),
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

-- ── Candidatos ────────────────────────────────────────────────
create table if not exists public.candidatos (
  id                uuid primary key default uuid_generate_v4(),
  eleccion_id       uuid not null references public.elecciones(id) on delete cascade,
  nombre            text not null,
  apellido          text not null,
  cedula            text not null,
  partido           text not null,
  siglas_partido    text not null,
  color_partido     text not null default '#888888',
  cargo_aspirado    text not null,
  estado            text,
  municipio         text,
  foto_url          text,
  votos             bigint default 0,
  porcentaje        numeric(6,3) default 0,
  created_at        timestamptz not null default now()
);

-- ── Centros de Votación ───────────────────────────────────────
create table if not exists public.centros_votacion (
  id               uuid primary key default uuid_generate_v4(),
  codigo           text not null unique,
  nombre           text not null,
  estado           text not null,
  municipio        text not null,
  parroquia        text not null,
  direccion        text not null,
  latitud          numeric(9,6),
  longitud         numeric(9,6),
  total_mesas      integer not null default 1,
  total_electores  integer not null default 0,
  activo           boolean not null default true,
  created_at       timestamptz not null default now()
);

-- ── Resultados por Estado ─────────────────────────────────────
create table if not exists public.resultados_por_estado (
  id                uuid primary key default uuid_generate_v4(),
  eleccion_id       uuid not null references public.elecciones(id) on delete cascade,
  candidato_id      uuid not null references public.candidatos(id) on delete cascade,
  estado            text not null,
  votos             bigint not null default 0,
  porcentaje        numeric(6,3) not null default 0,
  candidato_nombre  text not null,
  partido           text not null,
  color_partido     text not null,
  unique(eleccion_id, candidato_id, estado)
);

-- ── Estadísticas ──────────────────────────────────────────────
create table if not exists public.estadisticas (
  id                      uuid primary key default uuid_generate_v4(),
  eleccion_id             uuid not null references public.elecciones(id) on delete cascade unique,
  total_votantes          bigint not null default 0,
  votos_emitidos          bigint not null default 0,
  participacion           numeric(5,2) not null default 0,
  mesas_escrutadas        integer not null default 0,
  total_mesas             integer not null default 0,
  porcentaje_escrutinio   numeric(5,2) not null default 0,
  votos_nulos             bigint not null default 0,
  votos_validos           bigint not null default 0,
  updated_at              timestamptz not null default now()
);

-- ── Registro Electoral (Votantes) ─────────────────────────────
create table if not exists public.registro_electoral (
  id                  uuid primary key default uuid_generate_v4(),
  cedula              text not null unique,
  nombre              text not null,
  apellido            text not null,
  estado              text not null,
  municipio           text not null,
  parroquia           text not null,
  centro_votacion_id  uuid references public.centros_votacion(id),
  centro_nombre       text,
  mesa_numero         integer not null,
  condicion           text not null default 'Hábil',
  created_at          timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────────────
alter table public.elecciones          enable row level security;
alter table public.candidatos          enable row level security;
alter table public.centros_votacion    enable row level security;
alter table public.resultados_por_estado enable row level security;
alter table public.estadisticas        enable row level security;
alter table public.registro_electoral  enable row level security;

-- Public read access
create policy "Public read elecciones"           on public.elecciones          for select using (true);
create policy "Public read candidatos"           on public.candidatos          for select using (true);
create policy "Public read centros"              on public.centros_votacion    for select using (true);
create policy "Public read resultados"           on public.resultados_por_estado for select using (true);
create policy "Public read estadisticas"         on public.estadisticas        for select using (true);
create policy "Public read registro_electoral"   on public.registro_electoral  for select using (true);

-- ── Indexes ───────────────────────────────────────────────────
create index if not exists idx_candidatos_eleccion   on public.candidatos(eleccion_id);
create index if not exists idx_resultados_eleccion   on public.resultados_por_estado(eleccion_id);
create index if not exists idx_centros_estado         on public.centros_votacion(estado);
create index if not exists idx_registro_cedula        on public.registro_electoral(cedula);

-- ── Seed Data ─────────────────────────────────────────────────
insert into public.elecciones (id, nombre, tipo, fecha, estado, descripcion, total_votantes_habilitados, participacion_porcentaje) values
  ('00000000-0000-0000-0000-000000000001', 'Elecciones Presidenciales 2024', 'presidencial', '2024-07-28', 'finalizada', 'Elección del Presidente de la República Bolivariana de Venezuela para el período 2025-2031.', 21159709, 59.06),
  ('00000000-0000-0000-0000-000000000002', 'Elecciones Parlamentarias 2025', 'parlamentaria', '2025-11-30', 'programada', 'Elección de diputados a la Asamblea Nacional.', 21500000, null)
on conflict (id) do nothing;

-- Candidatos presidenciales 2024
insert into public.candidatos (eleccion_id, nombre, apellido, cedula, partido, siglas_partido, color_partido, cargo_aspirado, votos, porcentaje) values
  ('00000000-0000-0000-0000-000000000001', 'Nicolás',      'Maduro Moros',    'V-9589383',  'Partido Socialista Unido de Venezuela', 'PSUV', '#CC0000', 'Presidente de la República', 5150092, 51.95),
  ('00000000-0000-0000-0000-000000000001', 'Edmundo',      'González Urrutia','V-3442865',  'Plataforma Unitaria Democrática',       'PUD',  '#1D4ED8', 'Presidente de la República', 4443978, 44.02),
  ('00000000-0000-0000-0000-000000000001', 'Luis Eduardo', 'Martínez',        'V-6255272',  'Acción Democrática',                    'AD',   '#D97706', 'Presidente de la República', 155096,  1.56),
  ('00000000-0000-0000-0000-000000000001', 'Javier',       'Bertucci',        'V-12975026', 'El Cambio',                             'EC',   '#059669', 'Presidente de la República', 103455,  1.04),
  ('00000000-0000-0000-0000-000000000001', 'Enrique',      'Márquez',         'V-3734720',  'Centrados en Venezuela',                'CV',   '#7C3AED', 'Presidente de la República', 51773,   0.52)
on conflict do nothing;

-- Estadísticas
insert into public.estadisticas (eleccion_id, total_votantes, votos_emitidos, participacion, mesas_escrutadas, total_mesas, porcentaje_escrutinio, votos_nulos, votos_validos)
values ('00000000-0000-0000-0000-000000000001', 21159709, 9914353, 59.06, 30026, 30026, 100, 50000, 9864353)
on conflict (eleccion_id) do nothing;
