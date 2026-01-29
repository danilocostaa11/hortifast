-- ============================================
-- SCRIPT DE SEED - HortiFruti Express
-- Popular dados de teste automaticamente
-- ============================================

-- Limpar dados existentes (opcional)
-- DELETE FROM order_items CASCADE;
-- DELETE FROM orders CASCADE;
-- DELETE FROM products CASCADE;
-- DELETE FROM vendors CASCADE;

-- ============================================
-- 1. INSERIR VENDORS (FORNECEDORES)
-- ============================================

INSERT INTO vendors (id, name, email, phone, description)
VALUES 
  ('vendor-001', 'HortiFruti Express', 'contato@hortifruti.com', '(11) 99999-9999', 'Fornecedor premium de produtos frescos'),
  ('vendor-002', 'Verduras Naturais', 'vendas@verduras.com', '(21) 98888-8888', 'Produtos 100% orgânicos e frescos'),
  ('vendor-003', 'Frutas da Estação', 'info@frutas.com', '(85) 97777-7777', 'Melhor seleção de frutas da região')
ON CONFLICT DO NOTHING;

-- ============================================
-- 2. INSERIR PRODUTOS - VERDURAS
-- ============================================

INSERT INTO products (vendor_id, name, category, unit, price, image_emoji)
VALUES 
  -- Vendor 001 - Verduras
  ('vendor-001', 'Tomate', 'vegetables', 'kg', 8.90, '🍅'),
  ('vendor-001', 'Alface', 'vegetables', 'unidade', 3.50, '🥬'),
  ('vendor-001', 'Cenoura', 'vegetables', 'kg', 5.90, '🥕'),
  ('vendor-001', 'Batata', 'vegetables', 'kg', 4.50, '🥔'),
  ('vendor-001', 'Cebola', 'vegetables', 'kg', 6.90, '🧅'),
  ('vendor-001', 'Brócolis', 'vegetables', 'unidade', 7.90, '🥦'),
  ('vendor-001', 'Abobrinha', 'vegetables', 'kg', 6.50, '🥒'),
  ('vendor-001', 'Berinjela', 'vegetables', 'kg', 7.90, '🍆'),
  ('vendor-001', 'Beterraba', 'vegetables', 'kg', 5.50, '🥕'),
  ('vendor-001', 'Chuchu', 'vegetables', 'kg', 3.90, '🥒'),
  
  -- Vendor 002 - Verduras Orgânicas
  ('vendor-002', 'Tomate Orgânico', 'vegetables', 'kg', 12.90, '🍅'),
  ('vendor-002', 'Alface Orgânica', 'vegetables', 'unidade', 5.50, '🥬'),
  ('vendor-002', 'Couve Orgânica', 'vegetables', 'maço', 4.50, '🥬'),
  ('vendor-002', 'Espinafre Orgânico', 'vegetables', 'maço', 6.50, '🥬'),
  
  -- Vendor 003 - Verduras Fresquinhas
  ('vendor-003', 'Pepino Fresco', 'vegetables', 'kg', 5.90, '🥒'),
  ('vendor-003', 'Pimentão Verde', 'vegetables', 'kg', 9.90, '🫑'),
  ('vendor-003', 'Pimentão Vermelho', 'vegetables', 'kg', 11.90, '🫑')
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. INSERIR PRODUTOS - FRUTAS
-- ============================================

INSERT INTO products (vendor_id, name, category, unit, price, image_emoji)
VALUES 
  -- Vendor 001 - Frutas
  ('vendor-001', 'Banana', 'fruits', 'kg', 5.90, '🍌'),
  ('vendor-001', 'Maçã', 'fruits', 'kg', 9.90, '🍎'),
  ('vendor-001', 'Laranja', 'fruits', 'kg', 6.50, '🍊'),
  ('vendor-001', 'Morango', 'fruits', 'caixa', 12.90, '🍓'),
  ('vendor-001', 'Abacate', 'fruits', 'kg', 11.90, '🥑'),
  ('vendor-001', 'Limão', 'fruits', 'kg', 4.90, '🍋'),
  ('vendor-001', 'Abacaxi', 'fruits', 'unidade', 8.90, '🍍'),
  ('vendor-001', 'Melancia', 'fruits', 'kg', 3.90, '🍉'),
  ('vendor-001', 'Melão', 'fruits', 'kg', 5.90, '🍈'),
  
  -- Vendor 002 - Frutas Orgânicas
  ('vendor-002', 'Maçã Orgânica', 'fruits', 'kg', 14.90, '🍎'),
  ('vendor-002', 'Banana Orgânica', 'fruits', 'kg', 8.90, '🍌'),
  ('vendor-002', 'Morango Orgânico', 'fruits', 'caixa', 18.90, '🍓'),
  
  -- Vendor 003 - Frutas Premium
  ('vendor-003', 'Manga Premium', 'fruits', 'kg', 11.90, '🥭'),
  ('vendor-003', 'Uva', 'fruits', 'kg', 14.90, '🍇'),
  ('vendor-003', 'Pera', 'fruits', 'kg', 11.90, '🍐'),
  ('vendor-003', 'Pêssego', 'fruits', 'kg', 13.90, '🍑')
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. INSERIR PRODUTOS - ERVAS
-- ============================================

