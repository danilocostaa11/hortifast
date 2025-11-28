import { supabase, isSupabaseConfigured } from './supabase';
import { Product, Order, OrderItem, Vendor } from './types';
import { products as mockProducts, mockOrders } from '@/data/mockData';

// ============== VENDOR OPERATIONS ==============

export async function getVendor(vendorId: string): Promise<Vendor | null> {
  if (!isSupabaseConfigured()) {
    // Fallback: return a mock vendor
    return {
      id: vendorId,
      name: 'HortiFruti Express',
      email: 'contato@hortifruti.com',
      phone: '(11) 9999-9999',
      description: 'Fornecedor de produtos frescos',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('id', vendorId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return null;
  }
}

export async function getAllVendors(): Promise<Vendor[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return [];
  }
}

// ============== PRODUCT OPERATIONS ==============

export async function getProducts(vendorId?: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    // Fallback: return mock products
    return mockProducts.map(p => ({
      id: p.id,
      vendor_id: vendorId || 'vendor-demo',
      name: p.name,
      category: p.category,
      unit: p.unit,
      price: p.price || 0,
      image_emoji: p.image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }

  try {
    let query = supabase.from('products').select('*');

    if (vendorId) {
      query = query.eq('vendor_id', vendorId);
    }

    const { data, error } = await query.order('category', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductsByCategory(
  category: 'vegetables' | 'fruits' | 'herbs',
  vendorId?: string
): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return getProducts(vendorId);
  }

  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('category', category);

    if (vendorId) {
      query = query.eq('vendor_id', vendorId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot create product.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
}

// ============== ORDER OPERATIONS ==============

export async function getOrders(vendorId: string): Promise<Order[]> {
  if (!isSupabaseConfigured()) {
    // Fallback: return mock orders
    return mockOrders.map(o => ({
      id: o.id,
      vendor_id: vendorId,
      customer_name: o.customerName,
      status: o.status,
      total_price: 0,
      observations: o.observations,
      created_at: o.date,
      updated_at: o.date
    }));
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (!isSupabaseConfigured()) {
    // Fallback: return mock order
    const mockOrder = mockOrders.find(o => o.id === orderId);
    if (!mockOrder) return null;

    return {
      id: mockOrder.id,
      vendor_id: 'vendor-demo',
      customer_name: mockOrder.customerName,
      status: mockOrder.status,
      total_price: 0,
      observations: mockOrder.observations,
      created_at: mockOrder.date,
      updated_at: mockOrder.date
    };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot create order.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot update order status.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

// ============== ORDER ITEM OPERATIONS ==============

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  if (!isSupabaseConfigured()) {
    // Fallback: return mock order items
    const mockOrder = mockOrders.find(o => o.id === orderId);
    if (!mockOrder) return [];

    return mockOrder.items.map((item, index) => ({
      id: `${orderId}-${index}`,
      order_id: orderId,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      unit: item.unit,
      unit_price: 0,
      subtotal: 0,
      created_at: new Date().toISOString()
    }));
  }

  try {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching order items:', error);
    return [];
  }
}

export async function createOrderItems(items: Omit<OrderItem, 'id' | 'created_at'>[]): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Cannot create order items.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('order_items')
      .insert(items);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating order items:', error);
    return false;
  }
}
