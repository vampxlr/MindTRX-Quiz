'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { storage } from '@/lib/storage';
import { mapIMII } from '@/lib/scoring';
import { getFeedback } from '@/lib/feedback';
import { InteractiveQuadrant } from '@/components/interactive-quadrant';
import { NeuronBackground } from '@/components/neuron-background';
import { 
  Share2, Mail, Copy, RotateCcw, Pin, PinOff, 
  ChevronDown, ChevronUp, Maximize2, Minimize2 
} from 'lucide-react';
import type { StoredResult } from '@/lib/types';

export function ResultsRedesign() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  const [result, setResult] = useState<StoredResult | null>(null);
  const [exploreComm, setExploreComm] = useState(0);
  const [exploreTrust, setExploreTrust] = useState(0);
  const [isPinned, setIsPinned] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!code) {
      router.push('/');
      return;
    }

    let storedResult = storage.getResult(code);
    
    if (!storedResult) {
      fetch(`/api/results?code=${code}`)
        .then(res => res.json())
        .then(data => {
          if (data.result) {
            setResult(data.result);
          } else {
            router.push('/');
          }
        })
        .catch(() => {
          router.push('/');
        });
    } else {
      setResult(storedResult);
    }
  }, [code, router]);

  useEffect(() => {
    if (result) {
      setExploreComm(result.comm50);
      setExploreTrust(result.trust50);
    }
  }, [result]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/results?code=${code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/results?code=${code}`;
    const text = `Check out my Inner Mind Integration Inventory Report!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Inner Mind Integration Inventory Report', text, url });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleSendEmail = async () => {
    if (!email || !result || !code) return;
    
    setEmailSending(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, result }),
      });

      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          setEmail('');
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setEmailSending(false);
    }
  };

  const handleRetake = () => {
    storage.clearQuizProgress();
    router.push('/quiz');
  };

  const handlePositionChange = (comm: number, trust: number) => {
    setExploreComm(comm);
    setExploreTrust(trust);
  };

  const handleResetToActual = () => {
    if (result) {
      setExploreComm(result.comm50);
      setExploreTrust(result.trust50);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl font-sans font-bold text-primary mb-4">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const exploreResult = mapIMII(
    Math.round((exploreComm / 50) * 70),
    Math.round((exploreTrust / 50) * 65)
  );
  const feedback = getFeedback(exploreResult.quadrant, exploreResult.position);
  const isExploring = exploreComm !== result.comm50 || exploreTrust !== result.trust50;

  return (
    <>
      <NeuronBackground />
      
      <div className="relative z-10 min-h-[calc(100vh-8rem)] py-4 md:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-5xl font-sans font-bold glow-text mb-3">
              Inner Mind Integration Inventory Report
            </h1>
            <div className="glass-card inline-block rounded-lg px-4 py-2">
              <span className="text-xs text-muted-foreground mr-2">Result Code:</span>
              <span className="text-lg font-mono font-bold text-primary">{code}</span>
            </div>
          </motion.div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* LEFT: Interactive Quadrant Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`relative ${isPinned ? 'lg:sticky lg:top-4 lg:self-start' : ''}`}
            >
              <AnimatePresence mode="wait">
                {isPinned ? (
                  <motion.div
                    key="pinned"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="glass-card rounded-2xl p-4 md:p-6 relative"
                  >
                    {/* Pin/Unpin Toggle */}
                    <button
                      onClick={() => setIsPinned(false)}
                      className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all"
                      title="Unpin to focus on reading"
                    >
                      {isExpanded ? <Minimize2 className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
                    </button>

                    {/* Interactive Quadrant */}
                    <div className="mb-6">
                      <InteractiveQuadrant
                        comm50={exploreComm}
                        trust50={exploreTrust}
                        onPositionChange={handlePositionChange}
                        isCompact={false}
                      />
                    </div>

                    {/* Integrated Sliders */}
                    <div className="space-y-4 px-2">
                      <div>
                        <label htmlFor="explore-comm-slider" className="text-sm font-semibold mb-2 block flex justify-between">
                          <span>Communication</span>
                          <span className="text-primary">{exploreComm}/50</span>
                        </label>
                        <input
                          id="explore-comm-slider"
                          type="range"
                          min="0"
                          max="50"
                          value={exploreComm}
                          onChange={(e) => setExploreComm(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, 
                              rgba(138, 43, 226, 0.8) 0%, 
                              rgba(138, 43, 226, 0.8) ${(exploreComm / 50) * 100}%, 
                              rgba(138, 43, 226, 0.2) ${(exploreComm / 50) * 100}%, 
                              rgba(138, 43, 226, 0.2) 100%)`
                          }}
                          aria-label="Communication score slider"
                        />
                      </div>

                      <div>
                        <label htmlFor="explore-trust-slider" className="text-sm font-semibold mb-2 block flex justify-between">
                          <span>Trust</span>
                          <span className="text-primary">{exploreTrust}/50</span>
                        </label>
                        <input
                          id="explore-trust-slider"
                          type="range"
                          min="0"
                          max="50"
                          value={exploreTrust}
                          onChange={(e) => setExploreTrust(Number(e.target.value))}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, 
                              rgba(0, 255, 255, 0.8) 0%, 
                              rgba(0, 255, 255, 0.8) ${(exploreTrust / 50) * 100}%, 
                              rgba(0, 255, 255, 0.2) ${(exploreTrust / 50) * 100}%, 
                              rgba(0, 255, 255, 0.2) 100%)`
                          }}
                          aria-label="Trust score slider"
                        />
                      </div>

                      {/* Reset Button */}
                      {isExploring && (
                        <motion.button
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={handleResetToActual}
                          className="w-full px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 transition-all text-sm font-semibold"
                        >
                          Reset to Your Actual Position
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unpinned"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card rounded-2xl p-6 text-center"
                  >
                    <Pin className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map Hidden</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Focus on reading your results without distractions
                    </p>
                    <button
                      onClick={() => setIsPinned(true)}
                      className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold"
                    >
                      Show Interactive Map
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sticky Pin Button for Mobile */}
              {!isPinned && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 transition-transform lg:hidden"
                  onClick={() => setIsPinned(true)}
                >
                  <Pin className="w-6 h-6" />
                </motion.button>
              )}
            </motion.div>

            {/* RIGHT: Dynamic Description Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Exploration Indicator */}
              {isExploring && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl p-4 bg-cyan-500/10 border border-cyan-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-cyan-400 font-semibold mb-1">
                        🔍 Exploring Position
                      </div>
                      <div className="text-xs text-muted-foreground">
                        This is not your actual result • Use Reset button to return
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quadrant & Position Info */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-sans font-bold mb-4">
                  {isExploring ? 'Exploring' : 'Your Position'}
                </h2>
                <div className="mb-4">
                  <h3 className="text-xl text-primary font-semibold mb-2">{exploreResult.position}</h3>
                  <p className="text-sm text-muted-foreground italic">{exploreResult.quadrant}</p>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-muted-foreground mb-3 italic">
                    {feedback.position.summary}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {feedback.position.detailed}
                  </p>
                </div>

                {/* Growth Guidance */}
                {feedback.position.growth && !isExploring && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="text-lg font-semibold mb-3 text-primary">Growth Pathway</h4>
                    <div className="prose prose-sm max-w-none">
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                        {feedback.position.growth}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quadrant Understanding */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-xl font-sans font-bold mb-3">
                  Understanding This Quadrant
                </h2>
                <h3 className="text-lg text-primary font-semibold mb-2">{exploreResult.quadrant}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getFeedback(exploreResult.quadrant, exploreResult.position).quadrant.detailed}
                </p>
              </div>

              {/* Share & Actions */}
              {!isExploring && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-4">Share Your Results</h2>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground border border-border focus:border-primary focus:outline-none"
                      />
                      <button
                        onClick={handleSendEmail}
                        disabled={!email || emailSending}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Send email"
                        title="Send results via email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                    {emailSent && (
                      <p className="text-sm text-green-500">Email sent successfully!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Retake */}
              {!isExploring && (
                <button
                  onClick={handleRetake}
                  className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all electric-button"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Take Quiz Again
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"] {
          transition: all 0.3s ease;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8a2be2, #00ffff);
          cursor: grab;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input[type="range"]:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.3);
          box-shadow: 0 0 25px rgba(138, 43, 226, 1);
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #8a2be2, #00ffff);
          cursor: grab;
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        input[type="range"]:active::-moz-range-thumb {
          cursor: grabbing;
          transform: scale(1.3);
          box-shadow: 0 0 25px rgba(138, 43, 226, 1);
        }
        
        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(138, 43, 226, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 16px rgba(138, 43, 226, 0.8));
          }
        }

        .glass-card {
          animation: glow-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

