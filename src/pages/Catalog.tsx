import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CartBadge } from '@/components/CartBadge';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export default function Catalog() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleViewCart = () => {
    navigate('/cart', { state: { quantities } });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-foreground">HortiFruti Express</h1>
              <p className="text-xs text-muted-foreground">Produtos frescos</p>
            </div>
          </div>
          <CartBadge itemCount={totalItems} onClick={handleViewCart} />
        </div>
      </header>

      {/* Product List */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">Catálogo de Produtos</h2>
          
          <div className="space-y-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  quantity={quantities[product.id] || 0}
                  onQuantityChange={handleQuantityChange}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Bottom Action Bar */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg"
        >
          <div className="max-w-2xl mx-auto px-4 py-4">
            <Button
              onClick={handleViewCart}
              size="lg"
              className="w-full h-14 text-base font-semibold"
            >
              Ver Pedido ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
