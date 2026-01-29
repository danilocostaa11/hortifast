---
type: doc
name: testing-strategy
description: Test configs, CI gates, and testing approach
category: testing
generated: 2026-01-29
status: filled
scaffoldVersion: "2.0.0"
---

# Testing Strategy

## Visão Geral

O projeto atualmente não possui testes automatizados implementados. Este documento define a estratégia de testes recomendada para garantir qualidade e estabilidade.

## Níveis de Teste

### 1. Testes Unitários
**Ferramentas recomendadas:** Vitest + React Testing Library

**Escopo:**
- Funções utilitárias (`src/lib/utils.ts`)
- Hooks customizados (`src/hooks/`)
- Lógica de negócio

**Exemplo:**
```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });
});
```

### 2. Testes de Componentes
**Ferramentas:** Vitest + React Testing Library + jsdom

**Escopo:**
- Componentes de UI isolados
- Interações do usuário
- Estados visuais

**Exemplo:**
```typescript
// src/components/ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
```

### 3. Testes de Integração
**Ferramentas:** Vitest + MSW (Mock Service Worker)

**Escopo:**
- Fluxos entre componentes
- Integração com React Query
- Mock de API Supabase

### 4. Testes E2E
**Ferramentas recomendadas:** Playwright

**Escopo:**
- Fluxos críticos de usuário
- Navegação completa
- Testes cross-browser

**Fluxos prioritários:**
1. Selecionar vendedor → Ver catálogo
2. Adicionar produtos → Finalizar pedido
3. Dashboard do vendedor

## Setup Recomendado

### Instalar dependências
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @playwright/test
```

### Configuração Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

### Setup File
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
```

## Cobertura de Código

### Metas
| Métrica | Meta Inicial | Meta Ideal |
| --- | --- | --- |
| Statements | 30% | 70% |
| Branches | 25% | 60% |
| Functions | 40% | 75% |
| Lines | 30% | 70% |

### Comando
```bash
npm run test -- --coverage
```

## Testes Prioritários

### Alta Prioridade
- [ ] `src/lib/api.ts` - Funções de API
- [ ] `src/lib/utils.ts` - Utilitários
- [ ] `src/hooks/useAuth.tsx` - Autenticação
- [ ] `Cart.tsx` - Lógica de carrinho

### Média Prioridade
- [ ] `ProductCard.tsx` - Renderização
- [ ] `Catalog.tsx` - Filtros e listagem
- [ ] `Dashboard.tsx` - Métricas

### Baixa Prioridade
- [ ] Componentes shadcn-ui (já testados)
- [ ] Páginas estáticas

## CI/CD Integration (Futuro)

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test
```

### Gates
- ✅ Lint passa
- ✅ TypeScript compila
- ✅ Testes passam
- ✅ Cobertura mínima

## Manual Testing Checklist

### Antes de Deploy
- [ ] Navegação entre páginas
- [ ] Adicionar/remover do carrinho
- [ ] Finalização de pedido
- [ ] Responsividade mobile
- [ ] PWA install prompt
- [ ] Offline mode

### Browsers
- [ ] Chrome (Desktop/Mobile)
- [ ] Safari (Desktop/iOS)
- [ ] Firefox
- [ ] Edge

## Known Flaky Tests

(Nenhum identificado ainda - projeto sem testes)

## Related Resources

- [development-workflow.md](./development-workflow.md)
- [tooling.md](./tooling.md)
