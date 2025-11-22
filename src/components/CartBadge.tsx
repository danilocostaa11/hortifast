import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartBadgeProps {
  itemCount: number;
  onClick: () => void;
}

export const CartBadge = ({ itemCount, onClick }: CartBadgeProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      size="icon"
      className="relative h-11 w-11"
      aria-label={`Ver pedido - ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
    >
      <ShoppingCart className="h-5 w-5" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0, y: -6, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};
