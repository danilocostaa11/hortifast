import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { createOrderWithItems } from '@/lib/api';

export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const quantities = (location.state?.quantities as Record<string, number>) || {};
  
  const [customerName, setCustomerName] = useState('');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedItems = Object.entries(quantities)
    .filter(([_, qty]) => qty > 0)
    .map(([productId, qty]) => ({
      productId,
      quantity: qty
    }));

  const totalPrice = selectedItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Nome é obrigatório';
    } else if (customerName.trim().length < 3) {
      newErrors.customerName = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (selectedItems.length === 0) {
      newErrors.items = 'Adicione pelo menos um item ao pedido';
    }

    if (observations.length > 500) {
      newErrors.observations = 'Observações não podem ter mais de 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Verifique os erros no formulário');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create order via API
      const orderId = await createOrderWithItems({
        customer_name: customerName.trim(),
        observations,
        items: selectedItems
      });

      if (!orderId) {
        throw new Error('Erro ao criar pedido');
      }

      toast.success('Pedido enviado com sucesso!');
      
      navigate('/confirmation', {
        state: {
          orderId,
          customerName: customerName.trim(),
          observations,
          items: selectedItems,
          totalPrice
        }
      });
    } catch (error) {
      toast.error('Erro ao enviar pedido. Tente novamente.');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Validation Errors */}
        {Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside text-sm">
                  {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>{message}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Success Message */}
        {selectedItems.length > 0 && Object.keys(errors).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Pedido pronto para enviar!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

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
                {errors.customerName && (
                  <span className="text-red-500 text-xs ml-1">({errors.customerName})</span>
                )}
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Digite seu nome"
                className={`mt-1.5 h-11 ${errors.customerName ? 'border-red-500' : ''}`}
              />
            </div>

            <div>
              <Label htmlFor="observations" className="text-sm font-medium">
                Observações ({observations.length}/500)
                {errors.observations && (
                  <span className="text-red-500 text-xs ml-1">({errors.observations})</span>
                )}
              </Label>
              <Textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Ex: preferência de entrega, produtos específicos..."
                className={`mt-1.5 min-h-[100px] resize-none ${errors.observations ? 'border-red-500' : ''}`}
                maxLength={500}
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
          {/* Total Price */}
          {selectedItems.length > 0 && (
            <div className="text-center py-2 border-b border-border">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-primary">
                R$ {totalPrice.toFixed(2)}
              </p>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedItems.length === 0 || Object.keys(errors).length > 0}
            size="lg"
            className="w-full h-14 text-base font-semibold gap-2"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Send className="h-5 w-5" />
                </motion.div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Enviar Pedido
              </>
            )}
          </Button>
          
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            Voltar e Editar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
