import React, { useState } from 'react';
import { 
  Clipboard, 
  Check, 
  Brain, 
  Target, 
  Scale, 
  Puzzle, 
  Award, 
  Zap, 
  ShieldAlert, 
  MessageSquareQuote,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalysisResult({ result }) {
  const [copied, setCopied] = useState(false);
  if (!result) return null;

  const copyToClipboard = () => {
    const text = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="analysis-result" 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ display: 'grid', gap: '2.5rem', marginBottom: '6rem' }}
    >
      {/* Header & Copy Utility */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Strategic Mentor Analysis</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', 
            background: copied ? 'var(--accent)' : 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--glass-border)', borderRadius: '12px',
            color: copied ? 'white' : 'var(--text-secondary)', padding: '0.6rem 1.25rem', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: '600', transition: 'var(--transition)'
          }}
        >
          {copied ? <Check size={18} /> : <Clipboard size={18} />}
          {copied ? 'Copied' : 'Copy Analysis'}
        </motion.button>
      </div>

      {/* 1. Understand the Situation */}
      <motion.div className="glow-card" variants={itemVariants}>
        <div className="glow-card-inner">
          <SectionHeader icon={<Brain size={20} />} title="Understand the Situation" />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: '500' }}>{result.understand}</p>
        </div>
      </motion.div>

      {/* 2. What Matters Most */}
      <motion.div className="glow-card" variants={itemVariants}>
        <div className="glow-card-inner">
          <SectionHeader icon={<Target size={20} />} title="What Matters Most" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {result.priority.map((p, i) => (
              <span key={i} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.95rem', border: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-primary)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3. Options Breakdown */}
      <motion.div className="glow-card" variants={itemVariants} style={{ borderLeft: '4px solid var(--accent)' }}>
        <div className="glow-card-inner">
          <SectionHeader icon={<Scale size={20} />} title="Options Breakdown" />
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {result.options.map((opt, i) => (
              <div key={i} style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                <div style={{ fontWeight: '800', marginBottom: '0.75rem', color: 'var(--accent)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{opt.title}</div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: '500' }}>{opt.description}</p>
                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <div><span style={{ color: '#10b981', fontWeight: '800' }}>PROS:</span> <span style={{ color: 'var(--text-secondary)' }}>{opt.pros.join(', ')}</span></div>
                  <div><span style={{ color: '#ef4444', fontWeight: '800' }}>CONS:</span> <span style={{ color: 'var(--text-secondary)' }}>{opt.cons.join(', ')}</span></div>
                  <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>"Best when: {opt.bestWhen}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 4. Thinking Framework */}
      <motion.div className="glow-card" variants={itemVariants}>
        <div className="glow-card-inner">
          <SectionHeader icon={<Puzzle size={20} />} title="Thinking Framework" />
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '16px' }}>
            <h4 style={{ color: 'var(--accent)', fontWeight: '800', marginBottom: '0.5rem' }}>{result.framework.title}</h4>
            <p style={{ fontWeight: '600', marginBottom: '1rem' }}>{result.framework.explanation}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>{result.framework.application}</p>
          </div>
        </div>
      </motion.div>

      {/* 5. Recommended Action */}
      <motion.div className="glow-card" variants={itemVariants} style={{ border: '2px solid var(--accent)' }}>
        <div className="glow-card-inner" style={{ background: 'linear-gradient(135deg, rgba(22,22,22,0.95) 0%, var(--accent-glow) 100%)' }}>
          <SectionHeader icon={<Award size={22} />} title="Recommended Action" />
          <h4 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white', marginBottom: '1rem' }}>{result.verdict.action}</h4>
          <p style={{ fontWeight: '600', fontSize: '1.1rem', marginBottom: '1.5rem' }}>{result.verdict.reason}</p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
            <strong>Trade-offs:</strong> {result.verdict.tradeoffs}
          </div>
        </div>
      </motion.div>

      {/* 6. Execution Plan */}
      <motion.div className="glow-card" variants={itemVariants}>
        <div className="glow-card-inner">
          <SectionHeader icon={<Zap size={20} />} title="Execution Plan" />
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {result.execution.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--accent)', color: 'white', borderRadius: '50%', width: '28px', height: '28px', minWidth: '28px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>{i+1}</div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '600' }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 7. Reality Check */}
      <motion.div className="glow-card" variants={itemVariants} style={{ borderLeft: '4px solid #ef4444' }}>
        <div className="glow-card-inner">
          <SectionHeader icon={<ShieldAlert size={20} color="#ef4444" />} title="Reality Check" />
          <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem' }}>
            {result.awareness.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                <ChevronRight size={18} color="#ef4444" style={{ marginTop: '0.2rem' }} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 8. One-Line Summary */}
      <motion.div variants={itemVariants} style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', padding: '1.5rem 3rem', background: 'var(--bg-secondary)', borderRadius: '100px', border: '1px solid var(--accent)' }}>
          <MessageSquareQuote size={20} color="var(--accent)" />
          <p style={{ fontSize: '1.25rem', fontWeight: '800', fontStyle: 'italic', letterSpacing: '-0.02em' }}>{result.takeaway}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
      <div style={{ padding: '0.6rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', textTransform: 'uppercase', opacity: 0.8 }}>{title}</h3>
    </div>
  );
}
