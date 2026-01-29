import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OrderTrendProps {
  data: Array<{
    date: string;
    total: number;
    completed: number;
    pending: number;
  }>;
  delay?: number;
}

export function OrderTrendChart({ data, delay = 0 }: OrderTrendProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Pedidos por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" stackId="a" fill="#22c55e" name="Total" />
              <Bar dataKey="completed" stackId="a" fill="#3b82f6" name="Concluído" />
              <Bar dataKey="pending" stackId="a" fill="#fbbf24" name="Pendente" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/**
 * Component para gráfico de status de pedidos
 */
interface StatusBreakdownProps {
  statuses: {
    new: number;
    preparing: number;
    ready: number;
  };
  delay?: number;
}

export function StatusBreakdown({ statuses, delay = 0 }: StatusBreakdownProps) {
  const total = statuses.new + statuses.preparing + statuses.ready;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Status dos Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Novos</span>
                <span className="text-sm text-muted-foreground">{statuses.new}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${total > 0 ? (statuses.new / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Em Preparação</span>
                <span className="text-sm text-muted-foreground">{statuses.preparing}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${total > 0 ? (statuses.preparing / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Separados</span>
                <span className="text-sm text-muted-foreground">{statuses.ready}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${total > 0 ? (statuses.ready / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Total: <span className="font-semibold text-foreground">{total} pedidos</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
