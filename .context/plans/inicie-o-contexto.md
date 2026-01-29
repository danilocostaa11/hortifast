---
status: filled
generated: 2026-01-29
project: hortifast
agents:
  - type: "frontend-specialist"
    role: "Design and implement user interfaces with React, shadcn-ui and Tailwind CSS"
  - type: "feature-developer"
    role: "Implement new features according to specifications"
  - type: "code-reviewer"
    role: "Review code changes for quality, style, and best practices"
  - type: "test-writer"
    role: "Write comprehensive unit and integration tests"
  - type: "performance-optimizer"
    role: "Identify performance bottlenecks"
  - type: "database-specialist"
    role: "Design and optimize database schemas with Supabase"
  - type: "mobile-specialist"
    role: "Optimize for PWA and mobile experience"
docs:
  - "project-overview.md"
  - "architecture.md"
  - "development-workflow.md"
  - "testing-strategy.md"
  - "glossary.md"
  - "data-flow.md"
  - "security.md"
  - "tooling.md"
phases:
  - id: "phase-1"
    name: "Discovery & Alignment"
    prevc: "P"
  - id: "phase-2"
    name: "Implementation & Iteration"
    prevc: "E"
  - id: "phase-3"
    name: "Validation & Handoff"
    prevc: "V"
---

# Hortifast - Sistema de Catálogo e Pedidos para Hortifruti

> **Hortifast** é um sistema PWA de catálogo e gestão de pedidos para vendedores de hortifruti, permitindo que clientes naveguem por produtos, adicionem ao carrinho e fechem pedidos via WhatsApp.

## Task Snapshot

- **Primary goal:** Desenvolver e manter uma aplicação web PWA para catálogo de produtos e gestão de pedidos de hortifruti, com integração seamless ao WhatsApp.
- **Success signal:** Clientes conseguem navegar no catálogo, adicionar produtos ao carrinho, e finalizar pedidos. Vendedores conseguem gerenciar pedidos através do dashboard.
- **Key references:**
  - [Documentation Index](../docs/README.md)
  - [Agent Handbook](../agents/README.md)
  - [Plans Index](./README.md)

## Codebase Context

### Visão Geral Técnica
- **Framework Frontend:** React 18 + Vite 5
- **Linguagem:** TypeScript 5.8
- **UI Library:** shadcn-ui + Radix UI
- **Estilização:** Tailwind CSS 3.4
- **State Management:** TanStack Query (React Query) 5
- **Roteamento:** React Router DOM 6.30
- **Backend:** Supabase (PostgreSQL)
- **Package Manager:** Bun / npm
- **PWA:** Service Worker customizado

### Estrutura de Arquivos
```
hortifast/
├── src/
│   ├── components/     # 54 componentes (5 custom + 49 shadcn-ui)
│   ├── pages/          # 9 páginas principais
│   ├── hooks/          # 5 hooks customizados
│   ├── lib/            # 4 utilitários (api, utils, types, supabase)
│   ├── data/           # Mock data
│   └── App.tsx         # Provider principal
├── public/             # Assets estáticos e PWA manifest
├── scripts/            # Scripts auxiliares
└── .context/           # Documentação do projeto
```

### Páginas Principais
| Página | Arquivo | Descrição |
| --- | --- | --- |
| Home do Vendedor | `VendorHome.tsx` | Seleção de vendedor |
| Catálogo | `Catalog.tsx` | Listagem de produtos por categoria |
| Carrinho | `Cart.tsx` | Gestão de itens no carrinho |
| Confirmação | `Confirmation.tsx` | Resumo e confirmação do pedido |
| Dashboard | `Dashboard.tsx` | Painel administrativo do vendedor |
| Detalhe do Pedido | `OrderDetail.tsx` | Visualização de pedido individual |
| Instruções | `Instructions.tsx` | Guia de uso do sistema |

