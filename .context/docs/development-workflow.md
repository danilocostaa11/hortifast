---
type: doc
name: development-workflow
description: Branching rules, CI config, and contributing guidelines
category: workflow
generated: 2026-01-29
status: filled
scaffoldVersion: "2.0.0"
---

# Development Workflow

## Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js 18+ (recomendado: usar nvm)
- npm ou bun
- Git
- VS Code (recomendado)

### Setup Inicial

```bash
# Clone o repositório
git clone <repo-url>
cd hortifast

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

### Comandos Disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção |
| `npm run build:dev` | Build de desenvolvimento |
| `npm run preview` | Preview do build local |
| `npm run lint` | Verificação de código com ESLint |

## Branching Strategy

### Branches Principais
- `main` - Produção, sempre deployável
- `develop` - Desenvolvimento, integração de features

### Feature Branches
```
feature/<nome-descritivo>
bugfix/<issue-number>-<descricao>
hotfix/<descricao-curta>
```

### Workflow Padrão

```mermaid
gitgraph
    commit id: "main"
    branch develop
    checkout develop
    commit id: "feature base"
    branch feature/nova-funcionalidade
    checkout feature/nova-funcionalidade
    commit id: "impl"
    commit id: "tests"
    checkout develop
    merge feature/nova-funcionalidade
    checkout main
    merge develop tag: "v1.0.0"
```

## Commit Conventions

Seguimos Conventional Commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de código)
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção (deps, configs)

### Exemplos
```bash
feat(catalog): add product search filter
fix(cart): correct quantity calculation
docs(readme): update setup instructions
chore(deps): upgrade react-query to v5
```

## Code Review Process

### Checklist para PRs
- [ ] Código segue padrões do projeto
- [ ] TypeScript sem erros
- [ ] ESLint passou
- [ ] Funcionalidade testada manualmente
- [ ] Mobile responsivo
- [ ] Documentação atualizada (se necessário)

### Review Guidelines
1. Revisar lógica de negócio
2. Verificar tipagem TypeScript
3. Avaliar componentes shadcn-ui
4. Testar fluxos principais
5. Verificar performance

## Deploy Process

### Via Lovable.dev
1. Push para `main`
2. Lovable detecta automaticamente
3. Build é executado
4. Deploy para produção

### Manual (se necessário)
```bash
npm run build
# Deploy da pasta dist/
```

## IDE Configuration

### VS Code Extensions Recomendadas
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Error Lens
- Auto Rename Tag

### Settings (`.vscode/settings.json`)
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Troubleshooting

### Erro: Module not found
```bash
rm -rf node_modules
npm install
```

### Erro: Supabase connection
- Verificar `.env` com credenciais corretas
- Confirmar que o projeto Supabase está ativo

### Erro: Vite HMR não funciona
```bash
npm run dev -- --force
```

## Related Resources

- [project-overview.md](./project-overview.md)
- [tooling.md](./tooling.md)
- [testing-strategy.md](./testing-strategy.md)
