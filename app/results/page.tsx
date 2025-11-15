'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { mapIMII } from '@/lib/scoring';
import { getFeedback } from '@/lib/feedback';
import { QuadrantChart } from '@/components/quadrant-chart';
import { NeuronBackground } from '@/components/neuron-background';
import { Share2, Mail, Copy, Download, RotateCcw, Sliders } from 'lucide-react';
import type { StoredResult } from '@/lib/types';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');

  const [result, setResult] = useState<StoredResult | null>(null);
  const [showPlayMode, setShowPlayMode] = useState(false);
  const [playComm, setPlayComm] = useState(0);
  const [playTrust, setPlayTrust] = useState(0);
  const [playResult, setPlayResult] = useState<ReturnType<typeof mapIMII> | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!code) {
      router.push('/');
      return;
    }

    // Try to load from localStorage first
    let storedResult = storage.getResult(code);
    
    if (!storedResult) {
      // Try API if not in localStorage
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
      setPlayComm(result.comm50);
      setPlayTrust(result.trust50);
    }
  }, [result]);

  useEffect(() => {
    if (showPlayMode) {
      // Calculate what the result would be at the play position
      const commRaw = Math.round((playComm / 50) * 70);
      const trustRaw = Math.round((playTrust / 50) * 65);
      const mapped = mapIMII(commRaw, trustRaw);
      setPlayResult(mapped);
    }
  }, [playComm, playTrust, showPlayMode]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/results?code=${code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/results?code=${code}`;
    const text = `Check out my MINDTRX Inner Mind Integration Inventory results!`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: 'MINDTRX IMII Results', text, url });
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

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl font-orbitron font-bold text-primary mb-4">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  const feedback = getFeedback(result.quadrant, result.position);

  return (
    <>
      <NeuronBackground />
      
      <div className="relative z-10 min-h-[calc(100vh-8rem)] py-8 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-6xl w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold glow-text mb-4">
              Your MINDTRX Results
            </h1>
            <div className="glass-card inline-block rounded-lg px-6 py-2">
              <span className="text-sm text-muted-foreground mr-2">Result Code:</span>
              <span className="text-lg font-mono font-bold text-primary">{code}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full overflow-hidden">
            {/* Left Column: Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full min-w-0"
            >
              <QuadrantChart
                comm50={result.comm50}
                trust50={result.trust50}
                quadrant={result.quadrant}
                position={result.position}
                ghostMode={showPlayMode}
                ghostComm={showPlayMode ? playComm : undefined}
                ghostTrust={showPlayMode ? playTrust : undefined}
              />

              {/* Play Mode Controls */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 glass-card rounded-xl p-6"
              >
                <button
                  onClick={() => setShowPlayMode(!showPlayMode)}
                  className="flex items-center justify-center w-full mb-4 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-all"
                >
                  <Sliders className="w-4 h-4 mr-2" />
                  {showPlayMode ? 'Hide' : 'Show'} Play Mode
                </button>

                {showPlayMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore how different scores would change your position:
                    </p>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Communication: {playComm}/50
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={playComm}
                        onChange={(e) => setPlayComm(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-2 block">
                        Trust: {playTrust}/50
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={playTrust}
                        onChange={(e) => setPlayTrust(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {playResult && (
                      <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <div className="text-sm text-cyan-400 font-semibold mb-1">
                          If you were here:
                        </div>
                        <div className="text-lg font-bold">{playResult.quadrant}</div>
                        <div className="text-sm text-muted-foreground">{playResult.position}</div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setPlayComm(result.comm50);
                        setPlayTrust(result.trust50);
                      }}
                      className="w-full mt-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all text-sm"
                    >
                      Reset to Your Actual Position
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Right Column: Feedback & Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Quadrant Feedback */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-orbitron font-bold mb-3">Your Quadrant</h2>
                <h3 className="text-xl text-primary font-semibold mb-3">{result.quadrant}</h3>
                <p className="text-muted-foreground">{feedback.quadrant}</p>
              </div>

              {/* Position Feedback */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-orbitron font-bold mb-3">Your Position</h2>
                <h3 className="text-xl text-primary font-semibold mb-3">{result.position}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feedback.position.short}</p>
                <p className="text-muted-foreground leading-relaxed">{feedback.position.long}</p>
              </div>

              {/* Share & Actions */}
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
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                  {emailSent && (
                    <p className="text-sm text-green-500">Email sent successfully!</p>
                  )}
                </div>
              </div>

              {/* Retake */}
              <button
                onClick={handleRetake}
                className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all electric-button"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Take Quiz Again
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-4xl font-orbitron font-bold text-primary">
          Loading...
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}

