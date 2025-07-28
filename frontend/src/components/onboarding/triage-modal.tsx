'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Sparkles, Zap } from 'lucide-react'

interface TriageModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (context: string) => void
}

type Step = 'welcome' | 'clarification' | 'completion'

export function TriageModal({ isOpen, onClose, onComplete }: TriageModalProps) {
  const [step, setStep] = useState<Step>('welcome')
  const [userInput, setUserInput] = useState('')
  const [clarificationQuestion, setClarificationQuestion] = useState('')
  const [clarificationAnswer, setClarificationAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('welcome')
      setUserInput('')
      setClarificationQuestion('')
      setClarificationAnswer('')
      setIsLoading(false)
    }
  }, [isOpen])

  const handleWelcomeSubmit = async () => {
    if (!userInput.trim()) return

    setIsLoading(true)
    
    // Simulate AI processing and potential clarification
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // For demo purposes, randomly decide if clarification is needed
    const needsClarification = Math.random() > 0.5
    
    if (needsClarification) {
      setClarificationQuestion("What specific part of your automation workflow is causing the most friction?")
      setStep('clarification')
    } else {
      setStep('completion')
    }
    
    setIsLoading(false)
  }

  const handleClarificationSubmit = async () => {
    if (!clarificationAnswer.trim()) return

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setStep('completion')
    setIsLoading(false)
  }

  const handleComplete = () => {
    const context = clarificationAnswer 
      ? `${userInput}\n\nAdditional context: ${clarificationAnswer}`
      : userInput
    
    onComplete(context)
    onClose()
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.3
      }
    },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-[var(--background-secondary)]/90 backdrop-blur-xl border border-[var(--border-primary)] rounded-2xl shadow-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-[var(--border-primary)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                      Welcome to TriggerStack
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Let's solve your GHL frustrations
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-[var(--surface-glass)] hover:bg-[var(--surface-hover)] border border-[var(--border-primary)] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-[var(--text-secondary)]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === 'welcome' && (
                  <motion.div
                    key="welcome"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-tertiary)] rounded-2xl flex items-center justify-center mx-auto">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                          What's your biggest automation challenge?
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                          Tell us about the GHL automation that's been giving you headaches. 
                          We'll help you find the perfect solution.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Describe your automation challenge in detail..."
                        className="w-full h-32 p-4 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--aurora-primary)]/50 focus:border-[var(--aurora-primary)]/50 transition-all"
                        disabled={isLoading}
                      />
                      
                      <button
                        onClick={handleWelcomeSubmit}
                        disabled={!userInput.trim() || isLoading}
                        className="w-full h-12 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[var(--aurora-primary)]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Continue</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 'clarification' && (
                  <motion.div
                    key="clarification"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[var(--aurora-secondary)] to-[var(--aurora-tertiary)] rounded-2xl flex items-center justify-center mx-auto">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                          One quick clarification
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                          {clarificationQuestion}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <textarea
                        value={clarificationAnswer}
                        onChange={(e) => setClarificationAnswer(e.target.value)}
                        placeholder="Your answer..."
                        className="w-full h-24 p-4 bg-[var(--surface-glass)] border border-[var(--border-primary)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-tertiary)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--aurora-primary)]/50 focus:border-[var(--aurora-primary)]/50 transition-all"
                        disabled={isLoading}
                      />
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setStep('completion')}
                          className="flex-1 h-12 bg-[var(--surface-glass)] border border-[var(--border-primary)] text-[var(--text-secondary)] rounded-xl font-medium hover:bg-[var(--surface-hover)] transition-colors"
                        >
                          Skip
                        </button>
                        <button
                          onClick={handleClarificationSubmit}
                          disabled={!clarificationAnswer.trim() || isLoading}
                          className="flex-1 h-12 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-secondary)] text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[var(--aurora-primary)]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>Continue</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'completion' && (
                  <motion.div
                    key="completion"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[var(--aurora-tertiary)] to-[var(--aurora-primary)] rounded-2xl flex items-center justify-center mx-auto">
                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                          Perfect! Let's get started
                        </h3>
                        <p className="text-[var(--text-secondary)]">
                          We've got everything we need to help you build amazing automations. 
                          Your AI companion is ready to assist you.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleComplete}
                      className="w-full h-12 bg-gradient-to-r from-[var(--aurora-primary)] to-[var(--aurora-tertiary)] text-white rounded-xl font-medium flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-[var(--aurora-primary)]/25 transition-all"
                    >
                      <span>Enter TriggerStack</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}