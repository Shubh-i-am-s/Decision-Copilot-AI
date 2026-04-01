import React, { useState } from 'react';
import { Sparkles, Brain, ArrowRight, ArrowLeft, Globe, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  { id: 'why', label: 'Why are you considering this decision?' },
  { id: 'fear', label: 'What is your biggest fear regarding this?' },
  { id: 'outcome', label: 'What outcome do you actually want?' },
  { id: 'constraints', label: 'What constraints do you have? (money, time, family, etc.)' },
  { id: 'urgency', label: 'How urgent is this decision? (1–5 scale)' }
];

export default function DecisionInput({ onGenerate, loading }) {
  const [step, setStep] = useState(0); // 0 = Initial Decision, 1-5 = Questions
  const [decision, setDecision] = useState('');
  const [answers, setAnswers] = useState({
    why: '',
    fear: '',
    outcome: '',
    constraints: '',
    urgency: ''
  });
  const [config, setConfig] = useState({
    language: 'English',
    tone: 'Mentor Mode'
  });

  const handleNext = () => {
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      onGenerate(decision, answers, config);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const updateAnswer = (val) => {
    if (step === 0) {
      setDecision(val);
    } else {
      const qId = QUESTIONS[step - 1].id;
      setAnswers(prev => ({ ...prev, [qId]: val }));
    }
  };

  const currentVal = step === 0 ? decision : answers[QUESTIONS[step - 1].id];
  const progress = (step / QUESTIONS.length) * 100;

  return (
    <motion.div 
      className="glow-card" 
      style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="glow-card-inner">
        {/* Config Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['English', 'Hindi', 'Hinglish'].map(lang => (
              <button 
                key={lang}
                onClick={() => setConfig(prev => ({ ...prev, language: lang }))}
                style={{ 
                  padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700',
                  background: config.language === lang ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer', transition: 'var(--transition)'
                }}
              >
                {lang}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Direct Mode', 'Mentor Mode'].map(tone => (
              <button 
                key={tone}
                onClick={() => setConfig(prev => ({ ...prev, tone: tone }))}
                style={{ 
                  padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700',
                  background: config.tone === tone ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer', transition: 'var(--transition)'
                }}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Question Header */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'var(--accent-glow)', borderRadius: '10px' }}>
            <Brain size={20} color="var(--accent)" />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', opacity: 0.9 }}>
            {step === 0 ? "What's the decision you're facing?" : QUESTIONS[step - 1].label}
          </h3>
        </div>

        {/* Input Area */}
        <div style={{ position: 'relative' }}>
          <textarea 
            value={currentVal}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={step === 0 ? "E.g., Should I quit my job?" : "Type your answer here..."}
            style={{ 
              width: '100%', minHeight: '120px', background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--glass-border)', borderRadius: '16px', padding: '1.25rem',
              color: 'white', fontSize: '1.05rem', fontFamily: 'inherit', resize: 'none',
              outline: 'none', transition: 'border-color 0.3s'
            }}
          />
          
          {/* Progress Bar */}
          {step > 0 && (
            <div style={{ position: 'absolute', bottom: '-20px', left: 0, width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ height: '100%', background: 'var(--accent)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent-glow)' }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
          {step > 0 ? (
            <button 
              onClick={handleBack}
              style={{ padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft size={18} /> Back
            </button>
          ) : <div />}

          <button 
            disabled={!currentVal || loading}
            onClick={handleNext}
            style={{ 
              background: 'var(--accent)', padding: '0.8rem 2rem', borderRadius: '14px', border: 'none',
              color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem',
              boxShadow: '0 10px 20px var(--accent-glow)', opacity: currentVal ? 1 : 0.5, transition: 'var(--transition)'
            }}
          >
            {loading ? "Thinking..." : step === QUESTIONS.length ? "Generate Analysis" : "Next Step"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
