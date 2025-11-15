'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NeuronBackground } from '@/components/neuron-background';
import { Brain, Sparkles, Target, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <NeuronBackground />
      
      <div className="relative z-10 min-h-[calc(100vh-8rem)] flex items-center">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl font-orbitron font-black glow-text mb-4">
                MINDTRX
              </h1>
              <p className="text-xl md:text-2xl text-primary font-semibold">
                Inner Mind Integration Inventory
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Discover the depth of your relationship with your inner mind. 
              Explore how you communicate with and trust your deepest wisdom through 
              this comprehensive 27-item assessment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-16"
            >
              <Link
                href="/quiz"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all electric-button shadow-lg hover:shadow-xl hover:scale-105"
              >
                Begin Your Journey
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">27 Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive assessment across communication and trust dimensions
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">16 Positions</h3>
                <p className="text-sm text-muted-foreground">
                  Precise mapping across four quadrants of inner mind integration
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 hover:scale-105 transition-transform">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Actionable Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized feedback and guidance for your growth journey
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 glass-card rounded-xl p-8 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-orbitron font-bold mb-4">What You'll Discover</h2>
              <ul className="text-left space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Your current level of <strong>Communication with the Inner Mind</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Your degree of <strong>Trust in the Inner Mind</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Your unique position within the <strong>IMII v2 framework</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Personalized insights and <strong>next steps</strong> for integration</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

