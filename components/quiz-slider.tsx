'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface QuizSliderProps {
  value: number;
  onChange: (value: number) => void;
  onComplete?: () => void;
  questionNumber: number;
}

const labels = [
  'Never true',
  'Rarely true',
  'Sometimes true',
  'Mostly true',
  'Always true'
];

export function QuizSlider({ value, onChange, onComplete, questionNumber }: QuizSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseUp = () => {
    setIsDragging(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        {labels.map((label, i) => (
          <span key={i} className={value === i + 1 ? 'text-primary font-semibold' : ''}>
            {i + 1}
          </span>
        ))}
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={handleMouseUp}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={handleTouchEnd}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-track"
          style={{
            background: `linear-gradient(to right, 
              rgba(138, 43, 226, 0.3) 0%, 
              rgba(138, 43, 226, 0.6) ${((value - 1) / 4) * 100}%, 
              rgba(138, 43, 226, 0.1) ${((value - 1) / 4) * 100}%, 
              rgba(138, 43, 226, 0.1) 100%)`
          }}
        />
        
        {isDragging && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
            style={{ left: `${((value - 1) / 4) * 100}%` }}
          >
            {value}
          </motion.div>
        )}
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{labels[0]}</span>
        <span className={value > 0 ? 'text-primary font-semibold' : ''}>{labels[value - 1]}</span>
        <span>{labels[4]}</span>
      </div>

      <style jsx>{`
        .slider-track::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8a2be2, #00ffff);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
          transition: all 0.3s ease;
        }
        
        .slider-track::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        }
        
        .slider-track::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #8a2be2, #00ffff);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
          transition: all 0.3s ease;
        }
        
        .slider-track::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        }
      `}</style>
    </div>
  );
}