### Interfaces de Dados Principais
| Interface | Localização | Descrição |
| --- | --- | --- |
| `Vendor` | `src/lib/types.ts:2` | Dados do vendedor |
| `Product` | `src/lib/types.ts:13` | Dados de produto |
| `Order` | `src/lib/types.ts:27` | Pedido completo |
| `OrderItem` | `src/lib/types.ts:41` | Item individual do pedido |
| `CartItem` | `src/lib/types.ts:63` | Item no carrinho |
| `AuthUser` | `src/lib/types.ts:54` | Usuário autenticado |

### API Functions (src/lib/api.ts)
- `getVendor()` - Buscar vendedor
- `getAllVendors()` - Listar todos vendedores
- `getProducts()` - Listar produtos
- `getProductsByCategory()` - Filtrar produtos por categoria
- `createProduct()` - Criar novo produto
- `getOrders()` - Listar pedidos
- `getOrderById()` - Buscar pedido específico
- `createOrder()` - Criar novo pedido
- `updateOrderStatus()` - Atualizar status do pedido
- `createOrderWithItems()` - Criar pedido com itens

## Agent Lineup
| Agent | Role in this plan | Playbook | First responsibility focus |
| --- | --- | --- | --- |
| Frontend Specialist | Responsável pela UI/UX do catálogo e dashboard | [Frontend Specialist](../agents/frontend-specialist.md) | Implementar interfaces responsivas com shadcn-ui |
| Feature Developer | Desenvolver novas funcionalidades de pedidos e catálogo | [Feature Developer](../agents/feature-developer.md) | Implementar fluxo de pedidos completo |
| Code Reviewer | Garantir qualidade e padrões de código | [Code Reviewer](../agents/code-reviewer.md) | Revisar PRs e manter consistência |
| Test Writer | Criar testes para garantir estabilidade | [Test Writer](../agents/test-writer.md) | Escrever testes unitários e de integração |
| Performance Optimizer | Otimizar loading e performance PWA | [Performance Optimizer](../agents/performance-optimizer.md) | Melhorar Core Web Vitals e cache |
| Database Specialist | Modelar e otimizar schema Supabase | [Database Specialist](../agents/database-specialist.md) | Design do banco de dados |
| Mobile Specialist | Garantir experiência mobile-first | [Mobile Specialist](../agents/mobile-specialist.md) | Otimizar PWA e responsividade |

## Documentation Touchpoints
| Guide | File | Primary Inputs |
| --- | --- | --- |
| Project Overview | [project-overview.md](../docs/project-overview.md) | Visão geral do sistema Hortifast |
| Architecture Notes | [architecture.md](../docs/architecture.md) | Arquitetura React + Supabase |
| Development Workflow | [development-workflow.md](../docs/development-workflow.md) | Fluxo de desenvolvimento local |
| Testing Strategy | [testing-strategy.md](../docs/testing-strategy.md) | Estratégia de testes |
| Glossary & Domain Concepts | [glossary.md](../docs/glossary.md) | Termos do domínio hortifruti |
| Data Flow & Integrations | [data-flow.md](../docs/data-flow.md) | Fluxo de dados React Query + Supabase |
| Security & Compliance Notes | [security.md](../docs/security.md) | Autenticação e segurança |
| Tooling & Productivity Guide | [tooling.md](../docs/tooling.md) | Ferramentas de desenvolvimento |

## Risk Assessment

### Identified Risks
| Risk | Probability | Impact | Mitigation Strategy | Owner |
| --- | --- | --- | --- | --- |
| Supabase Rate Limits | Low | Medium | Implementar cache local e otimizar queries | Backend Dev |
| PWA Cache Stale | Medium | Medium | Estratégia de cache-first com invalidação | Frontend Dev |
| WhatsApp API Changes | Low | High | Manter fallback para link manual | Feature Dev |
| Mobile Performance | Medium | High | Lazy loading e code splitting | Performance Optimizer |

### Dependencies
- **Internal:** Supabase project, WhatsApp Business (opcional)
- **External:** Lovable.dev para deploy, CDN para assets
- **Technical:** Node.js 18+, navegadores modernos com suporte a Service Workers

