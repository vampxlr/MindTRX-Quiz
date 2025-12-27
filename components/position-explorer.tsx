'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mapIMII } from '@/lib/scoring';
import { getFeedback } from '@/lib/feedback';

interface PositionExplorerProps {
  currentComm: number;
  currentTrust: number;
  onPositionSelect?: (comm: number, trust: number) => void;
}

// Define all 16 positions on the grid (4x4 bands)
const positionGrid = [
  // Row 1 (comm: highHigh, 38-50)
  { comm: 44, trust: 6, row: 0, col: 0 },
  { comm: 44, trust: 19, row: 0, col: 1 },
  { comm: 44, trust: 32, row: 0, col: 2 },
  { comm: 44, trust: 44, row: 0, col: 3 },
  
  // Row 2 (comm: highLow, 26-38)
  { comm: 32, trust: 6, row: 1, col: 0 },
  { comm: 32, trust: 19, row: 1, col: 1 },
  { comm: 32, trust: 32, row: 1, col: 2 },
  { comm: 32, trust: 44, row: 1, col: 3 },
  
  // Row 3 (comm: lowHigh, 13-25)
  { comm: 19, trust: 6, row: 2, col: 0 },
  { comm: 19, trust: 19, row: 2, col: 1 },
  { comm: 19, trust: 32, row: 2, col: 2 },
  { comm: 19, trust: 44, row: 2, col: 3 },
  
  // Row 4 (comm: lowLow, 0-12)
  { comm: 6, trust: 6, row: 3, col: 0 },
  { comm: 6, trust: 19, row: 3, col: 1 },
  { comm: 6, trust: 32, row: 3, col: 2 },
  { comm: 6, trust: 44, row: 3, col: 3 },
];

export function PositionExplorer({ currentComm, currentTrust, onPositionSelect }: PositionExplorerProps) {
  const [hoveredPosition, setHoveredPosition] = useState<{ comm: number; trust: number } | null>(null);
  
  const currentResult = mapIMII(
    Math.round((currentComm / 50) * 70),
    Math.round((currentTrust / 50) * 65)
  );
  
  const hoveredResult = hoveredPosition
    ? mapIMII(
        Math.round((hoveredPosition.comm / 50) * 70),
        Math.round((hoveredPosition.trust / 50) * 65)
      )
    : null;
  
  const hoveredFeedback = hoveredResult ? getFeedback(hoveredResult.quadrant, hoveredResult.position) : null;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        <p className="mb-2">
          Explore different positions on the map. Hover over any position to see its name and description.
        </p>
        <p className="text-xs opacity-75">
          The grid shows representative positions across all four quadrants and intensity levels.
        </p>
      </div>

      {/* Position Grid */}
      <div className="glass-card rounded-xl p-6">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {positionGrid.map((pos, idx) => {
            const result = mapIMII(
              Math.round((pos.comm / 50) * 70),
              Math.round((pos.trust / 50) * 65)
            );
            
            const isCurrentPosition = 
              Math.abs(currentComm - pos.comm) < 7 && 
              Math.abs(currentTrust - pos.trust) < 7;
            
            const isHovered = 
              hoveredPosition?.comm === pos.comm && 
              hoveredPosition?.trust === pos.trust;

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPositionSelect?.(pos.comm, pos.trust)}
                onMouseEnter={() => setHoveredPosition(pos)}
                onMouseLeave={() => setHoveredPosition(null)}
                className={`
                  relative p-3 rounded-lg text-xs font-semibold transition-all
                  ${isCurrentPosition 
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : isHovered
                    ? 'bg-primary/30 text-primary'
                    : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground'
                  }
                `}
              >
                <div className="text-[10px] opacity-60 mb-1">
                  C:{pos.comm} T:{pos.trust}
                </div>
                <div className="leading-tight line-clamp-2">
                  {result.position}
                </div>
                {isCurrentPosition && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Grid Labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
          <span>Low Trust →</span>
          <span>← High Trust</span>
        </div>
        <div className="text-xs text-muted-foreground text-center mt-2">
          ↑ High Communication | Low Communication ↓
        </div>
      </div>

      {/* Hovered Position Info */}
      <AnimatePresence mode="wait">
        {hoveredFeedback && hoveredResult && (
          <motion.div
            key={hoveredResult.position}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-xl p-4 bg-cyan-500/10 border border-cyan-500/30"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-lg font-bold text-cyan-400">{hoveredResult.position}</h4>
                <p className="text-xs text-muted-foreground">{hoveredResult.quadrant}</p>
              </div>
              <div className="text-right text-xs">
                <div>Comm: {hoveredResult.comm50}/50</div>
                <div>Trust: {hoveredResult.trust50}/50</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {hoveredFeedback.position.summary}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Position Summary */}
      <div className="glass-card rounded-xl p-4 bg-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Your Current Position</div>
            <div className="text-lg font-bold text-primary">{currentResult.position}</div>
            <div className="text-xs text-muted-foreground">{currentResult.quadrant}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{currentComm}</div>
            <div className="text-xs text-muted-foreground">Communication</div>
            <div className="text-2xl font-bold text-primary mt-2">{currentTrust}</div>
            <div className="text-xs text-muted-foreground">Trust</div>
          </div>
        </div>
      </div>
    </div>
  );
}

