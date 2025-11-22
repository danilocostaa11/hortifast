import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, customerName } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate('/catalog/vendor-demo');
    }
  }, [orderId, navigate]);

  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
            />
            <CheckCircle2 className="h-24 w-24 text-primary relative" strokeWidth={2} />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Pedido Enviado!
          </h1>
          <p className="text-muted-foreground text-base">
            Seu pedido foi enviado com sucesso para o vendedor.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-lg p-6 mb-6 space-y-2"
        >
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Protocolo:</span>
            <span className="font-semibold text-foreground font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Cliente:</span>
            <span className="font-medium text-foreground">{customerName}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Horário:</span>
            <span className="font-medium text-foreground">{currentTime}</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate('/catalog/vendor-demo')}
            size="lg"
            className="w-full h-12 gap-2"
          >
            <Home className="h-4 w-4" />
            Voltar ao Catálogo
          </Button>
          
          <p className="text-xs text-muted-foreground">
            O vendedor receberá seu pedido e entrará em contato em breve
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
