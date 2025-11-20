'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { quizQuestions, sectionInfo } from '@/lib/questions';
import { calculateRawScores, mapIMII } from '@/lib/scoring';
import { storage } from '@/lib/storage';
import { generateResultCode } from '@/lib/hash';
import { QuizSlider } from '@/components/quiz-slider';
import { NeuronBackground } from '@/components/neuron-background';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { QuizAnswers, StoredResult } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoProgressEnabled, setAutoProgressEnabled] = useState(true);

  // Load saved progress
  useEffect(() => {
    const saved = storage.getQuizProgress();
    if (saved) {
      setAnswers(saved);
    }
  }, []);

  // Initialize default answer (3) for current question if not answered
  useEffect(() => {
    const currentQ = quizQuestions[currentQuestion];
    if (answers[currentQ.id] === undefined) {
      setAnswers(prev => ({ ...prev, [currentQ.id]: 3 }));
    }
  }, [currentQuestion, answers]);

  // Autosave on answer change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      storage.saveQuizProgress(answers);
    }
  }, [answers]);

  const currentQ = quizQuestions[currentQuestion];
  const progress = (Object.keys(answers).length / quizQuestions.length) * 100;
  const isCurrentAnswered = answers[currentQ.id] !== undefined;
  const canGoNext = currentQuestion < quizQuestions.length - 1;
  const canGoPrev = currentQuestion > 0;
  const isComplete = Object.keys(answers).length === quizQuestions.length;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: value }));
  };

  const handleAnswerComplete = () => {
    // Called when user finishes selecting an answer (releases slider)
    if (autoProgressEnabled && canGoNext) {
      // Small delay to allow the answer to be saved
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 150);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      // Save current answer if not already saved
      if (answers[currentQ.id] === undefined) {
        setAnswers(prev => ({ ...prev, [currentQ.id]: 3 }));
      }
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleProgressBarClick = () => {
    if (autoProgressEnabled && canGoNext) {
      handleNext();
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isComplete || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Calculate scores
      const { commRaw, trustRaw } = calculateRawScores(answers);
      const result = mapIMII(commRaw, trustRaw);

      // Generate code and create stored result
      const code = generateResultCode();
      const storedResult: StoredResult = {
        ...result,
        code,
        answers,
      };

      // Save to localStorage
      storage.saveResult(storedResult);
      storage.clearQuizProgress();

      // Also send to API (optional)
      try {
        await fetch('/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(storedResult),
        });
      } catch (err) {
        // API is optional, continue anyway
        console.log('API save failed, using localStorage only');
      }

      // Navigate to results
      router.push(`/results?code=${code}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsSubmitting(false);
    }
  };

  // Determine current section
  const currentSection = currentQ.section;
  const sectionQuestions = quizQuestions.filter(q => q.section === currentSection);
  const sectionProgress = sectionQuestions.filter(q => answers[q.id] !== undefined).length;

  return (
    <>
      <NeuronBackground />
      
      <div className="relative z-10 min-h-[calc(100vh-8rem)] py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoProgressEnabled}
                    onChange={(e) => setAutoProgressEnabled(e.target.checked)}
                    className="w-4 h-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-xs text-muted-foreground">Auto-progress</span>
                </label>
                <span className="text-primary font-semibold">
                  {Math.round(progress)}% Complete
                </span>
              </div>
            </div>
            <div 
              className={`h-2 bg-secondary rounded-full overflow-hidden ${autoProgressEnabled ? 'cursor-pointer hover:opacity-80' : ''}`}
              onClick={handleProgressBarClick}
              title={autoProgressEnabled ? 'Click to advance to next question' : ''}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Section Info */}
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-4 mb-6"
          >
            <h2 className="text-lg font-sans font-semibold text-primary mb-1">
              Section {currentSection === 'communication' ? '1' : '2'}: {sectionInfo[currentSection].title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {sectionInfo[currentSection].description}
            </p>
            <div className="mt-2 text-xs text-muted-foreground">
              Progress: {sectionProgress} / {sectionQuestions.length}
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-8 mb-8"
            >
              <div className="mb-6">
                <span className="text-sm text-primary font-semibold">
                  Question {currentQ.id}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold mt-2 mb-4">
                  {currentQ.text}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Rate from 1 (Rarely/Never true) to 5 (Very true)
                </p>
              </div>

              <QuizSlider
                value={answers[currentQ.id] || 3}
                onChange={handleAnswer}
                onComplete={handleAnswerComplete}
                questionNumber={currentQ.id}
              />

              {isCurrentAnswered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex items-center text-sm text-primary"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Answer saved
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="flex items-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed electric-button"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            {isComplete ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all electric-button shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'View Results'}
                <CheckCircle className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed electric-button"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

