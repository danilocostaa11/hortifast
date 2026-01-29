# 🍎 HortiFruti Express - Setup de Desenvolvimento

Guia completo para configurar o ambiente de desenvolvimento com Supabase e começar a usar o sistema.

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Setup Inicial](#setup-inicial)
3. [Configuração do Supabase](#configuração-do-supabase)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Executar Localmente](#executar-localmente)
6. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
7. [Autenticação](#autenticação)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

- **Node.js** 18+ ou **Bun** 1.0+
- **npm**, **yarn**, **pnpm** ou **bun** (gerenciador de pacotes)
- **Git**
- Conta no [Supabase](https://supabase.com) (gratuita)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 🚀 Setup Inicial

### 1. Clone o Repositório

```bash
git clone https://github.com/yumiacontato-lab/hortifast.git
cd hortifast
```

### 2. Instale as Dependências

**Com npm:**
```bash
npm install
```

**Com Bun:**
```bash
bun install
```

**Com yarn:**
```bash
yarn install
```

---

## 🌐 Configuração do Supabase

### Passo 1: Crie um Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados:
   - **Project Name**: `hortifast`
   - **Database Password**: Salve em local seguro!
   - **Region**: Escolha mais próximo de você
4. Aguarde criação (5-10 minutos)

### Passo 2: Obtenha as Chaves de API

1. Vá para **Settings > API**
2. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

### Passo 3: Crie as Tabelas no Supabase

Na seção **SQL Editor**, execute o script abaixo:

```sql
-- Vendors (Fornecedores)
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products (Produtos)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('vegetables', 'fruits', 'herbs')),
  unit TEXT NOT NULL,
  price DECIMAL(10, 2),
  image_emoji TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders (Pedidos)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'preparing', 'ready')),
  total_price DECIMAL(10, 2) DEFAULT 0,
  observations TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items (Itens do Pedido)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  unit TEXT NOT NULL,
  unit_price DECIMAL(10, 2) DEFAULT 0,
  subtotal DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX products_vendor_id_idx ON products(vendor_id);
CREATE INDEX orders_vendor_id_idx ON orders(vendor_id);
CREATE INDEX order_items_order_id_idx ON order_items(order_id);

-- RLS (Row Level Security) - Opcional mas recomendado
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
```

---

## 🔐 Variáveis de Ambiente

### 1. Copie o arquivo exemplo

```bash
cp .env.example .env.local
```

### 2. Preencha com seus dados

**`.env.local`:**
```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-public-aqui
```

**Encontre esses valores em:**
- Supabase Dashboard → Settings → API → URL e Keys

> ⚠️ **Importante**: Nunca commite `.env.local` no Git!

---

## 💻 Executar Localmente

### Modo Desenvolvimento (com Hot Reload)

**Com npm:**
```bash
npm run dev
```

**Com Bun:**
```bash
bun run dev
```

O servidor iniciará em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Pré-visualizar Build

```bash
npm run preview
```

---

## 🗄️ Estrutura do Banco de Dados

### Tabela: `vendors` (Fornecedores)
```
id (UUID)           - ID único do fornecedor
name (TEXT)         - Nome do negócio
email (TEXT)        - Email único
phone (TEXT)        - Telefone
description (TEXT)  - Descrição do negócio
created_at          - Data de criação
updated_at          - Data de atualização
```

### Tabela: `products` (Produtos)
```
id (UUID)           - ID único do produto
vendor_id (UUID)    - Referência ao vendor
name (TEXT)         - Nome do produto
category (TEXT)     - vegetables | fruits | herbs
unit (TEXT)         - kg, unidade, maço, caixa
price (DECIMAL)     - Preço em R$
image_emoji (TEXT)  - Emoji do produto
created_at          - Data de criação
updated_at          - Data de atualização
```

### Tabela: `orders` (Pedidos)
```
id (UUID)           - ID único do pedido
vendor_id (UUID)    - Qual vendor recebe
customer_name (TEXT)- Nome do cliente
status (TEXT)       - new | preparing | ready
total_price (DECIMAL)- Total do pedido
observations (TEXT) - Observações do cliente
created_at          - Data de criação
updated_at          - Data de atualização
```

### Tabela: `order_items` (Itens do Pedido)
```
id (UUID)           - ID único do item
order_id (UUID)     - Referência ao pedido
product_id (UUID)   - Referência ao produto
product_name (TEXT) - Nome do produto
quantity (DECIMAL)  - Quantidade pedida
unit (TEXT)         - Unidade
unit_price (DECIMAL)- Preço unitário
subtotal (DECIMAL)  - Total do item
created_at          - Data de criação
```

---

## 🔑 Autenticação

O sistema usa **Supabase Auth** com suporte a:
- Email/Senha para vendedores
- Sessões persistentes
- Proteção de rotas no Dashboard

### Fluxo de Autenticação

1. **Vendedor** acessa o dashboard
2. Faz **login** com email/senha
3. **AuthProvider** valida contra Supabase
4. Sessão é armazenada localmente
5. Acesso ao Dashboard é liberado com `user.id`

### Cadastrar Novo Vendedor

No **Supabase Auth**, vá para **Users** e clique **Add user** com email/senha.

---

## 📱 Funcionalidades Implementadas

### ✅ Fase 1 - UX Melhorada (Completa)
- [x] Busca e filtro de produtos por categoria
- [x] Impressão otimizada de pedidos
- [x] Compartilhamento via WhatsApp
- [x] Validação robusta de formulários
- [x] Página de instruções/onboarding

### ✅ Fase 2 - Backend Real (Completa)
- [x] Configuração Supabase
- [x] Autenticação de vendedor
- [x] Links exclusivos por vendedor (`/catalog/:vendorId`)
- [x] Migração de dados mock → API real

### ⏳ Fase 3 - PWA & Otimizações (Em Andamento)
- [ ] Transformar em PWA (Service Worker)
- [ ] Estatísticas no Dashboard
- [ ] SEO e meta tags

---

## 🌳 Inserir Dados de Teste

### 1. Adicionar Vendedor

No Supabase SQL Editor:
```sql
INSERT INTO vendors (id, name, email, phone, description)
VALUES (
  'vendor-001',
  'HortiFruti Express',
  'contato@hortifruti.com',
  '(11) 99999-9999',
  'Fornecedor de produtos frescos'
);
```

### 2. Adicionar Produtos

```sql
INSERT INTO products (vendor_id, name, category, unit, price, image_emoji)
VALUES 
  ('vendor-001', 'Tomate', 'vegetables', 'kg', 8.90, '🍅'),
  ('vendor-001', 'Alface', 'vegetables', 'unidade', 3.50, '🥬'),
  ('vendor-001', 'Banana', 'fruits', 'kg', 5.90, '🍌'),
  ('vendor-001', 'Morango', 'fruits', 'caixa', 12.90, '🍓'),
  ('vendor-001', 'Manjericão', 'herbs', 'maço', 3.50, '🌿');
```

---

## 🐛 Troubleshooting

### ❌ "Supabase not configured"
**Solução**: Certifique-se que `.env.local` está preenchido corretamente:
```bash
echo "VITE_SUPABASE_URL está configurado?"
grep VITE_SUPABASE_URL .env.local
```

### ❌ "Failed to fetch products"
**Solução**: 
1. Verifique se as tabelas existem no Supabase
2. Confirme que `vendor_id` existe na tabela `vendors`
3. Veja o console do navegador (F12) para mais detalhes

### ❌ "Cannot find module '@/...'"
**Solução**: Limpe node_modules e reinstale:
```bash
rm -rf node_modules
npm install
npm run dev
```

### ❌ Port 5173 já em uso
**Solução**: Use outra porta:
```bash
npm run dev -- --port 3000
```

---

## 📚 Recursos

- [Documentação Supabase](https://supabase.com/docs)
- [React Router v6](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

---

## 💬 Dúvidas?

Se tiver problemas, verifique:
1. Console do navegador (F12 → Console)
2. Terminal de desenvolvimento
3. Logs do Supabase (Dashboard → Logs)

---

**Última atualização**: 28 de novembro de 2025
