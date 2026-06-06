# 🗳️ CNE Venezuela – Portal Electoral

Portal oficial demo del **Consejo Nacional Electoral** de la República Bolivariana de Venezuela, construido con **Next.js 14**, **TypeScript**, **Tailwind CSS** y **Supabase**.

---

## ✨ Características

- **Dashboard Electoral** – Gráficas interactivas (línea, barras, torta, radar) con resultados en tiempo real
- **Candidatos** – Perfiles completos con porcentajes y barras de votación
- **Resultados por Estado** – Tabla y gráfico radar de distribución geográfica
- **Centros de Votación** – Directorio buscable con filtros por estado
- **Consulta de Votante** – Búsqueda por cédula con asignación de mesa
- **API REST** – Endpoints `/api/candidatos`, `/api/centros`, `/api/resultados`, `/api/estadisticas`
- **Modo Demo** – Funciona sin Supabase con datos realistas precargados
- **Dark Mode** – Tema oscuro con paleta electoral venezolana (rojo, dorado, azul)
- **Responsive** – Optimizado para móvil y escritorio

---

## 🚀 Inicio Rápido

### 1. Clonar e instalar

```bash
git clone https://github.com/TU_USUARIO/cne-venezuela.git
cd cne-venezuela
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Nota:** Si no configuras Supabase, la app funciona automáticamente en **modo demo** con datos de muestra.

### 3. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Configurar Supabase

### Paso 1 – Crear proyecto

1. Ve a [supabase.com](https://supabase.com) → **New Project**
2. Elige un nombre, región y contraseña de base de datos
3. Espera ~2 minutos

### Paso 2 – Crear esquema

1. En tu proyecto Supabase → **SQL Editor**
2. Copia y pega el contenido de `supabase-schema.sql`
3. Haz clic en **Run**

Esto crea todas las tablas, políticas RLS, índices y datos de seed.

### Paso 3 – Obtener credenciales

En tu proyecto Supabase → **Project Settings** → **API**:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (solo servidor)

---

## ☁️ Desplegar en Vercel

### Opción A – Vercel CLI (recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Opción B – GitHub + Vercel Dashboard

1. Sube tu proyecto a GitHub (ver sección abajo)
2. Ve a [vercel.com](https://vercel.com) → **Add New Project**
3. Importa tu repositorio de GitHub
4. En **Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Clic en **Deploy** 🚀

---

## 📦 Subir a GitHub

```bash
# Inicializar repositorio
git init
git add .
git commit -m "feat: CNE Venezuela portal - initial release"

# Conectar a GitHub (crea el repo en github.com primero)
git remote add origin https://github.com/TU_USUARIO/cne-venezuela.git
git branch -M main
git push -u origin main
```

---

## 📁 Estructura del Proyecto

```
cne-venezuela/
├── app/
│   ├── page.tsx              # 🏠 Homepage
│   ├── dashboard/page.tsx    # 📊 Dashboard con gráficas
│   ├── candidatos/page.tsx   # 👤 Candidatos
│   ├── resultados/page.tsx   # 🗳️ Resultados por estado
│   ├── centros/page.tsx      # 📍 Centros de votación
│   ├── consulta/page.tsx     # 🔍 Consulta de votante
│   ├── api/
│   │   ├── candidatos/       # GET /api/candidatos
│   │   ├── centros/          # GET /api/centros
│   │   ├── resultados/       # GET /api/resultados
│   │   └── estadisticas/     # GET /api/estadisticas
│   ├── layout.tsx            # Layout raíz con Navbar/Footer
│   └── globals.css           # Estilos globales
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Navegación principal
│   │   └── Footer.tsx        # Pie de página
│   └── ui/
│       └── index.tsx         # StatCard, Badge, ProgressBar, Card...
├── lib/
│   ├── supabase.ts           # Cliente Supabase
│   ├── utils.ts              # Helpers y constantes
│   └── mock-data.ts          # Datos demo venezolanos
├── types/
│   └── index.ts              # TypeScript interfaces
├── supabase-schema.sql       # Schema completo + seed data
├── vercel.json               # Configuración Vercel
└── .env.example              # Variables de entorno de ejemplo
```

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 14** | Framework React con App Router |
| **TypeScript** | Tipado estático |
| **Tailwind CSS** | Estilos utilitarios |
| **Supabase** | PostgreSQL + API + Auth + RLS |
| **Recharts** | Gráficas interactivas |
| **Lucide React** | Íconos |
| **React Hot Toast** | Notificaciones |

---

## 📡 API Endpoints

| Endpoint | Método | Params | Descripción |
|---|---|---|---|
| `/api/candidatos` | GET | `eleccion_id` | Lista de candidatos |
| `/api/centros` | GET | `estado`, `search`, `page` | Centros de votación |
| `/api/resultados` | GET | `eleccion_id`, `estado` | Resultados por estado |
| `/api/estadisticas` | GET | `eleccion_id` | Estadísticas generales |

---

## ⚠️ Aviso Legal

Este es un portal **demostrativo** creado con fines educativos y de desarrollo de software. Los datos son una combinación de información pública y datos ficticios. Para información electoral oficial, visita [cne.gob.ve](https://www.cne.gob.ve).

---

## 📄 Licencia

MIT © 2024 – Proyecto de demostración

🇻🇪 República Bolivariana de Venezuela
