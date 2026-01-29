import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'purple' | 'orange';
  delay?: number;
}

const colorClasses = {
  green: 'bg-green-50 text-green-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600'
};

export function StatsCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  color = 'green',
  delay = 0
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {label}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {value}
              </p>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>

          {trend && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs. mês anterior
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
