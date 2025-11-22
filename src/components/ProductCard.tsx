import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, newQuantity: number) => void;
}

export const ProductCard = ({ product, quantity, onQuantityChange }: ProductCardProps) => {
  const handleIncrement = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
    >
      {/* Product Image/Emoji */}
      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-4xl bg-accent rounded-lg">
        {product.image}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.unit}</p>
        {product.price && (
          <p className="text-sm font-medium text-primary mt-0.5">
            R$ {product.price.toFixed(2)}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 ml-auto">
        {quantity === 0 ? (
          <Button
            onClick={handleIncrement}
            size="lg"
            className="h-11 px-6 font-medium"
            aria-label={`Adicionar ${product.name}`}
          >
            Adicionar
          </Button>
        ) : (
          <div className="flex items-center gap-2 bg-accent rounded-lg p-1">
            <Button
              onClick={handleDecrement}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-md hover:bg-background"
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <motion.span
              key={quantity}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-semibold text-base w-8 text-center text-foreground"
              aria-live="polite"
              aria-atomic="true"
            >
              {quantity}
            </motion.span>
            
            <Button
              onClick={handleIncrement}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-md hover:bg-background"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
