import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DecisionInput from './components/DecisionInput';
import AnalysisResult from './components/AnalysisResult';
import History from './components/History';
import { generateAnalysis } from './services/aiService';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('indigo');

  useEffect(() => {
    const savedHistory = localStorage.getItem('decision_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleGenerate = async (decision, answers, config) => {
    setLoading(true);
    try {
      const analysis = await generateAnalysis(decision, answers, config);
      setResult(analysis);
      
      // Sync theme with risk score
      if (analysis.analysis.riskScore <= 3) setTheme('safe');
      else if (analysis.analysis.riskScore <= 7) setTheme('indigo');
      else if (analysis.analysis.riskScore <= 9) setTheme('risky');
      else setTheme('critical');

      // Update history (Keep last 5)
      const newHistoryItem = {
        id: Date.now(),
        decision,
        answers,
        config,
        result: analysis,
        emotion: analysis.emotion
      };
      
      const updatedHistory = [newHistoryItem, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('decision_history', JSON.stringify(updatedHistory));
      
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (error) {
      alert("Strategic Analysis failed. Please check your Gemini API key in .env");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setResult(item.result);
    // Sync theme
    const score = item.result.analysis.riskScore;
    if (score <= 3) setTheme('safe');
    else if (score <= 7) setTheme('indigo');
    else if (score <= 9) setTheme('risky');
    else setTheme('critical');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleRefine = () => {
    // Current UI handles refinement by keeping the input card visible 
    // and allowing user to navigate steps. We just scroll up.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" data-theme={theme}>
      <div className="mesh-gradient" />
      
      <div className="content-wrapper">
        <Header />
        
        <main>
          <DecisionInput 
            onGenerate={handleGenerate} 
            loading={loading}
          />

          <AnimatePresence mode="wait">
            {result && (
              <AnalysisResult 
                key={result.analysis.finalDecision}
                result={result} 
                onRefine={handleRefine}
              />
            )}
          </AnimatePresence>

          {history.length > 0 && !loading && (
            <History 
              history={history} 
              onSelect={handleSelectHistory} 
              onClear={() => {
                setHistory([]);
                localStorage.removeItem('decision_history');
              }}
            />
          )}
        </main>

        <footer style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.4, fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em' }}>
          © 2026 DECISION COPILOT AI. BUILT FOR STRATEGIC EXCELLENCE.
        </footer>
      </div>
    </div>
  );
}

export default App;
