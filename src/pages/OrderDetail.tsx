import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Printer, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockOrders } from '@/data/mockData';
import { toast } from 'sonner';
import { openWhatsApp, generateOrderShareMessage } from '@/lib/utils';
import { Layout } from '@/components/layout/Layout';

const statusLabels = {
  new: { label: 'Novo', variant: 'default' as const },
  preparing: { label: 'Em Preparação', variant: 'secondary' as const },
  ready: { label: 'Separado', variant: 'outline' as const }
};

export default function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const order = mockOrders.find(o => o.id === orderId);

  const [status, setStatus] = useState(order?.status || 'new');

  if (!order) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Pedido não encontrado</h1>
            <Button onClick={() => navigate('/dashboard')}>Voltar ao Painel</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as typeof status);
    toast.success('Status atualizado!');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Abrindo impressão...');
  };

  const handleShareWhatsApp = () => {
    const message = generateOrderShareMessage(order.id, order.customerName, order.items.length);
    openWhatsApp(message);
    toast.success('Abrindo WhatsApp...');
  };

  return (
    <Layout>
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 print:static">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="print:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Detalhe do Pedido</h1>
                <p className="text-sm text-muted-foreground font-mono">{order.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <Button onClick={handleShareWhatsApp} variant="outline" className="gap-2" title="Compartilhar via WhatsApp">
                <MessageCircle className="h-4 w-4 text-green-600" />
                WhatsApp
              </Button>
              <Button onClick={handlePrint} variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Logo for Print */}
          <div className="hidden print:flex items-center gap-3 mb-8">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HortiFruti Express</h1>
              <p className="text-muted-foreground">Pedido #{order.id}</p>
            </div>
          </div>

          {/* Customer Info Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl">Informações do Cliente</CardTitle>
              <Badge variant={statusLabels[status].variant} className="text-sm px-3 py-1">
                {statusLabels[status].label}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nome do Cliente</p>
                  <p className="font-semibold text-foreground">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Data e Hora</p>
                  <p className="font-medium text-foreground">{formatDate(order.date)}</p>
                </div>
              </div>

              {order.observations && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Observações</p>
                  <p className="text-sm text-foreground bg-accent/30 p-3 rounded-lg">
                    {order.observations}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-border print:hidden">
                <p className="text-sm text-muted-foreground mb-2">Alterar Status</p>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Novo</SelectItem>
                    <SelectItem value="preparing">Em Preparação</SelectItem>
                    <SelectItem value="ready">Separado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Items Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Itens do Pedido ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-border font-semibold text-sm text-muted-foreground">
                  <div className="col-span-6">Produto</div>
                  <div className="col-span-3">Unidade</div>
                  <div className="col-span-3 text-right">Quantidade</div>
                </div>

                {/* Table Rows */}
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 py-3 border-b border-border last:border-0"
                  >
                    <div className="col-span-6 font-medium text-foreground">
                      {item.productName}
                    </div>
                    <div className="col-span-3 text-muted-foreground text-sm">
                      {item.unit}
                    </div>
                    <div className="col-span-3 text-right font-semibold text-foreground">
                      {item.quantity}x
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="grid grid-cols-12 gap-4 pt-4 border-t-2 border-primary/20 font-bold">
                  <div className="col-span-9 text-foreground">Total de Itens</div>
                  <div className="col-span-3 text-right text-primary text-lg">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </Layout>
  );
}
