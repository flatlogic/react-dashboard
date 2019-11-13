import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

class PercentAreaChart extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      uv: PropTypes.number,
      pv: PropTypes.number,
      amt: PropTypes.number,
    })).isRequired,
  }

  getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;
    
    return this.toPercent(ratio, 2);
  };

  toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

  renderTooltipContent = o => { // eslint-disable-line
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => (result + entry.value), 0);
    
    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {
            payload.map((entry, index) => (
              /* eslint-disable */
              <li key={`item-${index}`} style={{color: entry.color}}>
                {`${entry.name}: ${entry.value}(${this.getPercent(entry.value, total)})`}
              </li>
              /* eslint-enable */
            ))
          }
        </ul>
      </div>
    );
  };

	render () {
  	return (
      <ResponsiveContainer height={300} width='100%'>
        <AreaChart 
          data={this.props.data} 
          stackOffset="expand"
          margin={{top: 20, left: -15}} >
          <XAxis dataKey="month"/>
          <YAxis tickFormatter={this.toPercent}/>
          <Tooltip content={this.renderTooltipContent}/>
          <Area type='monotone' dataKey='uv' stackId="1" stroke='#ffffff' fill='#f3c363' />
          <Area type='monotone' dataKey='pv' stackId="1" stroke='#ffffff' fill='#1ab394' />
          <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffffff' fill='#5d80f9' />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

export default PercentAreaChart;
