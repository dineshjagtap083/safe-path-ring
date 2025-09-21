import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface SimpleBarChartProps {
  data: any[];
  dataKey: string;
  height?: number;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  dataKey, 
  height = 200 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3,3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface SimplePieChartProps {
  data: any[];
  height?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ 
  data, 
  height = 200 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

interface SimpleLineChartProps {
  data: any[];
  dataKey: string;
  height?: number;
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ 
  data, 
  dataKey, 
  height = 200 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3,3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke="hsl(var(--primary))" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};