'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mapIMII } from '@/lib/scoring';
import { getFeedback } from '@/lib/feedback';
import type { Position } from '@/lib/types';

interface InteractiveQuadrantProps {
  comm50: number;
  trust50: number;
  onPositionChange?: (comm: number, trust: number) => void;
  isCompact?: boolean;
}

// All 25 representative positions (5x5 grid)
const ALL_POSITIONS = [
  // Row 0 (comm: 0-10)
  { comm: 5, trust: 5 }, { comm: 5, trust: 18 }, { comm: 5, trust: 31 }, { comm: 5, trust: 40 }, { comm: 5, trust: 47 },
  // Row 1 (comm: 13-19)
  { comm: 16, trust: 5 }, { comm: 16, trust: 18 }, { comm: 16, trust: 31 }, { comm: 16, trust: 40 }, { comm: 16, trust: 47 },
  // Row 2 (comm: 22-28)
  { comm: 25, trust: 5 }, { comm: 25, trust: 18 }, { comm: 25, trust: 31 }, { comm: 25, trust: 40 }, { comm: 25, trust: 47 },
  // Row 3 (comm: 29-37)
  { comm: 33, trust: 5 }, { comm: 33, trust: 18 }, { comm: 33, trust: 31 }, { comm: 33, trust: 40 }, { comm: 33, trust: 47 },
  // Row 4 (comm: 38-50)
  { comm: 44, trust: 5 }, { comm: 44, trust: 18 }, { comm: 44, trust: 31 }, { comm: 44, trust: 40 }, { comm: 44, trust: 47 },
];

