import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import DecisionInput from './components/DecisionInput';
import AnalysisResult from './components/AnalysisResult';
import PersonaInsights from './components/PersonaInsights';
import History from './components/History';
import { generateAnalysis } from './services/aiService';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('default');

  // Load history from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('decisionHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sync theme with riskScore
  useEffect(() => {
    if (result) {
      const score = result.riskScore;
      if (score <= 3) setTheme('safe');
      else if (score <= 7) setTheme('default'); // Indigo
      else if (score <= 9) setTheme('risky'); // Amber
      else setTheme('critical'); // Red
    } else {
      setTheme('default');
    }
  }, [result]);

  const handleGenerate = async (query) => {
    setLoading(true);
    setResult(null);

    const analysis = await generateAnalysis(query);
    
    setResult(analysis);
    setLoading(false);

    // Save to history
    const newEntry = { query, analysis };
    const filteredHistory = history.filter(h => h.query !== query);
    const updatedHistory = [newEntry, ...filteredHistory.slice(0, 4)];
    setHistory(updatedHistory);
    localStorage.setItem('decisionHistory', JSON.stringify(updatedHistory));
  };

  const handleSelectHistory = (item) => {
    setResult(item.analysis);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('decisionHistory');
  };

  return (
    <div className="app-container" data-theme={theme} style={{ paddingBottom: '8rem' }}>
      <div className="container">
        <Header />
        
        <main>
          <DecisionInput onGenerate={handleGenerate} loading={loading} />
          
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.understand}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <AnalysisResult result={result} />
                {/* PersonaInsights logic can be removed or simplified if not needed per new persona */}
              </motion.div>
            )}
          </AnimatePresence>

          <History 
            history={history} 
            onSelect={handleSelectHistory} 
            onClear={handleClearHistory} 
          />
        </main>

        <footer style={{ marginTop: '8rem', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '0.05em' }}>
          <p>© 2026 DECISION COPILOT AI. BUILT FOR STRATEGIC EXCELLENCE.</p>
        </footer>
      </div>
    </div>
  );
}
