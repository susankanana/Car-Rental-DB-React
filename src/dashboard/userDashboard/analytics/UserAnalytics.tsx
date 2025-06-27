import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Car, Calendar, DollarSign, Clock, Star, Activity, Target, Award, BarChart3, PieChart as PieChartIcon, User, CreditCard } from 'lucide-react';

// Mock data - replace with actual API calls based on user
const mockUserData = {
  overview: {
    totalBookings: 12,
    totalSpent: 28500,
    averageRental: 4.2,
    favoriteCategory: 'SUV',
    memberSince: '2023-01-15',
    loyaltyPoints: 850
  },
  monthlySpending: [
    { month: 'Jan', amount: 3200, bookings: 2 },
    { month: 'Feb', amount: 4100, bookings: 2 },
    { month: 'Mar', amount: 5200, bookings: 3 },
    { month: 'Apr', amount: 3800, bookings: 2 },
    { month: 'May', amount: 6100, bookings: 2 },
    { month: 'Jun', amount: 6100, bookings: 1 }
  ],
  carPreferences: [
    { name: 'SUV', value: 40, bookings: 5, color: '#3B82F6' },
    { name: 'Sedan', value: 30, bookings: 4, color: '#10B981' },
    { name: 'Compact', value: 20, bookings: 2, color: '#F59E0B' },
    { name: 'Luxury', value: 10, bookings: 1, color: '#8B5CF6' }
  ],
  rentalDuration: [
    { duration: '1-2 days', count: 4, percentage: 33 },
    { duration: '3-5 days', count: 5, percentage: 42 },
    { duration: '6-7 days', count: 2, percentage: 17 },
    { duration: '1+ week', count: 1, percentage: 8 }
  ],
  recentBookings: [
    { carModel: 'Honda CR-V', date: '2024-01-15', amount: 4500, duration: 3, rating: 5 },
    { carModel: 'Toyota Corolla', date: '2024-01-08', amount: 2800, duration: 2, rating: 4 },
    { carModel: 'BMW X5', date: '2023-12-22', amount: 7200, duration: 4, rating: 5 },
    { carModel: 'Nissan Altima', date: '2023-12-10', amount: 3200, duration: 2, rating: 4 }
  ],
  savingsData: [
    { month: 'Jan', saved: 320, potential: 450 },
    { month: 'Feb', saved: 410, potential: 520 },
    { month: 'Mar', saved: 520, potential: 680 },
    { month: 'Apr', saved: 380, potential: 480 },
    { month: 'May', saved: 610, potential: 750 },
    { month: 'Jun', saved: 610, potential: 720 }
  ]
};

const UserAnalytics = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [data, setData] = useState(mockUserData);

  useEffect(() => {
    // In real app, fetch user-specific data based on user.customerID and selectedPeriod
    setData(mockUserData);
  }, [selectedPeriod, user]);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color = 'blue',
    prefix = '',
    suffix = '',
    subtitle = ''
  }: {
    title: string;
    value: number | string;
    icon: any;
    color?: string;
    prefix?: string;
    suffix?: string;
    subtitle?: string;
  }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200',
      pink: 'bg-pink-50 text-pink-600 border-pink-200'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
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
              {entry.name}: {entry.name.includes('amount') || entry.name.includes('Amount') ? 'Ksh ' : ''}{entry.value.toLocaleString()}
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
              My Rental Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.firstName || 'User'}! Here's your rental activity overview
            </p>
          </div>
          <div className="flex gap-2">
            {['3months', '6months', '1year', 'all'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === '3months' ? '3M' : period === '6months' ? '6M' : period === '1year' ? '1Y' : 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={data.overview.totalBookings}
          icon={Calendar}
          color="blue"
          subtitle="Lifetime rentals"
        />
        <StatCard
          title="Total Spent"
          value={data.overview.totalSpent}
          icon={DollarSign}
          color="green"
          prefix="Ksh "
          subtitle="All-time spending"
        />
        <StatCard
          title="Average Rental"
          value={data.overview.averageRental}
          icon={Clock}
          color="purple"
          suffix=" days"
          subtitle="Per booking"
        />
        <StatCard
          title="Loyalty Points"
          value={data.overview.loyaltyPoints}
          icon={Award}
          color="orange"
          subtitle="Available to redeem"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Spending Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.monthlySpending}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#spendingGradient)"
                name="Amount Spent (Ksh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Car Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Car Preferences</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.carPreferences}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.carPreferences.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `${value}% (${props.payload.bookings} bookings)`, 
                  props.payload.name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {data.carPreferences.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-600">
                  {category.name} ({category.bookings})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rental Duration Patterns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Rental Duration Patterns</h3>
          </div>
          <div className="space-y-4">
            {data.rentalDuration.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span className="text-sm font-medium text-gray-700">{item.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{item.count} trips</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Car className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          </div>
          <div className="space-y-4">
            {data.recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{booking.carModel}</p>
                    <p className="text-sm text-gray-600">{booking.date} • {booking.duration} days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Ksh {booking.amount.toLocaleString()}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{booking.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Savings Tracker */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Savings Tracker</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">Ksh 2,850</p>
              <p className="text-sm text-green-700">Total Saved This Year</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">vs. Taxi Services</span>
                <span className="font-medium">Ksh 1,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">vs. Car Purchase</span>
                <span className="font-medium">Ksh 1,650</span>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Membership Status</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-600">Gold Member</p>
              <p className="text-sm text-blue-700">Since {new Date(data.overview.memberSince).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Next Tier</span>
                <span className="font-medium">Platinum (150 pts)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-lg text-sm font-medium transition-colors">
              Book Another Car
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-lg text-sm font-medium transition-colors">
              View Booking History
            </button>
            <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 p-3 rounded-lg text-sm font-medium transition-colors">
              Redeem Points
            </button>
            <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 p-3 rounded-lg text-sm font-medium transition-colors">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;