---
type: doc
name: project-overview
description: High-level overview of the Hortifast project, its purpose, and key components
category: overview
generated: 2026-01-29
status: filled
scaffoldVersion: "2.0.0"
---
## Project Overview

**Hortifast** é um sistema PWA (Progressive Web App) de catálogo e gestão de pedidos para vendedores de hortifruti. A aplicação permite que clientes naveguem pelo catálogo de produtos, adicionem itens ao carrinho e finalizem pedidos via WhatsApp. Vendedores podem gerenciar seus pedidos através de um dashboard administrativo intuitivo.

O sistema foi desenvolvido com foco em **experiência mobile-first**, funcionando tanto online quanto offline, ideal para vendedores ambulantes e pequenos comerciantes de hortifruti.

## Codebase Reference

> **Detailed Analysis**: For complete symbol counts, architecture layers, and dependency graphs, see [`codebase-map.json`](./codebase-map.json).

## Quick Facts

- **Root:** `/Users/danilo/WorkSpace /hortifast`
- **Languages:** TypeScript (66 .tsx + 13 .ts files)
- **Entry:** `src/main.tsx` → `src/App.tsx`
- **Total Files:** 99 arquivos
- **Full analysis:** [`codebase-map.json`](./codebase-map.json)

## Entry Points

- [`src/main.tsx`](../../src/main.tsx) - Ponto de entrada React, renderiza o App
- [`src/App.tsx`](../../src/App.tsx) - Componente raiz com providers e rotas
- [`index.html`](../../index.html) - HTML base com PWA metadata

## Key Exports

- `AuthProvider` - Provider de autenticação (src/hooks/useAuth.tsx)
- `useAuth` - Hook de autenticação
- `getProducts`, `getOrders`, `createOrderWithItems` - API functions (src/lib/api.ts)
- `cn` - Utility de class names (src/lib/utils.ts)
- Componentes shadcn-ui (src/components/ui/)

## File Structure & Code Organization

- `src/` — TypeScript source files
  - `components/` — Componentes React (5 custom + 49 shadcn-ui)
  - `pages/` — 9 páginas da aplicação
  - `hooks/` — 5 hooks customizados (auth, mobile, service-worker, toast)
  - `lib/` — Utilitários (api, types, utils, supabase client)
  - `data/` — Mock data para desenvolvimento
- `public/` — Assets estáticos, ícones PWA, manifest
- `scripts/` — Scripts auxiliares de automação
- `.context/` — Documentação e playbooks de agentes

## Technology Stack Summary

| Layer | Technology | Version |
| --- | --- | --- |
| **Runtime** | Node.js | 18+ |
| **Package Manager** | Bun / npm | - |
| **Build Tool** | Vite | 5.4 |
| **Language** | TypeScript | 5.8 |
| **Framework** | React | 18.3 |
| **Routing** | React Router DOM | 6.30 |
| **State/Cache** | TanStack Query | 5.83 |
| **UI Components** | shadcn-ui + Radix UI | Latest |
| **Styling** | Tailwind CSS | 3.4 |
| **Animations** | Framer Motion | 12.x |
| **Backend** | Supabase | PostgreSQL |
| **PWA** | Service Worker custom | - |

## Core Framework Stack

### Frontend (React + Vite)
- **React 18** com functional components e hooks
- **Vite 5** para bundling rápido e HMR
- **TypeScript** para type safety
- **TanStack Query** para server state management

### UI Layer
- **shadcn-ui** como component library (49 componentes)
- **Radix UI** primitives para acessibilidade
- **Tailwind CSS** para estilização utility-first
- **Framer Motion** para animações

### Backend (Supabase)
- **PostgreSQL** como banco de dados
- **Supabase Client** para comunicação
- **Row Level Security** (RLS) para autorização

## UI & Interaction Libraries

- **shadcn-ui** - Biblioteca de componentes baseada em Radix UI
- **Lucide React** - Ícones SVG
- **Sonner** - Toast notifications
- **Vaul** - Drawer component
- **React Day Picker** - Seletor de datas
- **Recharts** - Gráficos para o dashboard
- **cmdk** - Command palette

## Development Tools Overview

```bash
# Desenvolvimento
npm run dev      # Inicia servidor Vite com HMR

# Build
npm run build    # Build de produção
npm run preview  # Preview do build

# Qualidade
npm run lint     # ESLint
```

**IDE recomendada:** VS Code com extensões TypeScript, Tailwind CSS IntelliSense, ESLint

## Getting Started Checklist

1. **Clone o repositório:**
   ```bash
   git clone <repo-url>
   cd hortifast
   ```

2. **Instale as dependências:**
   ```bash
   npm install   # ou bun install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Edite .env com suas credenciais Supabase
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   - Abra http://localhost:5173 no navegador

## Next Steps

### Funcionalidades Atuais
- ✅ Seleção de vendedor
- ✅ Catálogo de produtos com categorias
- ✅ Carrinho de compras persistente
- ✅ Finalização de pedido
- ✅ Dashboard do vendedor
- ✅ PWA com suporte offline
- ✅ Integração WhatsApp para pedidos

### Próximas Implementações
- 🔲 Autenticação completa de vendedores
- 🔲 Painel admin para gestão de produtos
- 🔲 Notificações push de novos pedidos
- 🔲 Relatórios e analytics no dashboard
- 🔲 Múltiplos meios de pagamento

## Related Resources

- [architecture.md](./architecture.md) - Detalhes da arquitetura
- [development-workflow.md](./development-workflow.md) - Fluxo de desenvolvimento
- [tooling.md](./tooling.md) - Ferramentas e configurações
- [codebase-map.json](./codebase-map.json) - Mapa completo do codebase
