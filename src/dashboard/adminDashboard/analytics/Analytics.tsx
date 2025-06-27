import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Car, Users, DollarSign, Calendar, Activity, Target, Award, Clock, MapPin, Star, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';

// Mock data - replace with actual API calls
const mockData = {
  overview: {
    totalRevenue: 125000,
    revenueGrowth: 12.5,
    totalBookings: 342,
    bookingsGrowth: 8.3,
    totalCars: 45,
    carsGrowth: 5.2,
    totalUsers: 1250,
    usersGrowth: 15.7
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 8500, bookings: 28 },
    { month: 'Feb', revenue: 9200, bookings: 32 },
    { month: 'Mar', revenue: 10800, bookings: 38 },
    { month: 'Apr', revenue: 11500, bookings: 42 },
    { month: 'May', revenue: 12200, bookings: 45 },
    { month: 'Jun', revenue: 13800, bookings: 48 }
  ],
  carCategories: [
    { name: 'Economy', value: 35, count: 15, color: '#3B82F6' },
    { name: 'Compact', value: 25, count: 11, color: '#10B981' },
    { name: 'SUV', value: 20, count: 9, color: '#F59E0B' },
    { name: 'Luxury', value: 15, count: 7, color: '#8B5CF6' },
    { name: 'Sports', value: 5, count: 3, color: '#EF4444' }
  ],
  bookingTrends: [
    { day: 'Mon', bookings: 12, revenue: 2400 },
    { day: 'Tue', bookings: 19, revenue: 3800 },
    { day: 'Wed', bookings: 15, revenue: 3200 },
    { day: 'Thu', bookings: 22, revenue: 4100 },
    { day: 'Fri', bookings: 28, revenue: 5200 },
    { day: 'Sat', bookings: 35, revenue: 6800 },
    { day: 'Sun', bookings: 25, revenue: 4900 }
  ],
  topPerformers: [
    { carModel: 'Toyota Corolla', bookings: 45, revenue: 9500 },
    { carModel: 'Honda CR-V', bookings: 38, revenue: 12800 },
    { carModel: 'BMW X5', bookings: 25, revenue: 15200 },
    { carModel: 'Mercedes C-Class', bookings: 22, revenue: 13400 },
    { carModel: 'Nissan Altima', bookings: 35, revenue: 8900 }
  ]
};

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [data, setData] = useState(mockData);

  // Simulate data loading
  useEffect(() => {
    // In real app, fetch data based on selectedPeriod
    setData(mockData);
  }, [selectedPeriod]);

  const StatCard = ({ 
    title, 
    value, 
    growth, 
    icon: Icon, 
    color = 'blue',
    prefix = '',
    suffix = '' 
  }: {
    title: string;
    value: number | string;
    growth: number;
    icon: any;
    color?: string;
    prefix?: string;
    suffix?: string;
  }) => {
    const isPositive = growth >= 0;
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(growth)}%
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Revenue') ? 'Ksh ' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-blue-600" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into your car rental business performance
            </p>
          </div>
          <div className="flex gap-2">
            {['1month', '3months', '6months', '1year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === '1month' ? '1M' : period === '3months' ? '3M' : period === '6months' ? '6M' : '1Y'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={data.overview.totalRevenue}
          growth={data.overview.revenueGrowth}
          icon={DollarSign}
          color="green"
          prefix="Ksh "
        />
        <StatCard
          title="Total Bookings"
          value={data.overview.totalBookings}
          growth={data.overview.bookingsGrowth}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Fleet Size"
          value={data.overview.totalCars}
          growth={data.overview.carsGrowth}
          icon={Car}
          color="purple"
        />
        <StatCard
          title="Total Users"
          value={data.overview.totalUsers}
          growth={data.overview.usersGrowth}
          icon={Users}
          color="orange"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <LineChartIcon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                name="Revenue (Ksh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Car Categories Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Fleet Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.carCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.carCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `${value}% (${props.payload.count} cars)`, 
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.carCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-600">
                  {category.name} ({category.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Booking Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Weekly Booking Pattern</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookings" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Cars */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Cars</h3>
          </div>
          <div className="space-y-4">
            {data.topPerformers.map((car, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{car.carModel}</p>
                    <p className="text-sm text-gray-600">{car.bookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Ksh {car.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Average Metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Booking Value</span>
              <span className="font-semibold">Ksh 3,650</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rental Duration</span>
              <span className="font-semibold">4.2 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Car Utilization</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Customer Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold">4.8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New booking: BMW X5</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Car returned: Toyota Corolla</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New user registered</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Payment received: Ksh 4,500</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-sm font-medium transition-colors">
              Generate Report
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium transition-colors">
              Export Data
            </button>
            <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-sm font-medium transition-colors">
              View Detailed Analytics
            </button>
            <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 p-3 rounded-lg text-sm font-medium transition-colors">
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;