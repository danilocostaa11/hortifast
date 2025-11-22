import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { products } from '@/data/mockData';
import { toast } from 'sonner';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const quantities = (location.state?.quantities as Record<string, number>) || {};
  
  const [customerName, setCustomerName] = useState('');
  const [observations, setObservations] = useState('');

  const selectedItems = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([productId, qty]) => {
      const product = products.find(p => p.id === productId);
      return { product, quantity: qty };
    })
    .filter(item => item.product);

  const handleSubmit = () => {
    if (!customerName.trim()) {
      toast.error('Por favor, informe seu nome');
      return;
    }

    if (selectedItems.length === 0) {
      toast.error('Adicione pelo menos um item ao pedido');
      return;
    }

    // Simulate order submission
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    navigate('/confirmation', {
      state: {
        orderId,
        customerName,
        observations,
        items: selectedItems
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.26 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Resumo do Pedido</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-32">
        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-5 mb-6"
        >
          <h2 className="font-semibold text-base text-foreground mb-4">Suas Informações</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName" className="text-sm font-medium">
                Nome *
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Digite seu nome"
                className="mt-1.5 h-11"
              />
            </div>

            <div>
              <Label htmlFor="observations" className="text-sm font-medium">
                Observações
              </Label>
              <Textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ex: preferência de entrega, produtos específicos..."
                className="mt-1.5 min-h-[100px] resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-lg border border-border p-5"
        >
          <h2 className="font-semibold text-base text-foreground mb-4">
            Itens do Pedido ({selectedItems.length})
          </h2>
          
          <div className="space-y-3">
            {selectedItems.map(({ product, quantity }) => (
              <div
                key={product!.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{product!.image}</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">{product!.name}</p>
                    <p className="text-xs text-muted-foreground">{product!.unit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">
                    {quantity}x
                  </p>
                  {product!.price && (
                    <p className="text-xs text-muted-foreground">
                      R$ {(product!.price * quantity).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-3">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full h-14 text-base font-semibold gap-2"
          >
            <Send className="h-5 w-5" />
            Enviar Pedido
          </Button>
          
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            Voltar e Editar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
