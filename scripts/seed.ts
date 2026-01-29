#!/usr/bin/env node

/**
 * Script de Seed - Popula dados de teste no Supabase
 * 
 * Uso:
 *   npm run seed
 * 
 * Variáveis de ambiente necessárias:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Erro: Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não configuradas");
  console.error("Verifique o arquivo .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================
// DADOS DO SEED
// ============================================

const vendors = [
  {
    id: "vendor-001",
    name: "HortiFruti Express",
    email: "contato@hortifruti.com",
    phone: "(11) 99999-9999",
    description: "Fornecedor premium de produtos frescos",
  },
  {
    id: "vendor-002",
    name: "Verduras Naturais",
    email: "vendas@verduras.com",
    phone: "(21) 98888-8888",
    description: "Produtos 100% orgânicos e frescos",
  },
  {
    id: "vendor-003",
    name: "Frutas da Estação",
    email: "info@frutas.com",
    phone: "(85) 97777-7777",
    description: "Melhor seleção de frutas da região",
  },
];

const products = [
  // Vendor 001 - Verduras
  { vendor_id: "vendor-001", name: "Tomate", category: "vegetables", unit: "kg", price: 8.9, image_emoji: "🍅" },
  { vendor_id: "vendor-001", name: "Alface", category: "vegetables", unit: "unidade", price: 3.5, image_emoji: "🥬" },
  { vendor_id: "vendor-001", name: "Cenoura", category: "vegetables", unit: "kg", price: 5.9, image_emoji: "🥕" },
  { vendor_id: "vendor-001", name: "Batata", category: "vegetables", unit: "kg", price: 4.5, image_emoji: "🥔" },
  { vendor_id: "vendor-001", name: "Cebola", category: "vegetables", unit: "kg", price: 6.9, image_emoji: "🧅" },
  { vendor_id: "vendor-001", name: "Brócolis", category: "vegetables", unit: "unidade", price: 7.9, image_emoji: "🥦" },
  { vendor_id: "vendor-001", name: "Abobrinha", category: "vegetables", unit: "kg", price: 6.5, image_emoji: "🥒" },
  
  // Vendor 001 - Frutas
  { vendor_id: "vendor-001", name: "Banana", category: "fruits", unit: "kg", price: 5.9, image_emoji: "🍌" },
  { vendor_id: "vendor-001", name: "Maçã", category: "fruits", unit: "kg", price: 9.9, image_emoji: "🍎" },
  { vendor_id: "vendor-001", name: "Laranja", category: "fruits", unit: "kg", price: 6.5, image_emoji: "🍊" },
  { vendor_id: "vendor-001", name: "Morango", category: "fruits", unit: "caixa", price: 12.9, image_emoji: "🍓" },
  
  // Vendor 001 - Ervas
  { vendor_id: "vendor-001", name: "Manjericão", category: "herbs", unit: "maço", price: 3.5, image_emoji: "🌿" },
  { vendor_id: "vendor-001", name: "Coentro", category: "herbs", unit: "maço", price: 2.9, image_emoji: "🌿" },
  { vendor_id: "vendor-001", name: "Salsinha", category: "herbs", unit: "maço", price: 2.5, image_emoji: "🌿" },
  
  // Vendor 002
  { vendor_id: "vendor-002", name: "Tomate Orgânico", category: "vegetables", unit: "kg", price: 12.9, image_emoji: "🍅" },
  { vendor_id: "vendor-002", name: "Alface Orgânica", category: "vegetables", unit: "unidade", price: 5.5, image_emoji: "🥬" },
  { vendor_id: "vendor-002", name: "Maçã Orgânica", category: "fruits", unit: "kg", price: 14.9, image_emoji: "🍎" },
  { vendor_id: "vendor-002", name: "Banana Orgânica", category: "fruits", unit: "kg", price: 8.9, image_emoji: "🍌" },
  
  // Vendor 003
  { vendor_id: "vendor-003", name: "Manga Premium", category: "fruits", unit: "kg", price: 11.9, image_emoji: "🥭" },
  { vendor_id: "vendor-003", name: "Uva", category: "fruits", unit: "kg", price: 14.9, image_emoji: "🍇" },
  { vendor_id: "vendor-003", name: "Pera", category: "fruits", unit: "kg", price: 11.9, image_emoji: "🍐" },
];

// ============================================
// FUNÇÕES DE SEED
// ============================================

async function seedVendors() {
  console.log("📦 Seeding vendors...");
  try {
    const { error } = await supabase
      .from("vendors")
      .upsert(vendors, { onConflict: "id" });
    
    if (error) throw error;
    console.log(`✅ ${vendors.length} vendors inseridos/atualizados`);
  } catch (error) {
    console.error("❌ Erro ao fazer seed de vendors:", error);
    throw error;
  }
}

async function seedProducts() {
  console.log("🥕 Seeding products...");
  try {
    const { error } = await supabase
      .from("products")
      .upsert(products, { onConflict: "id" });
    
    if (error) throw error;
    console.log(`✅ ${products.length} produtos inseridos/atualizados`);
  } catch (error) {
    console.error("❌ Erro ao fazer seed de produtos:", error);
    throw error;
  }
}

async function seedOrders() {
  console.log("📋 Seeding orders...");
  
  const orders = [
    {
      id: `ORD-${Date.now()}-001`,
      vendor_id: "vendor-001",
      customer_name: "Maria Silva",
      status: "ready",
      total_price: 35.7,
      observations: "Preferência por tomates maduros",
    },
    {
      id: `ORD-${Date.now()}-002`,
      vendor_id: "vendor-001",
      customer_name: "João Santos",
      status: "preparing",
      total_price: 48.3,
      observations: null,
    },
    {
      id: `ORD-${Date.now()}-003`,
      vendor_id: "vendor-001",
      customer_name: "Restaurante Sabor Verde",
      status: "ready",
      total_price: 125.8,
      observations: "Entrega antes das 14h",
    },
  ];
  
  try {
    const { error } = await supabase
      .from("orders")
      .insert(orders);
    
    if (error) throw error;
    console.log(`✅ ${orders.length} pedidos inseridos`);
  } catch (error) {
    console.error("❌ Erro ao fazer seed de pedidos:", error);
    // Não falhar se os pedidos já existem
    console.log("⚠️  Continuando mesmo com erro de pedidos...");
  }
}

// ============================================
// EXECUTAR SEED
// ============================================

async function main() {
  console.log("\n🌱 Iniciando seed do HortiFruti Express...\n");
  
  try {
    // Testar conexão
    console.log("🔗 Testando conexão com Supabase...");
    const { data, error } = await supabase
      .from("vendors")
      .select("count")
      .limit(1);
    
    if (error) {
      console.error("❌ Erro de conexão:", error.message);
      process.exit(1);
    }
    console.log("✅ Conectado ao Supabase\n");
    
    // Executar seed
    await seedVendors();
    await seedProducts();
    await seedOrders();
    
    console.log("\n✨ Seed concluído com sucesso!\n");
    console.log("📊 Próximos passos:");
    console.log("   1. Verificar dados em: https://app.supabase.com/project/_/editor");
    console.log("   2. Fazer login como vendedor em: http://localhost:5173");
    console.log("   3. Testar catálogo, carrinho e pedidos\n");
    
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro durante seed:", error);
    process.exit(1);
  }
}

main();