### Assumptions
- Schema do Supabase permanece estável durante desenvolvimento
- Produtos são gerenciados diretamente no Supabase (sem admin UI inicial)
- Pedidos são finalizados via WhatsApp (não há pagamento online)

## Resource Estimation

### Time Allocation
| Phase | Estimated Effort | Calendar Time | Team Size |
| --- | --- | --- | --- |
| Phase 1 - Discovery | 1 person-day | 1-2 days | 1 person |
| Phase 2 - Implementation | 3-5 person-days | 1 week | 1-2 people |
| Phase 3 - Validation | 1 person-day | 1-2 days | 1 person |
| **Total** | **5-7 person-days** | **~2 weeks** | **-** |

### Required Skills
- React + TypeScript avançado
- shadcn-ui e Tailwind CSS
- Supabase (PostgreSQL, Auth, Storage)
- PWA e Service Workers
- UX mobile-first

### Resource Availability
- **Available:** Desenvolvedor principal fullstack
- **Blocked:** N/A
- **Escalation:** Consultar documentação Supabase/React Query

## Working Phases

### Phase 1 — Discovery & Alignment
**Steps**
1. ✅ Análise da estrutura atual do projeto (concluído)
2. ✅ Mapeamento de componentes e páginas existentes
3. ✅ Identificação de interfaces de dados e APIs
4. Documentar requisitos pendentes com stakeholder

**Commit Checkpoint**
- Após completar esta fase, criar commit: `git commit -m "chore(plan): complete phase 1 discovery"`

### Phase 2 — Implementation & Iteration
**Steps**
1. Implementar features prioritárias conforme backlog
2. Garantir responsividade mobile em todas as páginas
3. Otimizar PWA para funcionamento offline
4. Integrar com Supabase para persistência de dados

**Commit Checkpoint**
- Criar commits por feature: `git commit -m "feat(catalog): implement product filtering"`

### Phase 3 — Validation & Handoff
**Steps**
1. Testes manuais em diferentes dispositivos
2. Verificar PWA score no Lighthouse
3. Documentar fluxos de uso para vendedores
4. Deploy para produção via Lovable

**Commit Checkpoint**
- Registro final: `git commit -m "chore(plan): complete phase 3 validation"`

## Rollback Plan

### Rollback Triggers
- Critical bugs em fluxo de pedidos
- Falha de integração com Supabase
- Performance degradation (LCP > 4s)
- Erros de carrinho ou perda de dados

### Rollback Procedures
#### Phase 1 Rollback
- Action: Descartar branch de discovery
- Data Impact: Nenhum
- Estimated Time: < 15 minutos

#### Phase 2 Rollback
- Action: `git revert` dos commits de feature
- Data Impact: Reverter migrations se houver
- Estimated Time: 1-2 horas

#### Phase 3 Rollback
- Action: Redeploy da versão anterior via Lovable
- Data Impact: Verificar consistência de pedidos
- Estimated Time: 30 minutos - 1 hora

### Post-Rollback Actions
1. Documentar razão do rollback
2. Notificar stakeholders
3. Agendar post-mortem
4. Atualizar plano com lições aprendidas

## Evidence & Follow-up

### Artefatos a Coletar
- Screenshots do catálogo e dashboard
- Lighthouse scores (Performance, PWA, Accessibility)
- Logs de testes de integração
- PRs e code reviews

### Follow-up Actions
| Action | Owner | Status |
| --- | --- | --- |
| Preencher documentação de projeto | Documentation Writer | Pendente |
| Configurar Supabase tables | Database Specialist | Pendente |
| Implementar testes e2e | Test Writer | Pendente |
| Otimizar imagens e assets | Performance Optimizer | Pendente |

---

## Quick Commands

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint
```

## Supabase Setup (Pendente)

As tabelas esperadas no Supabase são:
- `vendors` - Vendedores
- `products` - Produtos do catálogo
- `orders` - Pedidos realizados
- `order_items` - Itens de cada pedido

> **Nota:** Verificar arquivo `.env.example` para variáveis de ambiente necessárias.
