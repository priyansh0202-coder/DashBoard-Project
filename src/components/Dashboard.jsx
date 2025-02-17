import { useState, useEffect } from 'react';
import { TrendCard } from './TrendCard';
import { BarChart, Search } from 'lucide-react';

// Mock data generator
const generateMockData = () => {
  const trends = [];
  const categories = ['Social', 'Technology', 'Entertainment', 'Business'];
  
  categories.forEach((category, idx) => {
    const data = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 1, i + 1),
      value: Math.floor(Math.random() * 10000) + 5000,
      category
    }));

    trends.push({
      id: `trend-${idx}`,
      name: `${category} Trend`,
      growth: Math.floor(Math.random() * 40) - 20,
      currentValue: data[data.length - 1].value,
      data
    });
  });

  return trends;
};

export function Dashboard() {
  const [trends] = useState(generateMockData());
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredTrends = trends.filter(trend => 
    trend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <BarChart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <h1 className="ml-2 text-lg sm:text-xl font-bold text-gray-900">Data Dashboard</h1>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder={isMobile ? "Search..." : "Search trends..."}
                className="w-full sm:w-64 pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredTrends.map(trend => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </main>
    </div>
  );
}