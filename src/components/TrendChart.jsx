import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export function TrendChart({ data, height = 200 }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.length || !width) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([innerHeight, 0]);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add gradient
    const gradient = g.append('defs')
      .append('linearGradient')
      .attr('id', `line-gradient-${data[0].category}`)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(d3.max(data, d => d.value)));

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#0EA5E9')
      .attr('stop-opacity', 0.1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0EA5E9')
      .attr('stop-opacity', 0.4);

    // Add area
    const area = d3.area()
      .x(d => xScale(d.date))
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area)
      .style('fill', `url(#line-gradient-${data[0].category})`);

    // Add line
    g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .style('fill', 'none')
      .style('stroke', '#0EA5E9')
      .style('stroke-width', 2);

    // Add axes with responsive font sizes
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .ticks(width < 400 ? 4 : 6))
      .style('color', '#94A3B8')
      .style('font-size', width < 400 ? '10px' : '12px');

    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale)
        .ticks(height < 300 ? 4 : 6))
      .style('color', '#94A3B8')
      .style('font-size', width < 400 ? '10px' : '12px');

    // Add hover effects
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.1)');

    const bisect = d3.bisector(d => d.date).left;

    g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mousemove', function(event) {
        const mouseX = d3.pointer(event, this)[0];
        const x0 = xScale.invert(mouseX);
        
        // Ensure we have valid data before proceeding
        if (!data || data.length === 0) return;
        
        const i = bisect(data, x0, 1);
        // Ensure we don't go out of bounds
        if (i <= 0 || i >= data.length) return;
        
        const d0 = data[i - 1];
        const d1 = data[i];
        
        // Ensure both data points exist
        if (!d0 || !d1) return;
        
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        
        tooltip
          .style('visibility', 'visible')
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`)
          .html(`
            <div class="text-sm">
              <div class="font-semibold">${d.date.toLocaleDateString()}</div>
              <div>Value: ${d.value.toLocaleString()}</div>
            </div>
          `);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Cleanup function to remove tooltip when component unmounts
    return () => {
      tooltip.remove();
    };

  }, [data, width, height]);

  return (
    <div ref={containerRef} className="w-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="overflow-visible"
      />
    </div>
  );
}