export function InteractiveQuadrant({ comm50, trust50, onPositionChange, isCompact = false }: InteractiveQuadrantProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredPosition, setHoveredPosition] = useState<{ comm: number; trust: number; position: Position } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  // Responsive sizing
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const size = isMobile ? 350 : (isCompact ? 400 : 500);
  const padding = isMobile ? 50 : 60;
  const chartSize = size - padding * 2;

  // Get canvas position from scores
  const getCanvasPosition = useCallback((comm: number, trust: number) => {
    const x = padding + (trust / 50) * chartSize;
    const y = size - padding - (comm / 50) * chartSize;
    return { x, y };
  }, [chartSize, padding, size]);

  // Get scores from canvas position
  const getScoresFromCanvas = useCallback((canvasX: number, canvasY: number) => {
    const trust = Math.round(((canvasX - padding) / chartSize) * 50);
    const comm = Math.round(((size - padding - canvasY) / chartSize) * 50);
    return {
      comm: Math.max(0, Math.min(50, comm)),
      trust: Math.max(0, Math.min(50, trust))
    };
  }, [chartSize, padding, size]);

  // Snap to nearest grid position
  const snapToGrid = useCallback((comm: number, trust: number) => {
    let nearest = ALL_POSITIONS[0];
    let minDist = Infinity;
    
    ALL_POSITIONS.forEach(pos => {
      const dist = Math.sqrt(Math.pow(pos.comm - comm, 2) + Math.pow(pos.trust - trust, 2));
      if (dist < minDist) {
        minDist = dist;
        nearest = pos;
      }
    });
    
    return nearest;
  }, []);

  // Handle mouse/touch drag
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const currentPos = getCanvasPosition(comm50, trust50);
    const distance = Math.sqrt(Math.pow(x - currentPos.x, 2) + Math.pow(y - currentPos.y, 2));

    // Only start dragging if clicking near the dot (within 30px)
    if (distance < 30) {
      setIsDragging(true);
      canvas.setPointerCapture(e.pointerId);
    }
  }, [comm50, trust50, getCanvasPosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (isDragging) {
      const scores = getScoresFromCanvas(x, y);
      const snapped = snapToGrid(scores.comm, scores.trust);
      onPositionChange?.(snapped.comm, snapped.trust);
    } else {
      // Check if hovering over a position node
      const hoveredNode = ALL_POSITIONS.find(pos => {
        const canvasPos = getCanvasPosition(pos.comm, pos.trust);
        const dist = Math.sqrt(Math.pow(x - canvasPos.x, 2) + Math.pow(y - canvasPos.y, 2));
        return dist < 15;
      });

      if (hoveredNode) {
        const result = mapIMII(
          Math.round((hoveredNode.comm / 50) * 70),
          Math.round((hoveredNode.trust / 50) * 65)
        );
        setHoveredPosition({ ...hoveredNode, position: result.position });
      } else {
        setHoveredPosition(null);
      }
    }
  }, [isDragging, getScoresFromCanvas, snapToGrid, onPositionChange, getCanvasPosition]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      canvas.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    } else {
      // Handle click on position node
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      const clickedNode = ALL_POSITIONS.find(pos => {
        const canvasPos = getCanvasPosition(pos.comm, pos.trust);
        const dist = Math.sqrt(Math.pow(x - canvasPos.x, 2) + Math.pow(y - canvasPos.y, 2));
        return dist < 15;
      });

      if (clickedNode) {
        onPositionChange?.(clickedNode.comm, clickedNode.trust);
      }
    }
  }, [isDragging, getCanvasPosition, onPositionChange]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Background gradient
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(138, 43, 226, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0.02)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Quadrant backgrounds
    const quadrants = [
      { x: padding, y: size / 2, color: 'rgba(255, 100, 100, 0.08)' }, // Disengaged Mind
      { x: padding, y: padding, color: 'rgba(100, 150, 255, 0.08)' }, // Skeptical Explorer
      { x: size / 2, y: size / 2, color: 'rgba(255, 200, 100, 0.08)' }, // Faithful Seeker
      { x: size / 2, y: padding, color: 'rgba(100, 255, 150, 0.08)' }, // Integrated Alchemist
    ];

    quadrants.forEach(q => {
      ctx.fillStyle = q.color;
      ctx.fillRect(q.x, q.y, chartSize / 2, chartSize / 2);
    });

    // Grid lines
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.15)';
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

    // Center axes (bold)
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, size / 2);
    ctx.lineTo(size - padding, size / 2);
    ctx.moveTo(size / 2, padding);
    ctx.lineTo(size / 2, size - padding);
    ctx.stroke();

    // Cutoff lines at 26
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.3)';
    ctx.setLineDash([5, 5]);
    const cutoff = 26 / 50;
    const cutoffX = padding + cutoff * chartSize;
    const cutoffY = size - padding - cutoff * chartSize;
    ctx.beginPath();
    ctx.moveTo(cutoffX, padding);
    ctx.lineTo(cutoffX, size - padding);
    ctx.moveTo(padding, cutoffY);
    ctx.lineTo(size - padding, cutoffY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw all 25 position nodes
    ALL_POSITIONS.forEach(pos => {
      const canvasPos = getCanvasPosition(pos.comm, pos.trust);
      const isCurrentPosition = Math.abs(comm50 - pos.comm) < 4 && Math.abs(trust50 - pos.trust) < 4;
      const isHovered = hoveredPosition?.comm === pos.comm && hoveredPosition?.trust === pos.trust;

      if (!isCurrentPosition) {
        // Node circle
        ctx.fillStyle = isHovered ? 'rgba(0, 255, 255, 0.4)' : 'rgba(138, 43, 226, 0.2)';
        ctx.beginPath();
        ctx.arc(canvasPos.x, canvasPos.y, isHovered ? 8 : 5, 0, Math.PI * 2);
        ctx.fill();

        // Node ring
        if (isHovered) {
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    });

    // Draw main position dot with pulse
    const mainPos = getCanvasPosition(comm50, trust50);
    const pulse = Math.sin(Date.now() / 300) * 3;

    // Outer glow
    const glowGradient = ctx.createRadialGradient(mainPos.x, mainPos.y, 0, mainPos.x, mainPos.y, 30 + pulse);
    glowGradient.addColorStop(0, isDragging ? 'rgba(0, 255, 255, 0.8)' : 'rgba(138, 43, 226, 0.6)');
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
    dotGradient.addColorStop(0, isDragging ? 'rgba(0, 255, 255, 1)' : 'rgba(138, 43, 226, 1)');
    dotGradient.addColorStop(1, isDragging ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 255, 0.8)');
    ctx.fillStyle = dotGradient;
    ctx.beginPath();
    ctx.arc(mainPos.x, mainPos.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Animate
    const animationId = requestAnimationFrame(() => {});
    return () => cancelAnimationFrame(animationId);
  }, [comm50, trust50, isDragging, hoveredPosition, size, chartSize, padding, getCanvasPosition]);

  // Animation loop for pulse
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Trigger redraw by updating a dummy state or directly redrawing
          ctx.clearRect(0, 0, 1, 1); // Minimal touch to trigger effect
        }
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const currentResult = mapIMII(
    Math.round((comm50 / 50) * 70),
    Math.round((trust50 / 50) * 65)
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Canvas */}
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`absolute inset-0 w-full h-full glass-card rounded-xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ touchAction: 'none' }}
        />

        {/* Axis Labels */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-2">
          <div className="transform -rotate-90 text-xs font-semibold text-primary whitespace-nowrap">
            Communication →
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2">
          <div className="text-xs font-semibold text-primary whitespace-nowrap">
            Trust →
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredPosition && !isDragging && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-2 bg-cyan-500/90 backdrop-blur-sm rounded-lg text-white text-xs font-semibold shadow-lg"
          >
            {hoveredPosition.position}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag Indicator */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-lg text-white text-sm font-semibold shadow-lg"
        >
          Drag to explore • Release to select
        </motion.div>
      )}

      {/* Current Position Info */}
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground mb-1">Current Position</div>
        <div className="text-lg font-bold text-primary">{currentResult.position}</div>
        <div className="text-xs text-muted-foreground">{currentResult.quadrant}</div>
        <div className="text-xs text-muted-foreground mt-1">
          C: {comm50}/50 • T: {trust50}/50
        </div>
      </div>

      {/* Interaction Hint */}
      {!isDragging && (
        <div className="mt-3 text-center text-xs text-muted-foreground italic">
          Drag the glowing dot • Click any node • Use sliders below
        </div>
      )}
    </div>
  );
}

