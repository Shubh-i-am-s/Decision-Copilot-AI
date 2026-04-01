import React from 'react';
import { User, Briefcase, Zap, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PersonaInsights({ personas }) {
  if (!personas) return null;

  const cards = [
    {
      title: "Cautious Investor",
      content: personas.investor,
      icon: <Briefcase size={22} color="#3b82f6" />, // Blue
      tag: "LP Perspective",
      delay: 0.1
    },
    {
      title: "Bold Entrepreneur",
      content: personas.entrepreneur,
      icon: <Zap size={22} color="#f59e0b" />, // Amber
      tag: "Growth First",
      delay: 0.2
    },
    {
      title: "Rational Strategist",
      content: personas.strategist,
      icon: <Search size={22} color="#10b981" />, // Green
      tag: "Long-term View",
      delay: 0.3
    }
  ];

  return (
    <div className="persona-section fade-in" style={{ marginTop: '5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ padding: '0.6rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px' }}>
          <User size={24} color="var(--accent)" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>Persona Insights</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {cards.map((card, i) => (
          <motion.div 
            key={i} 
            className="glow-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.5 }}
          >
            <div className="glow-card-inner" style={{ position: 'relative', minHeight: '220px' }}>
              <div style={{ 
                position: 'absolute', 
                top: '0', 
                right: '0', 
                padding: '0.5rem 1rem', 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                fontSize: '0.7rem', 
                color: 'var(--text-secondary)', 
                borderRadius: '0 0 0 16px', 
                borderLeft: '1px solid var(--glass-border)', 
                borderBottom: '1px solid var(--glass-border)',
                fontWeight: '700',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                {card.tag}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.6rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  {card.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-primary)' }}>{card.title}</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.8', fontWeight: '500' }}>
                "{card.content}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
