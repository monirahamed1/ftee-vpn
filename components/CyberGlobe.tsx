import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ConnectionState, ServerLocation } from '../types';

interface CyberGlobeProps {
  connectionState: ConnectionState;
  targetLocation: ServerLocation | null;
}

const CyberGlobe: React.FC<CyberGlobeProps> = ({ connectionState, targetLocation }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = width; // Keep it square
    const sensitivity = 75;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Projection
    const projection = d3.geoOrthographic()
      .scale(width / 2 - 20)
      .center([0, 0])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create a sphere (water)
    svg.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'sphere')
      .attr('d', path)
      .attr('fill', '#0f172a') // Dark slate background
      .attr('stroke', '#0ea5e9') // Sky blue rim
      .attr('stroke-width', 1.5)
      .style('opacity', 0.5);

    // Generate random points to simulate "cyber" landmasses/nodes
    const numPoints = 300;
    const points: any[] = [];
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            (theta * 180) / Math.PI % 360, // Longitude
            (phi * 180) / Math.PI - 90    // Latitude
          ]
        }
      });
    }

    const g = svg.append('g');

    // Draw the points
    const nodes = g.selectAll('path.node')
      .data(points)
      .enter()
      .append('path')
      .attr('class', 'node')
      .attr('d', path as any)
      .attr('fill', (d, i) => i % 5 === 0 ? '#10b981' : '#0ea5e9') // Mix of emerald and sky blue
      .attr('r', 2)
      .style('opacity', 0.6);

    // Animation Loop
    let timer: any;
    let rotation = [0, -20];
    
    const animate = () => {
      // Rotate the globe
      const rotateSpeed = connectionState === ConnectionState.CONNECTED ? 0.5 : 0.2;
      rotation[0] += rotateSpeed;
      projection.rotate([rotation[0], rotation[1]]);

      // Update paths
      svg.selectAll('path.node').attr('d', path as any);
      svg.selectAll('path.sphere').attr('d', path as any);

      // Draw connection arc if connected
      if (connectionState === ConnectionState.CONNECTED && targetLocation) {
        // User (assumed at 0,0 for demo or rough location) -> Target
        // We will just rotate the globe so the target is visible eventually, 
        // but for now let's draw a "pulse" at the target location if it's visible.
        
        // Find visible points logic is complex, simplify by just projecting the target
        const center = projection(targetLocation.coordinates as [number, number]);
        
        // Remove old marker
        svg.selectAll('.target-marker').remove();
        
        // Only draw if visible (roughly on the front side)
        // d3-geo projection returns null if point is clipped? No, need to check clip.
        // Simple check: distance from center of circle.
        if (center) {
           const distance = Math.sqrt(Math.pow(center[0] - width/2, 2) + Math.pow(center[1] - height/2, 2));
           if (distance < width/2) {
             svg.append('circle')
               .attr('class', 'target-marker')
               .attr('cx', center[0])
               .attr('cy', center[1])
               .attr('r', 8)
               .attr('fill', '#10b981')
               .attr('stroke', '#fff')
               .attr('stroke-width', 2)
               .style('filter', 'drop-shadow(0 0 8px #10b981)');
               
              svg.append('circle')
               .attr('class', 'target-marker')
               .attr('cx', center[0])
               .attr('cy', center[1])
               .attr('r', 15)
               .attr('fill', 'none')
               .attr('stroke', '#10b981')
               .style('opacity', 0.5)
               .style('stroke-width', 1);
           }
        }
      }
      
      timer = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [connectionState, targetLocation]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      <svg ref={svgRef} className="max-w-full"></svg>
      {/* Overlay gradient for hologram effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none"></div>
    </div>
  );
};

export default CyberGlobe;
