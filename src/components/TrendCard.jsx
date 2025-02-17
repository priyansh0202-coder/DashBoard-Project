import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { TrendChart } from './TrendChart';

export function TrendCard({ trend }) {
  const isPositive = trend.growth > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{trend.name}</h3>
          <div className="flex items-center mt-1">
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{trend.growth}%
            </span>
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-green-600 ml-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600 ml-1" />
            )}
          </div>
        </div>
        <div className="sm:text-right">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            {trend.currentValue.toLocaleString()}
          </span>
          <p className="text-xs sm:text-sm text-gray-500">Current Value</p>
        </div>
      </div>
      <div className="mt-4 w-full">
        <TrendChart 
          data={trend.data} 
          height={window.innerWidth < 640 ? 150 : 200}
        />
      </div>
    </div>
  );
}