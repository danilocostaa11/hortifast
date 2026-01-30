import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Home, ShoppingCart, FileText, Users, Zap, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';

export default function Instructions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('client');

  const clientSteps = [
    {
      icon: ShoppingCart,
      title: 'Busque Produtos',
      description: 'Use a barra de busca ou filtros por categoria para encontrar os produtos que deseja'
    },
    {
      icon: Users,
      title: 'Selecione Quantidades',
      description: 'Escolha as quantidades desejadas de cada produto. O carrinho será atualizado em tempo real'
    },
    {
      icon: FileText,
      title: 'Preencha seu Pedido',
      description: 'Informe seu nome e observações (preferências de entrega, etc) e envie para o vendedor'
    },
    {
      icon: Check,
      title: 'Confirmação',
      description: 'Receba um protocolo do pedido e compartilhe via WhatsApp se necessário'
    }
  ];

  const vendorSteps = [
    {
      icon: Home,
      title: 'Acesse o Painel',
      description: 'Faça login no painel do vendedor para gerenciar seus pedidos'
    },
    {
      icon: FileText,
      title: 'Veja Novos Pedidos',
      description: 'Todos os pedidos aparecem em tempo real com detalhes do cliente e itens'
    },
    {
      icon: Zap,
      title: 'Atualize Status',
      description: 'Marque pedidos como "Em Preparação" ou "Separado" conforme você processa'
    },
    {
      icon: ShoppingCart,
      title: 'Imprima ou Compartilhe',
      description: 'Use o botão de impressão ou WhatsApp para se comunicar com clientes'
    }
  ];

  const StepCard = ({ icon: Icon, title, description, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="text-3xl font-bold text-primary/20">{index + 1}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">HortiFruti Express</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua plataforma de compra e venda de produtos frescos. Abaixo você encontra as instruções passo a passo para usar o sistema como cliente ou vendedor.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="client">🛍️ Para Clientes</TabsTrigger>
            <TabsTrigger value="vendor">🏪 Para Vendedores</TabsTrigger>
          </TabsList>

          {/* Client Instructions */}
          <TabsContent value="client" className="space-y-6 mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Como Fazer um Pedido</h3>
              <p className="text-muted-foreground">Siga os passos abaixo para criar seu primeiro pedido</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {clientSteps.map((step, index) => (
                <StepCard key={index} {...step} index={index} />
              ))}
            </div>

            {/* Features */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>✨ Recursos Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Busca e Filtros</p>
                    <p className="text-sm text-muted-foreground">Procure por nome ou filtre por categoria (Verduras, Frutas, Ervas)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Compartilhar via WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Compartilhe o link do catálogo ou detalhes do pedido via WhatsApp Web</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Acompanhamento de Pedido</p>
                    <p className="text-sm text-muted-foreground">Cada pedido recebe um protocolo único para rastreamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendor Instructions */}
          <TabsContent value="vendor" className="space-y-6 mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Como Gerenciar Pedidos</h3>
              <p className="text-muted-foreground">Use o painel para visualizar e processar pedidos</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {vendorSteps.map((step, index) => (
                <StepCard key={index} {...step} index={index} />
              ))}
            </div>

            {/* Dashboard Features */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>📊 Funcionalidades do Painel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Visualização de Pedidos</p>
                    <p className="text-sm text-muted-foreground">Veja todos os pedidos recebidos em tempo real com status atualizado</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Gerenciamento de Status</p>
                    <p className="text-sm text-muted-foreground">Atualize o status de cada pedido para manter clientes informados</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Impressão de Pedidos</p>
                    <p className="text-sm text-muted-foreground">Imprima pedidos para usar como guia de separação com estilos otimizados</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Compartilhamento via WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Comunique-se rapidamente com clientes usando WhatsApp Web integrado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-900">💡 Dicas Úteis</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-800 space-y-2 text-sm">
                <p>• Atualize os status dos pedidos regularmente para manter clientes informados</p>
                <p>• Use a função de impressão para gerar listas de separação otimizadas para papel</p>
                <p>• Compartilhe via WhatsApp para comunicação mais rápida e direta</p>
                <p>• Adicione observações nos pedidos para lembrar detalhes importantes (alergias, preferências, etc)</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-8 border-t border-border"
        >
          <p className="text-muted-foreground mb-4">Pronto para começar?</p>
          <Button
            onClick={() => navigate(-1)}
            size="lg"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Voltar e Começar
          </Button>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
