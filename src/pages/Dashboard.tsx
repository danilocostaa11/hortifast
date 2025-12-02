import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Share2, Filter, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getOrders } from '@/lib/api';
import { Order } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

const statusLabels = {
  new: { label: 'Novo', variant: 'default' as const },
  preparing: { label: 'Em Preparação', variant: 'secondary' as const },
  ready: { label: 'Separado', variant: 'outline' as const }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Fetch orders
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrders(user.id);
        setOrders(data);
      } catch (err) {
        setError('Erro ao carregar pedidos');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user, navigate]);

  const handleGenerateLink = () => {
    const link = `${window.location.origin}/catalog/vendor-demo`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado!', {
      description: 'Cole e compartilhe com seus clientes'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2.5 rounded-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HortiFruti Express</h1>
                <p className="text-sm text-muted-foreground">Painel do Vendedor</p>
              </div>
            </div>
            
            <Button onClick={handleGenerateLink} className="gap-2" size="lg">
              <Share2 className="h-4 w-4" />
              Gerar Link do Catálogo
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters and Stats */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-1">
              Pedidos Recebidos
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido' : 'pedidos'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="new">Novos</SelectItem>
                <SelectItem value="preparing">Em Preparação</SelectItem>
                <SelectItem value="ready">Separados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/order/${order.id}`)}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-border bg-accent/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base text-foreground mb-1">
                      {order.customerName}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono">
                      {order.id}
                    </p>
                  </div>
                  <Badge variant={statusLabels[order.status].variant}>
                    {statusLabels[order.status].label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDate(order.date)}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                </p>
                <div className="space-y-2">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-foreground">{item.productName}</span>
                      <span className="font-medium text-foreground">
                        {item.quantity}x
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-muted-foreground italic">
                      +{order.items.length - 3} outros itens
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => navigate(`/order/${order.id}`)}
                  variant="outline"
                  className="w-full mt-4"
                  size="sm"
                >
                  Ver Detalhes
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Nenhum pedido encontrado com este status
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
