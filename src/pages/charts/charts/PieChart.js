import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180; 
const data = [
  {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}
];                   

class SimplePieChart extends PureComponent {
  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  
   return (
     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
     </text>
   );
  }

	render () {
  	return (
      <ResponsiveContainer height={200} width='100%'>
        <PieChart onMouseEnter={this.onPieEnter}>
          <Pie
            data={data} 
            cx='50%' 
            cy={100} 
            labelLine={false}
            label={this.renderCustomizedLabel}
            outerRadius={80} 
            fill="#8884d8"
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default SimplePieChart;
