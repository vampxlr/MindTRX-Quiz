'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Quadrant, Position } from '@/lib/types';

interface QuadrantChartProps {
  comm50: number;
  trust50: number;
  quadrant: Quadrant;
  position: Position;
  ghostMode?: boolean;
  ghostComm?: number;
  ghostTrust?: number;
}

export function QuadrantChart({
  comm50,
  trust50,
  quadrant,
  position,
  ghostMode = false,
  ghostComm,
  ghostTrust,
}: QuadrantChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const size = 500;
  const padding = 60;
  const chartSize = size - padding * 2;

  // Convert scores to canvas coordinates (origin bottom-left)
  const getCanvasPosition = (comm: number, trust: number) => {
    const x = padding + (trust / 50) * chartSize;
    const y = size - padding - (comm / 50) * chartSize;
    return { x, y };
  };

  const mainPos = getCanvasPosition(comm50, trust50);
  const ghostPos = ghostMode && ghostComm !== undefined && ghostTrust !== undefined
    ? getCanvasPosition(ghostComm, ghostTrust)
    : null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Background gradient
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(138, 43, 226, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Draw quadrant backgrounds
    const quadrants = [
      { name: 'Disengaged Mind', x: padding, y: size / 2, color: 'rgba(255, 100, 100, 0.1)' },
      { name: 'Skeptical Explorer', x: padding, y: padding, color: 'rgba(100, 150, 255, 0.1)' },
      { name: 'Faithful Seeker', x: size / 2, y: size / 2, color: 'rgba(255, 200, 100, 0.1)' },
      { name: 'Integrated Alchemist', x: size / 2, y: padding, color: 'rgba(100, 255, 150, 0.1)' },
    ];

    quadrants.forEach(q => {
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x, q.y, chartSize / 2, chartSize / 2);
    });

    // Draw grid lines
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.2)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 5; i++) {
      const x = padding + (i / 5) * chartSize;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, size - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i / 5) * chartSize;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(size - padding, y);
      ctx.stroke();
    }

    // Draw axes (bold center lines)
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, size / 2);
    ctx.lineTo(size - padding, size / 2);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(size / 2, padding);
    ctx.lineTo(size / 2, size - padding);
    ctx.stroke();

    // Draw cutoff lines at 26
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    const cutoff = 26 / 50;
    
    // Vertical cutoff
    const cutoffX = padding + cutoff * chartSize;
    ctx.beginPath();
    ctx.moveTo(cutoffX, padding);
    ctx.lineTo(cutoffX, size - padding);
    ctx.stroke();
    
    // Horizontal cutoff
    const cutoffY = size - padding - cutoff * chartSize;
    ctx.beginPath();
    ctx.moveTo(padding, cutoffY);
    ctx.lineTo(size - padding, cutoffY);
    ctx.stroke();
    
    ctx.setLineDash([]);

    // Draw connection line for ghost mode
    if (ghostPos) {
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(mainPos.x, mainPos.y);
      ctx.lineTo(ghostPos.x, ghostPos.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw ghost position
    if (ghostPos) {
      // Outer glow
      const glowGradient = ctx.createRadialGradient(ghostPos.x, ghostPos.y, 0, ghostPos.x, ghostPos.y, 20);
      glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
      glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(ghostPos.x, ghostPos.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Ghost dot
      ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(ghostPos.x, ghostPos.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = 'rgba(0, 255, 255, 1)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw main position with pulsing effect
    const drawMainDot = (pulse: number = 0) => {
      // Outer glow
      const glowGradient = ctx.createRadialGradient(mainPos.x, mainPos.y, 0, mainPos.x, mainPos.y, 30 + pulse);
      glowGradient.addColorStop(0, 'rgba(138, 43, 226, 0.6)');
      glowGradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(mainPos.x, mainPos.y, 30 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Inner circle
      const dotGradient = ctx.createRadialGradient(
        mainPos.x - 5,
        mainPos.y - 5,
        0,
        mainPos.x,
        mainPos.y,
        15
      );
      dotGradient.addColorStop(0, 'rgba(138, 43, 226, 1)');
      dotGradient.addColorStop(1, 'rgba(0, 255, 255, 0.8)');
      ctx.fillStyle = dotGradient;
      ctx.beginPath();
      ctx.arc(mainPos.x, mainPos.y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // Animate pulse
    let pulseFrame = 0;
    const animate = () => {
      pulseFrame++;
      const pulse = Math.sin(pulseFrame * 0.05) * 5;
      
      // Redraw everything
      ctx.clearRect(0, 0, size, size);
      
      // Redraw background
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      // Redraw quadrants
      quadrants.forEach(q => {
        ctx.fillStyle = q.color;
        ctx.fillRect(q.x, q.y, chartSize / 2, chartSize / 2);
      });
      
      // Redraw grid and axes (simplified for animation)
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const x = padding + (i / 5) * chartSize;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, size - padding);
        ctx.stroke();
        
        const y = padding + (i / 5) * chartSize;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(size - padding, y);
        ctx.stroke();
      }
      
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, size / 2);
      ctx.lineTo(size - padding, size / 2);
      ctx.moveTo(size / 2, padding);
      ctx.lineTo(size / 2, size - padding);
      ctx.stroke();
      
      // Cutoffs
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.4)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(cutoffX, padding);
      ctx.lineTo(cutoffX, size - padding);
      ctx.moveTo(padding, cutoffY);
      ctx.lineTo(size - padding, cutoffY);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Ghost line and dot
      if (ghostPos) {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(mainPos.x, mainPos.y);
        ctx.lineTo(ghostPos.x, ghostPos.y);
        ctx.stroke();
        ctx.setLineDash([]);
        
        const glowGradient = ctx.createRadialGradient(ghostPos.x, ghostPos.y, 0, ghostPos.x, ghostPos.y, 20);
        glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(ghostPos.x, ghostPos.y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(ghostPos.x, ghostPos.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 255, 255, 1)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      drawMainDot(pulse);
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [comm50, trust50, ghostComm, ghostTrust, ghostMode, chartSize, mainPos, ghostPos]);

  const quadrantLabels = [
    { name: 'Disengaged\nMind', x: '25%', y: '75%', align: 'center' },
    { name: 'Skeptical\nExplorer', x: '25%', y: '25%', align: 'center' },
    { name: 'Faithful\nSeeker', x: '75%', y: '75%', align: 'center' },
    { name: 'Integrated\nAlchemist', x: '75%', y: '25%', align: 'center' },
  ];

  return (
    <div className="space-y-4 md:space-y-6 w-full overflow-hidden">
      <div className="w-full max-w-[520px] mx-auto px-3 md:px-4">
        {/* Mobile: Y-Axis Label on Top */}
        <div className="md:hidden text-center text-[11px] font-semibold text-primary mb-3">
          Communication with the Inner Mind ↑
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full">
          {/* Desktop: Y-Axis Label on Left */}
          <div className="hidden md:flex flex-shrink-0 items-center justify-center" style={{ width: '24px' }}>
            <div className="transform -rotate-90 text-xs font-semibold text-primary whitespace-nowrap origin-center">
              Communication with the Inner Mind ↑
            </div>
          </div>
          
          <div className="relative flex-1 w-full min-w-0">
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '100%' }}>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full glass-card rounded-lg md:rounded-xl"
              />
              
              {/* Quadrant Labels */}
              {quadrantLabels.map((label, i) => (
                <div
                  key={i}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
                  style={{ left: label.x, top: label.y }}
                >
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-muted-foreground opacity-60 whitespace-pre-line leading-tight">
                    {label.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* X-Axis Label (Bottom, centered under chart) */}
        <div className="text-center mt-2 md:mt-3 md:ml-6 text-[11px] md:text-xs font-semibold text-primary">
          Trust in the Inner Mind →
        </div>
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="text-sm text-muted-foreground mb-1">Communication</div>
          <div className="text-3xl font-bold text-primary">{comm50}<span className="text-lg text-muted-foreground">/50</span></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="text-sm text-muted-foreground mb-1">Trust</div>
          <div className="text-3xl font-bold text-primary">{trust50}<span className="text-lg text-muted-foreground">/50</span></div>
        </motion.div>
      </div>

      {/* Position Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6 text-center"
      >
        <div className="text-sm text-muted-foreground mb-2">Your Quadrant</div>
        <div className="text-2xl font-sans font-bold text-primary mb-3">{quadrant}</div>
        <div className="text-lg font-semibold">{position}</div>
      </motion.div>
    </div>
  );
}

