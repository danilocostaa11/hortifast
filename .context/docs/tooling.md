---
type: doc
name: tooling
description: CLI scripts, IDE configs, and automation workflows
category: tooling
generated: 2026-01-29
status: filled
scaffoldVersion: "2.0.0"
---

# Tooling & Productivity Guide

## Stack de Ferramentas

### Build & Development
| Tool | Version | Purpose |
| --- | --- | --- |
| **Vite** | 5.4 | Build tool com HMR ultra-rápido |
| **TypeScript** | 5.8 | Type checking |
| **ESLint** | 9.x | Linting de código |
| **PostCSS** | 8.x | Processamento CSS |
| **Autoprefixer** | 10.x | Vendor prefixes automáticos |

### Package Management
| Tool | Purpose |
| --- | --- |
| **npm** | Gerenciador de pacotes padrão |
| **bun** | Alternativa mais rápida (opcional) |

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor dev na porta 5173

# Build
npm run build         # Build de produção
npm run build:dev     # Build de desenvolvimento
npm run preview       # Preview do build local

# Qualidade
npm run lint          # Executa ESLint
```

## Configurações do Projeto

### Vite (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind (`tailwind.config.ts`)
- Design tokens customizados
- Plugin de tipografia
- Plugin de animações

### shadcn-ui (`components.json`)
```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## VS Code Configuration

### Extensões Recomendadas
```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "usernamehw.errorlens"
  ]
}
```

### Settings
```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

## Adicionando Componentes shadcn-ui

```bash
# Adicionar um novo componente
npx shadcn-ui@latest add <component-name>

# Exemplos
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

## Path Aliases

O projeto usa `@/` como alias para `src/`:

```typescript
// Em vez de
import { Button } from '../../../components/ui/button';

// Use
import { Button } from '@/components/ui/button';
```

## Scripts Auxiliares

### Pasta `scripts/`
- Scripts de automação
- Geradores de código
- Utilitários de desenvolvimento

## Debugging

### React Developer Tools
- Instale a extensão do browser
- Inspecione componentes e estado

### React Query Devtools
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Adicione no App.tsx (dev only)
<ReactQueryDevtools initialIsOpen={false} />
```

### Network Debugging
- Use a aba Network do DevTools
- Monitore chamadas ao Supabase
- Verifique cache do Service Worker

## Performance Profiling

```bash
# Build com análise
npm run build -- --mode production
```

### Lighthouse
1. Abra DevTools
2. Aba Lighthouse
3. Execute auditoria Mobile
4. Foco em PWA e Performance

## Environment Variables

### `.env.example`
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Uso no código
```typescript
const url = import.meta.env.VITE_SUPABASE_URL;
```

## Related Resources

- [development-workflow.md](./development-workflow.md)
- [architecture.md](./architecture.md)
- [project-overview.md](./project-overview.md)
