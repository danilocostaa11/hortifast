import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ClipboardList, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

export default function VendorHome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: ShoppingBag,
      title: 'Catálogo Digital',
      description: 'Crie um catálogo bonito e compartilhe o link direto com seus clientes.'
    },
    {
      icon: ClipboardList,
      title: 'Gestão Simplificada',
      description: 'Receba e organize pedidos em um único painel intuitivo.'
    },
    {
      icon: Sparkles,
      title: 'Experiência Premium',
      description: 'Seus clientes vão adorar fazer pedidos sem precisar baixar apps.'
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl py-12 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
              Simples. Elegante. Eficiente.
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              Transforme suas vendas de <span className="text-primary italic">Hortifruti</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed font-sans font-light">
              Receba pedidos online de forma organizada, profissionalize seu negócio e encante seus clientes com uma experiência de compra moderna.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                Acessar Painel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => navigate('/catalog/vendor-demo')}
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base rounded-full hover:bg-secondary/50"
              >
                Ver Exemplo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Proof / Trust Section */}
        <section className="w-full max-w-4xl py-12 text-center">
          <div className="bg-white/60 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-border/50">
            <h2 className="font-serif text-3xl font-bold mb-8">Por que escolher o HortiFruti Express?</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                "Sem taxas por pedido",
                "Link exclusivo para sua loja",
                "Atualização de estoque em tempo real",
                "Suporte dedicado via WhatsApp"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
