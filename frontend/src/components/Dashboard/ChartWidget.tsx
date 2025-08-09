import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface ChartWidgetProps {
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      tension?: number;
    }>;
  };
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ title, type, data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; value: number; label: string }>({
    show: false,
    x: 0,
    y: 0,
    value: 0,
    label: ''
  });

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (type === 'line') {
      const x = d3.scalePoint()
        .domain(data.labels)
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data.datasets[0].data) || 0])
        .range([height, 0]);

      // Add line
      const line = d3.line<number>()
        .x((d, i) => x(data.labels[i]) || 0)
        .y(d => y(d))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(data.datasets[0].data)
        .attr('fill', 'none')
        .attr('stroke', data.datasets[0].borderColor || '#0ea5e9')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Add interactive dots with tooltips
      svg.selectAll('.dot')
        .data(data.datasets[0].data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d, i) => x(data.labels[i]) || 0)
        .attr('cy', d => y(d))
        .attr('r', 6)
        .attr('fill', data.datasets[0].backgroundColor || '#0ea5e9')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          const i = data.datasets[0].data.indexOf(d);
          const [xPos, yPos] = d3.pointer(event);
          
          setTooltip({
            show: true,
            x: event.pageX,
            y: event.pageY - 10,
            value: d,
            label: data.labels[i]
          });

          d3.select(this)
            .attr('r', 8)
            .attr('fill', '#0284c7');
        })
        .on('mouseout', function() {
          setTooltip(prev => ({ ...prev, show: false }));
          
          d3.select(this)
            .attr('r', 6)
            .attr('fill', data.datasets[0].backgroundColor || '#0ea5e9');
        });

      // Add axes
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .style('color', '#64748b');

      svg.append('g')
        .call(d3.axisLeft(y))
        .style('color', '#64748b');
    }
  }, [data, type]);

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700">
      <div className="card-header dark:bg-slate-700">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">{title}</h3>
      </div>
      <div className="card-body dark:bg-slate-800">
        <div ref={chartRef} className="w-full h-80 relative"></div>
        
        {/* Tooltip */}
        {tooltip.show && (
          <div
            className="absolute z-10 px-3 py-2 text-sm text-white bg-slate-900 rounded-lg shadow-lg pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="font-medium">{tooltip.label}</div>
            <div>{tooltip.value} kWh</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartWidget; 