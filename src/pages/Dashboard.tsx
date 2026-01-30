import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Filter, Loader, TrendingUp, Package, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getOrders } from '@/lib/api';
import { Order } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard } from '@/components/StatsCard';
import { OrderTrendChart, StatusBreakdown } from '@/components/DashboardCharts';
import { Layout } from '@/components/layout/Layout';

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
    const vendorId = user?.id || 'vendor-demo';
    const link = `${window.location.origin}/catalog/${vendorId}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado!', {
      description: 'Cole e compartilhe com seus clientes'
    });
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  // Calculate statistics
  const stats = {
    totalOrders: orders.length,
    totalCustomers: new Set(orders.map(o => o.customer_name)).size,
    totalValue: orders.reduce((sum, o) => sum + (o.total_price || 0), 0),
    statuses: {
      new: orders.filter(o => o.status === 'new').length,
      preparing: orders.filter(o => o.status === 'preparing').length,
      ready: orders.filter(o => o.status === 'ready').length
    }
  };

  // Generate trend data (simplified for demo)
  const trendData = [
    { date: 'Seg', total: 4, completed: 2, pending: 2 },
    { date: 'Ter', total: 3, completed: 1, pending: 2 },
    { date: 'Qua', total: 5, completed: 3, pending: 2 },
    { date: 'Qui', total: 6, completed: 4, pending: 2 },
    { date: 'Sex', total: stats.totalOrders, completed: stats.statuses.ready, pending: stats.statuses.new + stats.statuses.preparing }
  ];

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
    <Layout>
      <div className="space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">Painel do Vendedor</h1>
            <p className="text-muted-foreground mt-1">
              Bem-vindo de volta! Acompanhe seus pedidos e desempenho.
            </p>
          </div>
          <Button onClick={handleGenerateLink} className="gap-2 shadow-lg hover:shadow-xl transition-all" size="lg">
            <Share2 className="h-4 w-4" />
            Gerar Link do Catálogo
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                icon={Package}
                label="Total de Pedidos"
                value={stats.totalOrders}
                color="blue"
                delay={0}
              />
              <StatsCard
                icon={Users}
                label="Clientes Únicos"
                value={stats.totalCustomers}
                color="purple"
                delay={0.1}
              />
              <StatsCard
                icon={TrendingUp}
                label="Valor Total"
                value={`R$ ${stats.totalValue.toFixed(2)}`}
                color="green"
                delay={0.2}
              />
              <StatsCard
                icon={Clock}
                label="Pendentes"
                value={stats.statuses.new + stats.statuses.preparing}
                subtitle={`${stats.statuses.preparing} em preparação`}
                color="orange"
                delay={0.3}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OrderTrendChart data={trendData} delay={0.4} />
              </div>
              <StatusBreakdown statuses={stats.statuses} delay={0.5} />
            </div>

            {/* Orders List Section */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Pedidos Recentes</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-card">
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
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    <div className="p-5 border-b border-border bg-muted/20 group-hover:bg-muted/40 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {order.customerName}
                          </h3>
                          <p className="text-xs text-muted-foreground font-mono mt-1 opacity-70">
                            #{order.id.slice(0, 8)}
                          </p>
                        </div>
                        <Badge variant={statusLabels[order.status].variant}>
                          {statusLabels[order.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(order.date)}
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-medium text-muted-foreground mb-4">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'itens'} no pedido
                      </p>

                      <div className="space-y-2 mb-4">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-foreground/90">{item.productName}</span>
                            <span className="font-mono text-muted-foreground">
                              {item.quantity}x
                            </span>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <p className="text-xs text-muted-foreground italic pl-1">
                            +{order.items.length - 3} outros itens...
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/order/${order.id}`);
                        }}
                        variant="outline"
                        className="w-full rounded-lg hover:bg-primary hover:text-primary-foreground border-primary/20"
                        size="sm"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-16 bg-card/50 rounded-2xl border border-dashed border-border">
                  <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Nenhum pedido encontrado com este filtro.
                  </p>
                  {statusFilter !== 'all' && (
                    <Button
                      variant="link"
                      onClick={() => setStatusFilter('all')}
                      className="mt-2"
                    >
                      Limpar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
