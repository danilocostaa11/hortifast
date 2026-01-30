import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, MessageCircle, Loader, Filter } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CartBadge } from '@/components/CartBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { openWhatsApp, generateCatalogShareMessage } from '@/lib/utils';
import { getProducts, getVendor } from '@/lib/api';
import { Product, Vendor } from '@/lib/types';
import { Layout } from '@/components/layout/Layout';

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
    <Layout>
      <div className="pb-24">
        {/* Vendor Header Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              {vendor?.name || 'Catálogo de Produtos'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Selecione os produtos fresquinhos para sua casa.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleShareWhatsApp}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Compartilhar
            </Button>
            <CartBadge itemCount={totalItems} onClick={handleViewCart} />
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-md py-4 -mx-4 px-4 mb-6 border-b">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 bg-card"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    aria-label="Limpar busca"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => toggleCategory('vegetables')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategories.has('vegetables')
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted border'
                  }`}
              >
                <span>🥬</span> Verduras
              </button>
              <button
                onClick={() => toggleCategory('fruits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategories.has('fruits')
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted border'
                  }`}
              >
                <span>🍎</span> Frutas
              </button>
              <button
                onClick={() => toggleCategory('herbs')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategories.has('herbs')
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted border'
                  }`}
              >
                <span>🌿</span> Ervas
              </button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div>
          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <Loader className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando produtos...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <div className="space-y-12">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    Nenhum produto encontrado.
                  </p>
                </div>
              ) : (
                <>
                  {/* Verduras */}
                  {groupedProducts.vegetables.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                        <span className="text-2xl">🥬</span> Verduras e Legumes
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupedProducts.vegetables.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            quantity={quantities[product.id] || 0}
                            onQuantityChange={handleQuantityChange}
                          />
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Frutas */}
                  {groupedProducts.fruits.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                        <span className="text-2xl">🍎</span> Frutas Frescas
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupedProducts.fruits.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            quantity={quantities[product.id] || 0}
                            onQuantityChange={handleQuantityChange}
                          />
                        ))}
                      </div>
                    </motion.section>
                  )}

                  {/* Ervas */}
                  {groupedProducts.herbs.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                        <span className="text-2xl">🌿</span> Ervas e Temperos
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {groupedProducts.herbs.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            quantity={quantities[product.id] || 0}
                            onQuantityChange={handleQuantityChange}
                          />
                        ))}
                      </div>
                    </motion.section>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Floating Cart Button (Mobile Only/Always visible) */}
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-sm px-4"
          >
            <Button
              onClick={handleViewCart}
              size="lg"
              className="w-full h-14 rounded-full shadow-xl shadow-primary/20 text-base font-semibold flex items-center justify-between px-6"
            >
              <span>Ver Pedido</span>
              <span className="bg-primary-foreground/20 px-3 py-1 rounded-full text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'}
              </span>
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
