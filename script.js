document.addEventListener('DOMContentLoaded', function () {
  // Fetch the dataset
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
  )
    .then((response) => response.json())
    .then((data) => {
      drawHeatMap(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  function drawHeatMap(data) {
    const width = 1000;
    const height = 400;
    const padding = 50;

    const svg = d3
      .select('#heat-map')
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);

    const baseTemperature = data.baseTemperature;
    const monthlyData = data.monthlyVariance;

    // Scale for x-axis (years)
    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(monthlyData, (d) => d.year),
        d3.max(monthlyData, (d) => d.year),
      ])
      .range([0, width]);

    // Scale for y-axis (months)
    const yScale = d3
      .scaleBand()
      .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) // Months range from 0 to 11
      .range([0, height]);

    // Scale for colors
    const colors = [
      '#4575b4',
      '#74add1',
      '#abd9e9',
      '#e0f3f8',
      '#fee090',
      '#fdae61',
      '#f46d43',
      '#d73027',
    ];
    const colorScale = d3
      .scaleQuantile()
      .domain(d3.extent(monthlyData, (d) => baseTemperature + d.variance))
      .range(colors);

    // Draw cells
    svg
      .selectAll('.cell')
      .data(monthlyData)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', (d) => xScale(d.year) + padding)
      .attr('y', (d) => yScale(d.month - 1) + padding) // Adjusted the month indexing
      .attr(
        'width',
        width /
          (d3.max(monthlyData, (d) => d.year) -
            d3.min(monthlyData, (d) => d.year))
      )
      .attr('height', yScale.bandwidth())
      .attr('fill', (d) => colorScale(baseTemperature + d.variance))
      .attr('data-year', (d) => d.year)
      .attr('data-month', (d) => d.month - 1) // Adjusted the month indexing
      .attr('data-temp', (d) => baseTemperature + d.variance)
      .on('mouseover', showTooltip)
      .on('mouseout', hideTooltip);

    // Draw x-axis
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.format('d'))
      .tickSizeOuter(0)
      .tickSizeInner(-height);

    svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(${padding}, ${height + padding})`)
      .call(xAxis);

    // Draw y-axis
    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((d) => d3.timeFormat('%B')(new Date(0, d))) // Format month names
      .tickSizeOuter(0);

    svg
      .append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding}, ${padding})`)
      .call(yAxis);

    // Draw legend
    const legendWidth = 200;
    const legendHeight = 20;
    const legendRectWidth = legendWidth / colors.length;

    const legendSvg = d3
      .select('#legend')
      .append('svg')
      .attr('width', legendWidth)
      .attr('height', legendHeight);

    legendSvg
      .selectAll('.legend-rect')
      .data(colors)
      .enter()
      .append('rect')
      .attr('class', 'legend-rect')
      .attr('x', (d, i) => i * legendRectWidth)
      .attr('y', 0)
      .attr('width', legendRectWidth)
      .attr('height', legendHeight)
      .attr('fill', (d) => d);

    // Helper functions for tooltip
    function showTooltip(event, d) {
      const tooltip = document.getElementById('tooltip');
      tooltip.dataset.year = d.year; // Add the "data-year" property
      tooltip.innerHTML = `
            Year: ${d.year}<br>
            Month: ${d3.timeFormat('%B')(new Date(0, d.month - 1))}<br>
            Temperature: ${baseTemperature + d.variance}&#8451;
          `;
      tooltip.style.display = 'block';
      tooltip.style.left = event.pageX + 10 + 'px';
      tooltip.style.top = event.pageY - 10 + 'px';
    }

    function hideTooltip() {
      const tooltip = document.getElementById('tooltip');
      tooltip.style.display = 'none';
    }
  }
});
