// Vendor/Supplier types
export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Product types
export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'herbs';
  unit: string;
  price: number;
  description?: string;
  image_emoji?: string;
  created_at: string;
  updated_at: string;
}

// Order types
export interface Order {
  id: string;
  vendor_id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  status: 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  total_price: number;
  observations?: string;
  created_at: string;
  updated_at: string;
}

// Order Item types
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
  created_at: string;
}

// Auth User type
export interface AuthUser {
  id: string;
  email: string;
  vendor_id?: string;
  role: 'client' | 'vendor' | 'admin';
  created_at: string;
}

// Cart Item (client-side only)
export interface CartItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
}
