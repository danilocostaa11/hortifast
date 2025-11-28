import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Search, X, MessageCircle, Loader } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CartBadge } from '@/components/CartBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { openWhatsApp, generateCatalogShareMessage } from '@/lib/utils';
import { getProducts, getVendor } from '@/lib/api';
import { Product, Vendor } from '@/lib/types';

export default function Catalog() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(['vegetables', 'fruits', 'herbs'])
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products and vendor on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch vendor data
        if (vendorId) {
          const vendorData = await getVendor(vendorId);
          if (!vendorData) {
            setError('Vendedor não encontrado');
            setLoading(false);
            return;
          }
          setVendor(vendorData);
        }

        // Fetch products
        const productsData = await getProducts(vendorId);
        setProducts(productsData);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [vendorId]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const toggleCategory = (category: string) => {
    const newCategories = new Set(activeCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setActiveCategories(newCategories);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategories.has(product.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategories]);

  // Group filtered products by category
  const groupedProducts = useMemo(() => {
    return {
      vegetables: filteredProducts.filter(p => p.category === 'vegetables'),
      fruits: filteredProducts.filter(p => p.category === 'fruits'),
      herbs: filteredProducts.filter(p => p.category === 'herbs')
    };
  }, [filteredProducts]);

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleViewCart = () => {
    navigate('/cart', { state: { quantities } });
  };

  const handleShareWhatsApp = () => {
    const message = generateCatalogShareMessage('HortiFruti Express', vendorId || 'geral');
    openWhatsApp(message);
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
              <h1 className="font-semibold text-lg text-foreground">
                {vendor?.name || 'HortiFruti Express'}
              </h1>
              <p className="text-xs text-muted-foreground">Produtos frescos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleShareWhatsApp}
              variant="ghost"
              size="icon"
              className="text-green-600 hover:text-green-700 hover:bg-green-100"
              title="Compartilhar via WhatsApp"
              disabled={loading}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <CartBadge itemCount={totalItems} onClick={handleViewCart} />
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="sticky top-[72px] z-9 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => toggleCategory('vegetables')}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategories.has('vegetables')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              🥬 Verduras
            </button>
            <button
              onClick={() => toggleCategory('fruits')}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategories.has('fruits')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              🍎 Frutas
            </button>
            <button
              onClick={() => toggleCategory('herbs')}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeCategories.has('herbs')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              🌿 Ervas
            </button>
          </div>

          {/* Results Count */}
          {searchQuery && (
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Product List */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Loader className="h-8 w-8 text-primary" />
            </motion.div>
            <p className="text-muted-foreground mt-4">Carregando produtos...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
          </motion.div>
        )}

        {/* Content State */}
        {!loading && !error && filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              {searchQuery
                ? 'Nenhum produto encontrado com esse nome'
                : 'Selecione uma categoria para ver os produtos'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Verduras e Legumes */}
            {groupedProducts.vegetables.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">🥬</span>
                  Verduras e Legumes
                </h3>
                <div className="space-y-3">
                  {groupedProducts.vegetables.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        quantity={quantities[product.id] || 0}
                        onQuantityChange={handleQuantityChange}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Frutas */}
            {groupedProducts.fruits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">🍎</span>
                  Frutas
                </h3>
                <div className="space-y-3">
                  {groupedProducts.fruits.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        quantity={quantities[product.id] || 0}
                        onQuantityChange={handleQuantityChange}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Ervas e Temperos */}
            {groupedProducts.herbs.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">🌿</span>
                  Ervas e Temperos
                </h3>
                <div className="space-y-3">
                  {groupedProducts.herbs.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                    >
                      <ProductCard
                        product={product}
                        quantity={quantities[product.id] || 0}
                        onQuantityChange={handleQuantityChange}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
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
