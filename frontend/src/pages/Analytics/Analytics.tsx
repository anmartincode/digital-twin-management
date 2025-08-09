import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';

const Analytics: React.FC = () => {
  const energyChartRef = useRef<SVGSVGElement>(null);
  const occupancyChartRef = useRef<SVGSVGElement>(null);
  const performanceChartRef = useRef<SVGSVGElement>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Sample data for energy consumption over time
  const energyData = [
    { date: '2024-01-01', consumption: 1250, cost: 187.50 },
    { date: '2024-01-02', consumption: 1180, cost: 177.00 },
    { date: '2024-01-03', consumption: 1320, cost: 198.00 },
    { date: '2024-01-04', consumption: 1290, cost: 193.50 },
    { date: '2024-01-05', consumption: 1150, cost: 172.50 },
    { date: '2024-01-06', consumption: 980, cost: 147.00 },
    { date: '2024-01-07', consumption: 1050, cost: 157.50 },
    { date: '2024-01-08', consumption: 1220, cost: 183.00 },
    { date: '2024-01-09', consumption: 1280, cost: 192.00 },
    { date: '2024-01-10', consumption: 1190, cost: 178.50 },
    { date: '2024-01-11', consumption: 1340, cost: 201.00 },
    { date: '2024-01-12', consumption: 1270, cost: 190.50 },
    { date: '2024-01-13', consumption: 1100, cost: 165.00 },
    { date: '2024-01-14', consumption: 1020, cost: 153.00 },
    { date: '2024-01-15', consumption: 1160, cost: 174.00 }
  ];

  // Sample occupancy data
  const occupancyData = [
    { hour: '00:00', occupancy: 5 },
    { hour: '02:00', occupancy: 3 },
    { hour: '04:00', occupancy: 2 },
    { hour: '06:00', occupancy: 8 },
    { hour: '08:00', occupancy: 45 },
    { hour: '10:00', occupancy: 78 },
    { hour: '12:00', occupancy: 85 },
    { hour: '14:00', occupancy: 92 },
    { hour: '16:00', occupancy: 88 },
    { hour: '18:00', occupancy: 65 },
    { hour: '20:00', occupancy: 32 },
    { hour: '22:00', occupancy: 15 }
  ];

  // Sample performance metrics by system
  const performanceData = [
    { system: 'HVAC', efficiency: 85, maintenance: 92, uptime: 98.5 },
    { system: 'Lighting', efficiency: 78, maintenance: 88, uptime: 99.2 },
    { system: 'Security', efficiency: 95, maintenance: 85, uptime: 99.8 },
    { system: 'Fire Safety', efficiency: 88, maintenance: 95, uptime: 99.9 },
    { system: 'Elevators', efficiency: 82, maintenance: 78, uptime: 97.3 },
    { system: 'Network', efficiency: 92, maintenance: 90, uptime: 99.5 }
  ];

  useEffect(() => {
    drawEnergyChart();
    drawOccupancyChart();
    drawPerformanceChart();
  }, [timeRange]);

  const drawEnergyChart = () => {
    if (!energyChartRef.current) return;

    const svg = d3.select(energyChartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse dates and set up scales
    const parseTime = d3.timeParse("%Y-%m-%d");
    const data = energyData.map(d => ({
      date: parseTime(d.date)!,
      consumption: d.consumption,
      cost: d.cost
    }));

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.consumption)!])
      .nice()
      .range([height, 0]);

    // Create line generator
    const line = d3.line<{ date: Date; consumption: number; cost: number }>()
      .x(d => x(d.date))
      .y(d => y(d.consumption))
      .curve(d3.curveMonotoneX);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d") as any))
      .style("color", "#64748b");

    g.append("g")
      .call(d3.axisLeft(y))
      .style("color", "#64748b");

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "#64748b")
      .style("font-size", "12px")
      .text("Energy Consumption (kWh)");

    // Add the line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0ea5e9")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add dots
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.consumption))
      .attr("r", 4)
      .attr("fill", "#0ea5e9")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);
  };

  const drawOccupancyChart = () => {
    if (!occupancyChartRef.current) return;

    const svg = d3.select(occupancyChartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(occupancyData.map(d => d.hour))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(occupancyData, d => d.occupancy)!])
      .nice()
      .range([height, 0]);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style("color", "#64748b");

    g.append("g")
      .call(d3.axisLeft(y))
      .style("color", "#64748b");

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("fill", "#64748b")
      .style("font-size", "12px")
      .text("Occupancy (%)");

    // Add bars
    g.selectAll(".bar")
      .data(occupancyData)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.hour)!)
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.occupancy))
      .attr("height", d => height - y(d.occupancy))
      .attr("fill", "#14b8a6");
  };

  const drawPerformanceChart = () => {
    if (!performanceChartRef.current) return;

    const svg = d3.select(performanceChartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 80, bottom: 40, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(performanceData.map(d => d.system))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const keys = ['efficiency', 'maintenance', 'uptime'];
    const colors = ['#0ea5e9', '#14b8a6', '#f97316'];

    const x1 = d3.scaleBand()
      .domain(keys)
      .range([0, x.bandwidth()])
      .padding(0.05);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .style("color", "#64748b")
      .selectAll("text")
      .style("font-size", "10px");

    g.append("g")
      .call(d3.axisLeft(y))
      .style("color", "#64748b");

    // Add bars
    const systems = g.selectAll(".system")
      .data(performanceData)
      .enter().append("g")
      .attr("class", "system")
      .attr("transform", d => `translate(${x(d.system)},0)`);

    systems.selectAll("rect")
      .data(d => keys.map(key => ({ key, value: d[key as keyof typeof d] as number })))
      .enter().append("rect")
      .attr("x", d => x1(d.key)!)
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", (d, i) => colors[i]);

    // Add legend
    const legend = g.append("g")
      .attr("transform", `translate(${width + 20}, 20)`);

    keys.forEach((key, i) => {
      const legendItem = legend.append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      legendItem.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", colors[i]);

      legendItem.append("text")
        .attr("x", 16)
        .attr("y", 9)
        .style("font-size", "12px")
        .style("fill", "#64748b")
        .text(key.charAt(0).toUpperCase() + key.slice(1));
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive analytics and insights for facility performance and optimization
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md">
            <RefreshIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md">
            <DownloadIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Occupancy Rate</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">78%</p>
                <div className="flex items-center text-xs text-teal-600 dark:text-teal-400 mt-1">
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                  +5.2% vs last month
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Energy Efficiency</p>
                <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">85%</p>
                <div className="flex items-center text-xs text-teal-600 dark:text-teal-400 mt-1">
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                  +2.1% vs last month
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Maintenance Score</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">92%</p>
                <div className="flex items-center text-xs text-pink-600 dark:text-pink-400 mt-1">
                  <TrendingDownIcon className="h-3 w-3 mr-1" />
                  -1.3% vs last month
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-body p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Asset Utilization</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">76%</p>
                <div className="flex items-center text-xs text-teal-600 dark:text-teal-400 mt-1">
                  <TrendingUpIcon className="h-3 w-3 mr-1" />
                  +3.8% vs last month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Consumption Chart */}
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-header dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Energy Consumption Trend</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Daily energy usage over time</p>
          </div>
          <div className="card-body dark:bg-slate-800">
            <svg ref={energyChartRef} width="600" height="300" className="w-full h-auto"></svg>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-header dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Occupancy Pattern</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Average occupancy by hour of day</p>
          </div>
          <div className="card-body dark:bg-slate-800">
            <svg ref={occupancyChartRef} width="600" height="300" className="w-full h-auto"></svg>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="card dark:bg-slate-800 dark:border-slate-700 lg:col-span-2">
          <div className="card-header dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">System Performance Metrics</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Efficiency, maintenance, and uptime by system</p>
          </div>
          <div className="card-body dark:bg-slate-800">
            <svg ref={performanceChartRef} width="600" height="300" className="w-full h-auto"></svg>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-header dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Key Insights</h3>
          </div>
          <div className="card-body dark:bg-slate-800">
            <div className="space-y-4">
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                <div className="font-medium text-teal-900 dark:text-teal-300">Energy Usage Optimized</div>
                <div className="text-sm text-teal-600 dark:text-teal-400">12% reduction compared to last month through smart scheduling</div>
              </div>
              <div className="p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-200 dark:border-sky-800">
                <div className="font-medium text-sky-900 dark:text-sky-300">Peak Occupancy Identified</div>
                <div className="text-sm text-sky-600 dark:text-sky-400">2-4 PM shows highest usage, consider resource allocation</div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="font-medium text-orange-900 dark:text-orange-300">Maintenance Alert</div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Elevator system requires attention based on performance trends</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card dark:bg-slate-800 dark:border-slate-700">
          <div className="card-header dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recommendations</h3>
          </div>
          <div className="card-body dark:bg-slate-800">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Implement Smart Lighting</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Motion sensors could reduce energy consumption by 15-20%</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Optimize HVAC Scheduling</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Adjust temperature controls based on occupancy patterns</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Preventive Maintenance</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Schedule elevator maintenance to prevent downtime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 