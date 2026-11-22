const generateDateRange = (days) => {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

const formatDateLabel = (date, days) => {
  if (days <= 7) {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  } else if (days <= 30) {
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  } else {
    return date.toLocaleDateString('zh-CN', { month: 'short' });
  }
};

const generateChartData = (days, hasData = true) => {
  if (!hasData) return [];

  const dates = generateDateRange(days);
  const data = [];
  let pv = Math.floor(Math.random() * 2000) + 1000;
  let uv = Math.floor(Math.random() * 1500) + 500;

  const sampleRate = days <= 7 ? 1 : days <= 30 ? 2 : 7;

  for (let i = 0; i < dates.length; i++) {
    if (i % sampleRate === 0) {
      pv = Math.max(500, pv + Math.floor(Math.random() * 600) - 300);
      uv = Math.max(300, uv + Math.floor(Math.random() * 400) - 200);
      data.push({
        name: formatDateLabel(dates[i], days),
        pv,
        uv,
      });
    }
  }
  return data;
};

const generateStats = (days, hasData = true) => {
  if (!hasData) {
    return {
      totalUsers: 0,
      activeUsers: 0,
      newOrders: 0,
      revenue: 0,
      userGrowth: 0,
      orderGrowth: 0,
    };
  }

  const baseMultiplier = days / 7;
  return {
    totalUsers: Math.floor((1240 + Math.random() * 500) * baseMultiplier),
    activeUsers: Math.floor((850 + Math.random() * 300) * baseMultiplier),
    newOrders: Math.floor((320 + Math.random() * 200) * baseMultiplier),
    revenue: Math.floor((15680 + Math.random() * 10000) * baseMultiplier),
    userGrowth: Math.floor(5 + Math.random() * 15),
    orderGrowth: Math.floor(-5 + Math.random() * 20),
  };
};

export const getDashboardData = (timeframe) => {
  const daysMap = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  };

  const days = daysMap[timeframe] || 7;
  
  const hasData = Math.random() > 0.1;

  return {
    stats: generateStats(days, hasData),
    chartData: generateChartData(days, hasData),
    hasData,
  };
};

export const timeframeOptions = [
  { value: '7d', label: '7天' },
  { value: '30d', label: '30天' },
  { value: '90d', label: '90天' },
];

export const mock = [
  {
    id: 123325,
    updatedAt: '2019-11-14',
    title: ' React Native Starter - Mobile Template'
  },
  {
    id: 56785,
    updatedAt: '2019-12-14',
    title: 'Light Blue React Node.js - update version 7.0.1'
  },
  {
    id: 943325,
    updatedAt: '2019-15-14',
    title: 'Sing App React Node.js - update version 7.0.1'
  },
  {
    id: 84767,
    updatedAt: '2019-10-14',
    title: 'Sing App Vue Node.js - update version 5.0.3'
  },
  {
    id: 889412,
    updatedAt: '2019-11-14',
    title: 'Light Blue Vue Node.js - update version 3.0.5'
  },
];
