import React from 'react';
import { Clock, Trash2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function History({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  return (
    <div className="history-section fade-in" style={{ marginTop: '6rem', padding: '3rem 0', borderTop: '1px solid var(--glass-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
            <Clock size={20} color="var(--text-secondary)" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>Recent Decisions</h2>
        </div>
        <button 
          onClick={onClear}
          style={{ 
            background: 'none', border: 'none', color: '#ef4444', 
            cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', 
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            opacity: 0.6, transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.6'}
        >
          <Trash2 size={16} /> Clear All
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {history.map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -5, borderColor: 'var(--accent)' }}
            onClick={() => onSelect(item)}
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              padding: '1.25rem 1.5rem', 
              borderRadius: '16px', 
              border: '1px solid var(--glass-border)', 
              cursor: 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ 
              fontSize: '0.95rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              maxWidth: '85%'
            }}>
              {item.query}
            </div>
            <ChevronRight size={18} color="var(--accent)" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