INSERT INTO products (vendor_id, name, category, unit, price, image_emoji)
VALUES 
  -- Vendor 001 - Ervas
  ('vendor-001', 'Manjericão', 'herbs', 'maço', 3.50, '🌿'),
  ('vendor-001', 'Coentro', 'herbs', 'maço', 2.90, '🌿'),
  ('vendor-001', 'Salsinha', 'herbs', 'maço', 2.50, '🌿'),
  ('vendor-001', 'Alecrim', 'herbs', 'maço', 3.90, '🌿'),
  ('vendor-001', 'Cebolinha', 'herbs', 'maço', 2.90, '🌿'),
  ('vendor-001', 'Hortelã', 'herbs', 'maço', 3.50, '🌿'),
  ('vendor-001', 'Orégano', 'herbs', 'maço', 4.50, '🌿'),
  
  -- Vendor 002 - Ervas Orgânicas
  ('vendor-002', 'Manjericão Orgânico', 'herbs', 'maço', 5.50, '🌿'),
  ('vendor-002', 'Hortelã Orgânica', 'herbs', 'maço', 5.50, '🌿'),
  
  -- Vendor 003 - Ervas Frescas
  ('vendor-003', 'Alecrim Fresco', 'herbs', 'maço', 4.90, '🌿'),
  ('vendor-003', 'Sálvia Fresca', 'herbs', 'maço', 4.50, '🌿')
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. INSERIR PEDIDOS DE TESTE
-- ============================================

INSERT INTO orders (id, vendor_id, customer_name, status, total_price, observations)
VALUES 
  ('ORD-001', 'vendor-001', 'Maria Silva', 'ready', 35.70, 'Preferência por tomates maduros'),
  ('ORD-002', 'vendor-001', 'João Santos', 'preparing', 48.30, NULL),
  ('ORD-003', 'vendor-001', 'Restaurante Sabor Verde', 'ready', 125.80, 'Entrega antes das 14h, por favor'),
  ('ORD-004', 'vendor-001', 'Ana Costa', 'new', 42.50, 'Cliente VIP - confirmar antes de entregar'),
  ('ORD-005', 'vendor-002', 'Carlos Oliveira', 'ready', 67.20, 'Produtos 100% orgânicos certificados'),
  ('ORD-006', 'vendor-003', 'Supermercado Central', 'preparing', 189.90, NULL)
ON CONFLICT DO NOTHING;

-- ============================================
-- 6. INSERIR ITENS DOS PEDIDOS
-- ============================================

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit, unit_price, subtotal)
VALUES 
  -- Pedido 001
  ('ORD-001', 'prod-001', 'Tomate', 3, 'kg', 8.90, 26.70),
  ('ORD-001', 'prod-002', 'Alface', 1, 'unidade', 3.50, 3.50),
  ('ORD-001', 'prod-019', 'Banana', 2, 'kg', 5.90, 11.80),
  
  -- Pedido 002
  ('ORD-002', 'prod-003', 'Cenoura', 2, 'kg', 5.90, 11.80),
  ('ORD-002', 'prod-004', 'Batata', 5, 'kg', 4.50, 22.50),
  ('ORD-002', 'prod-005', 'Cebola', 3, 'kg', 6.90, 20.70),
  
  -- Pedido 003
  ('ORD-003', 'prod-001', 'Tomate', 10, 'kg', 8.90, 89.00),
  ('ORD-003', 'prod-002', 'Alface', 8, 'unidade', 3.50, 28.00),
  ('ORD-003', 'prod-006', 'Brócolis', 5, 'unidade', 7.90, 39.50),
  
  -- Pedido 004
  ('ORD-004', 'prod-009', 'Laranja', 4, 'kg', 6.50, 26.00),
  ('ORD-004', 'prod-010', 'Morango', 2, 'caixa', 12.90, 25.80),
  
  -- Pedido 005
  ('ORD-005', 'prod-011', 'Tomate Orgânico', 5, 'kg', 12.90, 64.50),
  ('ORD-005', 'prod-012', 'Alface Orgânica', 3, 'unidade', 5.50, 16.50),
  
  -- Pedido 006
  ('ORD-006', 'prod-028', 'Manga Premium', 8, 'kg', 11.90, 95.20),
  ('ORD-006', 'prod-029', 'Uva', 10, 'kg', 14.90, 149.00)
ON CONFLICT DO NOTHING;

-- ============================================
-- 7. VERIFICAR DADOS INSERIDOS
-- ============================================

SELECT 'Vendors' as categoria, COUNT(*) as total FROM vendors
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Order Items', COUNT(*) FROM order_items;

-- ============================================
-- DADOS INSERIDOS COM SUCESSO!
-- ============================================
