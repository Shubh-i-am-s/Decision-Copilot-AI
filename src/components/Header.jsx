import React from 'react';
import { Target, Zap, Waves } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="header fade-in" style={{ padding: '4rem 0', marginBottom: '4rem', textAlign: 'center' }}>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="logo-container" 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}
      >
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '16px', 
          background: 'var(--accent)', 
          boxShadow: '0 0 30px var(--accent-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)'
        }}>
          <Target size={32} color="white" strokeWidth={2.5} />
        </div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '900', 
          letterSpacing: '-0.04em', 
          background: 'linear-gradient(to right, #fff 40%, rgba(255,255,255,0.4) 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.2'
        }}>
          Decision Copilot AI
        </h1>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ 
          marginTop: '1.25rem', 
          color: 'var(--text-secondary)', 
          fontSize: '1rem', 
          fontWeight: '700', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          opacity: 0.6
        }}
      >
        The Student & Founder Strategic Mentor
      </motion.p>
    </header>
  );
}
