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
  Activity,
  AlertOctagon,
  RefreshCcw
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalysisResult({ result, onRefine }) {
  const [copied, setCopied] = useState(false);
  if (!result) return null;

  const copyAnalysis = () => {
    const text = `
    COUNSELOR INSIGHT:
    ${result.counselorInsight}

    DECISION ANALYSIS:
    Goal: ${result.analysis.goal}
    Final Decision: ${result.analysis.finalDecision}
    Execution Plan: ${result.analysis.executionPlan.join(', ')}

    REALITY CHECK:
    ${result.realityCheck}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="analysis-result" 
      initial="hidden"
      animate="show"
      style={{ display: 'grid', gap: '2.5rem', marginBottom: '6rem' }}
    >
      {/* SECTION 1: Counselor Insight */}
      <motion.div className="glow-card" variants={itemVariants} style={{ borderLeft: '4px solid var(--accent)' }}>
        <div className="glow-card-inner" style={{ background: 'linear-gradient(135deg, rgba(22,22,22,0.9) 0%, var(--accent-glow) 100%)' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', opacity: 0.8 }}>
            <Activity size={18} />
            <span style={{ fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Section 1: Counselor Insight</span>
          </div>
          <p style={{ fontSize: '1.25rem', fontWeight: '600', fontStyle: 'italic', lineHeight: '1.6', color: 'white' }}>
            "{result.counselorInsight}"
          </p>
        </div>
      </motion.div>

      {/* SECTION 2: Decision Analysis */}
      <motion.div className="glow-card" variants={itemVariants}>
        <div className="glow-card-inner">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem', opacity: 0.6 }}>
            <Puzzle size={18} />
            <span style={{ fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Section 2: Strategic Analysis</span>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Goal & Risks */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <Label icon={<Target size={14} />} text="Goal Identified" />
                <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{result.analysis.goal}</p>
              </div>
              <div>
                <Label icon={<ShieldAlert size={14} />} text="Key Risks" />
                <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {result.analysis.risks.map((r, i) => (
                    <li key={i} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SWOT Placeholder / Summary */}
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <Label icon={<Brain size={14} />} text="SWOT Strategic Summary" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div><span style={{ color: '#10b981', fontWeight: '800', fontSize: '0.75rem' }}>STRENGTHS:</span> <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{result.analysis.swot.strengths.join(', ')}</p></div>
                <div><span style={{ color: '#8b5cf6', fontWeight: '800', fontSize: '0.75rem' }}>OPPORTUNITIES:</span> <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{result.analysis.swot.opportunities.join(', ')}</p></div>
              </div>
            </div>

            {/* Final Decision */}
            <div style={{ padding: '2rem', background: 'var(--bg-primary)', borderRadius: '20px', border: '2px solid var(--accent)', textAlign: 'center', boxShadow: '0 20px 40px var(--accent-glow)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Final Decision</div>
              <h4 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'white', lineHeight: '1.2' }}>{result.analysis.finalDecision}</h4>
            </div>

            {/* Execution Plan */}
            <div>
              <Label icon={<Zap size={14} />} text="Execution Plan (5 Steps)" />
              <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                {result.analysis.executionPlan.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '24px', height: '24px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900' }}>{i+1}</div>
                    <p style={{ fontWeight: '600', opacity: 0.9 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reality Check */}
      <motion.div className="glow-card" variants={itemVariants} style={{ border: '1px solid #ef4444' }}>
        <div className="glow-card-inner" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <AlertOctagon color="#ef4444" size={24} />
            <div>
              <div style={{ color: '#ef4444', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reality Check (Brutally Honest)</div>
              <p style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{result.realityCheck}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <button onClick={onRefine} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '1rem 2rem', borderRadius: '100px', color: 'white', fontWeight: '800', cursor: 'pointer' }}>
          <RefreshCcw size={18} /> Refine this Decision
        </button>
        <button onClick={copyAnalysis} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--accent)', border: 'none', padding: '1rem 2rem', borderRadius: '100px', color: 'white', fontWeight: '800', cursor: 'pointer', boxShadow: '0 10px 20px var(--accent-glow)' }}>
          {copied ? <Check size={18} /> : <Clipboard size={18} />} {copied ? "Copied" : "Copy Analysis"}
        </button>
      </div>
    </motion.div>
  );
}

function Label({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
      {icon}
      <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{text}</span>
    </div>
  );
}
