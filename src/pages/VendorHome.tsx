import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, ShoppingBag, ClipboardList, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function VendorHome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingBag,
      title: 'Catálogo Digital',
      description: 'Compartilhe seu catálogo com um link simples'
    },
    {
      icon: ClipboardList,
      title: 'Gestão de Pedidos',
      description: 'Organize e acompanhe todos os pedidos em um painel'
    },
    {
      icon: Sparkles,
      title: 'Sem Complicação',
      description: 'Seus clientes fazem pedidos sem precisar de app'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center px-4">
      <div className="max-w-4xl w-full py-12">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg">
              <Leaf className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            HortiFruti Express
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A forma mais simples de receber pedidos de hortifruti dos seus clientes
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="border-border hover:shadow-lg transition-shadow h-full">
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center mb-4 bg-primary/10 text-primary p-3 rounded-xl">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-base text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="h-14 px-8 text-base font-semibold"
          >
            Acessar Painel do Vendedor
          </Button>
          <Button
            onClick={() => navigate('/catalog/vendor-demo')}
            variant="outline"
            size="lg"
            className="h-14 px-8 text-base font-semibold"
          >
            Ver Catálogo de Exemplo
          </Button>
          <Button
            onClick={() => navigate('/instructions')}
            variant="ghost"
            size="lg"
            className="h-14 px-8 text-base font-semibold"
          >
            Como Usar
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Protótipo MVP • Dados simulados para demonstração
        </motion.p>
      </div>
    </div>
  );
}
