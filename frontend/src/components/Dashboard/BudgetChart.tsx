import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface BudgetChartProps {
  title?: string;
}

type TimePeriod = 'D' | 'M' | 'Y' | 'All' | 'Custom';

const BudgetChart: React.FC<BudgetChartProps> = ({ title = "Facility Operations Budget" }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [layout, setLayout] = useState<'stacked' | 'grouped'>('stacked');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('All');

  // Sample data for different time periods
  const getDataForPeriod = (period: TimePeriod) => {
    const baseData = [
      { category: 'HVAC', maintenance: 45, energy: 35, upgrades: 20 },
      { category: 'Security', maintenance: 30, energy: 15, upgrades: 25 },
      { category: 'Lighting', maintenance: 25, energy: 40, upgrades: 15 },
      { category: 'Fire Safety', maintenance: 20, energy: 10, upgrades: 30 },
      { category: 'Network', maintenance: 35, energy: 20, upgrades: 35 },
      { category: 'Elevators', maintenance: 40, energy: 25, upgrades: 20 },
      { category: 'Plumbing', maintenance: 30, energy: 15, upgrades: 15 },
      { category: 'Electrical', maintenance: 35, energy: 30, upgrades: 25 },
    ];

    // Adjust data based on time period
    switch (period) {
      case 'D': // Daily forecast (much smaller values)
        return baseData.map(item => ({
          ...item,
          maintenance: Math.round(item.maintenance * 0.03), // ~1/30th for daily
          energy: Math.round(item.energy * 0.03),
          upgrades: Math.round(item.upgrades * 0.03)
        }));
      case 'M': // Monthly forecast
        return baseData.map(item => ({
          ...item,
          maintenance: Math.round(item.maintenance * 0.25), // ~1/4 for monthly
          energy: Math.round(item.energy * 0.25),
          upgrades: Math.round(item.upgrades * 0.25)
        }));
      case 'Y': // Yearly forecast (larger values)
        return baseData.map(item => ({
          ...item,
          maintenance: Math.round(item.maintenance * 4), // 4x for yearly
          energy: Math.round(item.energy * 4),
          upgrades: Math.round(item.upgrades * 4)
        }));
      case 'All':
      case 'Custom':
      default:
        return baseData;
    }
  };

  const data = getDataForPeriod(timePeriod);
  const keys = ['maintenance', 'energy', 'upgrades'];
  const colors = ['#0ea5e9', '#14b8a6', '#f97316']; // Changed to sky-500, teal-500, orange-500

  // Get summary stats based on time period
  const getSummaryStats = () => {
    const totalMaintenance = data.reduce((sum, item) => sum + item.maintenance, 0);
    const totalEnergy = data.reduce((sum, item) => sum + item.energy, 0);
    const totalUpgrades = data.reduce((sum, item) => sum + item.upgrades, 0);

    const formatValue = (value: number) => {
      if (timePeriod === 'Y') {
        return `$${(value * 1000).toLocaleString()}`;
      } else if (timePeriod === 'D') {
        return `$${(value * 10).toLocaleString()}`;
      } else {
        return `$${(value * 100).toLocaleString()}`;
      }
    };

    return {
      maintenance: { value: formatValue(totalMaintenance), change: '+24.8%' },
      energy: { value: formatValue(totalEnergy), change: '+3.4%' },
      upgrades: { value: formatValue(totalUpgrades), change: '+12.1%' }
    };
  };

  const summaryStats = getSummaryStats();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 900; // Increased width
    const height = 280; // Adjusted height for better fit
    const marginTop = 20;
    const marginRight = 40;
    const marginBottom = 45;
    const marginLeft = 60;

    const x0 = d3.scaleBand()
      .domain(data.map(d => d.category))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.15); // Slightly more padding for better appearance

    const x1 = d3.scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(keys, key => d[key as keyof typeof d] as number)) || 0])
      .nice()
      .rangeRound([height - marginBottom, marginTop]);

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(colors);

    // Create SVG with proper centering
    svg.attr("width", "100%")
       .attr("height", height)
       .attr("viewBox", `0 0 ${width} ${height}`)
       .attr("style", "max-width: 100%; height: auto; display: block; margin: 0 auto;");

    // Add bars
    const rect = svg.selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x0(d.category)},0)`)
      .selectAll("rect")
      .data(d => keys.map(key => ({ key, value: d[key as keyof typeof d] as number, category: d.category })))
      .join("rect")
      .attr("x", d => x1(d.key)!)
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key) as string);

    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x0).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").remove())
      .call(g => g.selectAll("text")
        .style("font-size", "12px")
        .style("font-weight", "500")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end"));

    // Add y-axis
    const yAxisLabel = timePeriod === 'D' ? 'Budget (dollars)' : 
                      timePeriod === 'M' ? 'Budget (hundreds $)' :
                      timePeriod === 'Y' ? 'Budget (thousands $)' : 'Budget (thousands $)';

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(6, "s"))
      .call(g => g.selectAll(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 15)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .style("font-size", "12px")
        .style("font-weight", "500")
        .text(yAxisLabel));

    // Transition functions
    function transitionGrouped() {
      y.domain([0, d3.max(data, d => d3.max(keys, key => d[key as keyof typeof d] as number)) || 0]);

      rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("x", d => x1(d.key)!)
        .attr("width", x1.bandwidth())
        .transition()
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value));
    }

    function transitionStacked() {
      y.domain([0, d3.max(data, d => d3.sum(keys, key => d[key as keyof typeof d] as number)) || 0]);

      rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => {
          const categoryData = data.find(item => item.category === d.category)!;
          const index = keys.indexOf(d.key);
          const stackedValue = keys.slice(0, index).reduce((sum, key) => sum + (categoryData[key as keyof typeof categoryData] as number), 0);
          return y(stackedValue + d.value);
        })
        .attr("height", d => y(0) - y(d.value))
        .transition()
        .attr("x", x0.bandwidth() / 6)
        .attr("width", x0.bandwidth() * 2 / 3);
    }

    // Apply initial layout
    if (layout === 'stacked') {
      transitionStacked();
    } else {
      transitionGrouped();
    }

  }, [data, layout, timePeriod]);

  const toggleLayout = () => {
    setLayout(prev => prev === 'stacked' ? 'grouped' : 'stacked');
  };

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  const getTimePeriodLabel = () => {
    switch (timePeriod) {
      case 'D': return 'Daily Forecast';
      case 'M': return 'Monthly Forecast';
      case 'Y': return 'Yearly Forecast';
      case 'All': return 'All Time';
      case 'Custom': return 'Custom Range';
      default: return 'All Time';
    }
  };

  return (
    <div className="card dark:bg-slate-800 dark:border-slate-700">
      <div className="card-header dark:bg-slate-800 flex items-center justify-between py-3">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
              <span className="text-slate-600 dark:text-slate-400">Maintenance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <span className="text-slate-600 dark:text-slate-400">Energy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-slate-600 dark:text-slate-400">Upgrades</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleLayout}
            className={`px-3 py-1 text-xs font-medium rounded ${
              layout === 'stacked' 
                ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Stacked
          </button>
          <button
            onClick={toggleLayout}
            className={`px-3 py-1 text-xs font-medium rounded ${
              layout === 'grouped' 
                ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Grouped
          </button>
          <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => handleTimePeriodChange('D')}
              className={`px-1 py-0.5 rounded cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 ${
                timePeriod === 'D' ? 'font-medium text-slate-900 dark:text-white' : ''
              }`}
            >
              D
            </button>
            <button
              onClick={() => handleTimePeriodChange('M')}
              className={`px-1 py-0.5 rounded cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 ${
                timePeriod === 'M' ? 'font-medium text-slate-900 dark:text-white' : ''
              }`}
            >
              M
            </button>
            <button
              onClick={() => handleTimePeriodChange('Y')}
              className={`px-1 py-0.5 rounded cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 ${
                timePeriod === 'Y' ? 'font-medium text-slate-900 dark:text-white' : ''
              }`}
            >
              Y
            </button>
            <button
              onClick={() => handleTimePeriodChange('All')}
              className={`px-1 py-0.5 rounded cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 ${
                timePeriod === 'All' ? 'font-medium text-slate-900 dark:text-white' : ''
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTimePeriodChange('Custom')}
              className={`px-1 py-0.5 rounded cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 ${
                timePeriod === 'Custom' ? 'font-medium text-slate-900 dark:text-white' : ''
              }`}
            >
              Custom
            </button>
          </div>
          <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded">
            <RefreshIcon className="h-4 w-4" />
          </button>
          <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded">
            <MoreVertIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="card-body dark:bg-slate-800 relative p-4">
        {/* Time Period Label */}
        <div className="text-center mb-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{getTimePeriodLabel()}</span>
        </div>

        {/* Chart Area - Centered */}
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-5xl">
            <svg ref={svgRef} className="w-full h-auto"></svg>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-6 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900 dark:text-white">{summaryStats.maintenance.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total Maintenance</div>
            <div className="flex items-center justify-center text-xs text-teal-600 dark:text-teal-400 mt-1">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              {summaryStats.maintenance.change}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900 dark:text-white">{summaryStats.energy.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Energy Costs</div>
            <div className="flex items-center justify-center text-xs text-pink-600 dark:text-pink-400 mt-1">
              <TrendingDownIcon className="h-3 w-3 mr-1" />
              {summaryStats.energy.change}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-900 dark:text-white">{summaryStats.upgrades.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Planned Upgrades</div>
            <div className="flex items-center justify-center text-xs text-teal-600 dark:text-teal-400 mt-1">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              {summaryStats.upgrades.change}
            </div>
          </div>
        </div>

        {/* Timeline markers */}
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-8">
          {timePeriod === 'D' ? (
            <>
              <span>Today</span>
              <span>+1 Day</span>
              <span>+2 Days</span>
              <span>+3 Days</span>
              <span>+7 Days</span>
            </>
          ) : timePeriod === 'M' ? (
            <>
              <span>This Month</span>
              <span>Next Month</span>
              <span>+2 Months</span>
              <span>+3 Months</span>
              <span>+6 Months</span>
            </>
          ) : timePeriod === 'Y' ? (
            <>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
              <span>2027</span>
              <span>2028</span>
            </>
          ) : (
            <>
              <span>Q1 2024</span>
              <span>Q2 2024</span>
              <span>Q3 2024</span>
              <span>Q4 2024</span>
              <span>Est. Q1 2025</span>
            </>
          )}
        </div>

        {/* Budget range */}
        <div className="absolute top-3 right-4 text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {timePeriod === 'D' ? '↑ $0 - $1k' : 
             timePeriod === 'M' ? '↑ $0 - $10k' :
             timePeriod === 'Y' ? '↑ $0 - $400k' : '↑ $0 - $100k'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetChart; 