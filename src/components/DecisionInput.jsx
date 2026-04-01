import React, { useState, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DecisionInput({ onGenerate, loading }) {
  const [input, setInput] = useState('');
  const [thinkingMessage, setThinkingMessage] = useState('Thinking like a strategist...');

  const messages = [
    'Analyzing edge cases...',
    'Consulting frameworks...',
    'Evaluating risk vectors...',
    'Refining persona insights...',
    'Calculating opportunity cost...'
  ];

  useEffect(() => {
    if (loading) {
      let i = 0;
      const interval = setInterval(() => {
        setThinkingMessage(messages[i % messages.length]);
        i++;
      }, 800);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onGenerate(input);
    }
  };

  return (
    <div className="input-section fade-in" style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
      <motion.form 
        onSubmit={handleSubmit} 
        style={{ position: 'relative' }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          background: 'linear-gradient(to right, var(--accent), var(--accent-secondary))',
          borderRadius: '22px',
          zIndex: -1,
          opacity: 0.3,
          filter: 'blur(10px)'
        }} />
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your decision (e.g., Should I quit my job to start a startup?)"
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '160px',
            backgroundColor: 'var(--bg-secondary)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            borderBottom: '2px solid var(--accent)',
            borderRadius: '20px',
            color: 'white',
            padding: '2rem',
            fontSize: '1.25rem',
            fontWeight: '500',
            outline: 'none',
            resize: 'none',
            transition: 'var(--transition)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            fontFamily: 'inherit'
          }}
        />
        
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '0.75rem 1.5rem',
            fontWeight: '700',
            cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer',
            opacity: (loading || !input.trim()) ? 0.6 : 1,
            transition: 'var(--transition)',
            boxShadow: '0 4px 15px var(--accent-glow)'
          }}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          {loading ? 'Analyzing...' : 'Generate Analysis'}
        </button>
      </motion.form>
      
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: '1.5rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
        >
          <p style={{ color: 'var(--accent)', fontSize: '1rem', fontWeight: '600', animation: 'pulse 1.5s infinite' }}>
            {thinkingMessage}
          </p>
        </motion.div>
      )}
    </div>
  );
}
