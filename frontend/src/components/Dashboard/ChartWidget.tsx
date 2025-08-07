import React, { useRef, useEffect } from 'react';
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
        .attr('stroke', data.datasets[0].borderColor || '#3b82f6')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Add dots
      svg.selectAll('.dot')
        .data(data.datasets[0].data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d, i) => x(data.labels[i]) || 0)
        .attr('cy', d => y(d))
        .attr('r', 4)
        .attr('fill', data.datasets[0].backgroundColor || '#3b82f6');

      // Add axes
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));
    }
  }, [data, type]);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="card-body">
        <div ref={chartRef} className="w-full h-80"></div>
      </div>
    </div>
  );
};

export default ChartWidget; 