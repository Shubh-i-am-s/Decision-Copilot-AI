const SYSTEM_PROMPT = `You are a Decision Copilot for students and early-stage founders.

Your goal is to provide clear, structured, and easy-to-understand guidance for any decision.

Follow this format strictly, using simple language (like explaining to a smart 18-year-old):

1. Understand the Situation
- Restate the user's problem in 1–2 lines
- Highlight what really matters here

2. What Matters Most
- List 3–5 key factors (time, money, risk, growth, etc.)
- Keep it simple and relatable

3. Options Breakdown
For each option:
- What it looks like in real life
- Pros (simple bullet points)
- Cons (simple bullet points)
- When this option works best

4. Thinking Framework
- Apply ONE relevant framework (SWOT, 10-10-10, First Principles, etc.)
- Explain it in very simple words
- Show how it applies to THIS decision

5. Recommended Action
- Give ONE clear recommendation
- Explain WHY in 2–3 lines
- Mention trade-offs honestly

6. Execution Plan
- Give 3–5 clear next steps
- Each step should be actionable and specific
- Avoid vague advice

7. Reality Check
- Mention 1–2 risks or mistakes to avoid

8. One-Line Summary
- A short, memorable takeaway

Tone:
- Simple, direct, human
- No jargon
- No emojis in section headers
- No long paragraphs
- Use bullets and spacing`;

/**
 * Generates a structured decision analysis.
 * For the demo, this includes a high-fidelity mock fallback.
 */
export async function generateAnalysis(userDecision, apiKey = null) {
  // Simulate network delay for "Thinking like a strategist..."
  await new Promise(resolve => setTimeout(resolve, 2500));

  if (!apiKey) {
    // Return high-quality mock data for demo
    return getMockAnalysis(userDecision);
  }

  // Implementation for real API call (OpenAI/Claude)
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userDecision }
        ]
      })
    });
    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
  } catch (error) {
    console.error('AI Service Error:', error);
    return getMockAnalysis(userDecision);
  }
}

function getMockAnalysis(decision) {
  const query = decision.toLowerCase();
  
  const baseStructure = {
    understand: "",
    priority: [],
    options: [],
    framework: { title: "", explanation: "", application: "" },
    verdict: { action: "", reason: "", tradeoffs: "" },
    execution: [],
    awareness: [],
    takeaway: "",
    riskScore: 0
  };

  // High Risk Archetype: Career Pivots / High Stakes
  if (query.includes('quit') || query.includes('resign') || query.includes('startup') || query.includes('pivot')) {
    return {
      ...baseStructure,
      understand: "You're deciding whether to leave a secure path (job) for a high-uncertainty path (startup).",
      priority: ["Financial Runway (Safety)", "Market Validation (Proof)", "Opportunity Cost (Time)"],
      options: [
        { title: "Full Jump", description: "Leaving everything behind to focus 100%.", pros: ["Total focus", "High motivation"], cons: ["Fast burn rate", "High stress"], bestWhen: "You have 12+ months of savings." },
        { title: "Side Project", description: "Building while still having a paycheck.", pros: ["Low stress", "Financial safety"], cons: ["Slower growth", "Split energy"], bestWhen: "You're still validating the idea." }
      ],
      framework: { 
        title: "Regret Minimization", 
        explanation: "Looking forward to age 80—will you regret NOT doing this?", 
        application: "If the pain of 'what if' is greater than the fear of failing, the choice is clear."
      },
      verdict: { 
        action: "Modern Hybrid Start", 
        reason: "Validating while you have income reduces the chance of desperate (bad) decisions.", 
        tradeoffs: "You'll be working 80-hour weeks, but you won't go broke."
      },
      execution: ["Launch a landing page within 48 hours.", "Get 10 pre-orders/signups.", "Set a 'Quit' date based on revenue."],
      awareness: ["Don't quit without a 'Plan B' savings pot.", "Avoid building in a vacuum without feedback."],
      takeaway: "Don't build a ship in the harbor; test the raft first.",
      riskScore: 8
    };
  }

  // Low Risk Archetype: Skills / Education
  if (query.includes('learn') || query.includes('study') || query.includes('read') || query.includes('skill')) {
    return {
      ...baseStructure,
      understand: "You're deciding how to allocate your limited focus to gain a new capability.",
      priority: ["Speed of Mastery", "Practical Utility", "Long-term Value"],
      options: [
        { title: "Deep Dive", description: "Focusing on one thing for 3 hours daily.", pros: ["Fast mastery", "Moat building"], cons: ["Mental fatigue", "Strict schedule"], bestWhen: "The skill is a career game-changer." },
        { title: "Micro-Learning", description: "Consuming 30m of content daily.", pros: ["Low pressure", "Consistency"], cons: ["Slower mastery", "Surface level"], bestWhen: "You're exploration-focused." }
      ],
      framework: { 
        title: "80/20 Rule", 
        explanation: "80% of results come from 20% of the effort.", 
        application: "Find the core 20% of the skill that actually matters in real life."
      },
      verdict: { 
        action: "Project-Based Learning", 
        reason: "Applying a skill immediately is 3x faster than just reading about it.", 
        tradeoffs: "It feels messier and harder initially than watching tutorials."
      },
      execution: ["Identity a real-world problem to solve.", "Build one simple project in 7 days.", "Share your work on Twitter/LinkedIn."],
      awareness: ["Avoid 'Tutorial Hell' (watching without doing).", "Don't aim for perfection; aim for 'Done'."],
      takeaway: "Mastery is the byproduct of building, not watching.",
      riskScore: 2
    };
  }

  // Critical Risk Archetype: High Stakes / Dangerous
  if (query.includes('gamble') || query.includes('all-in') || query.includes('debt') || query.includes('leverage')) {
    return {
      ...baseStructure,
      understand: "You're considering a 'make-or-break' move that involves significant leverage or unhedged risk.",
      priority: ["Survival (Existential)", "Worst-Case Scenarios", "Exit Plan"],
      options: [
        { title: "The Big Bet", description: "Putting everything on a single outcome.", pros: ["Massive reward"], cons: ["Complete ruin risk", "Extreme stress"], bestWhen: "You're young and have literally zero to lose." },
        { title: "Calculated Hedge", pros: ["Survival guaranteed"], cons: ["Slower returns"], bestWhen: "You have dependents or limited runway." }
      ],
      framework: { 
        title: "Inversion Thinking", 
        explanation: "Instead of how to win, think about all the ways this can destroy you.", 
        application: "If you can't survive the worst-case scenario, don't take the bet."
      },
      verdict: { 
        action: "Halt & De-risk", 
        reason: "You are currently playing a 'game of ruin'. One mistake ends the career.", 
        tradeoffs: "You'll miss the dopamine of the big bet, but you'll stay in the game."
      },
      execution: ["Liquidate 50% of the risk.", "Build a 6-month cash reserve.", "Talk to 3 people who lost it all doing this."],
      awareness: ["Avoid 'Sunk Cost Fallacy'.", "Don't mistake luck for skill in high-risk bets."],
      takeaway: "In the long run, the person who doesn't go bust wins.",
      riskScore: 10
    };
  }

  // Default: General Decision (Moderate/Indigo)
  return {
    ...baseStructure,
    understand: "You're weighing two paths where the outcome isn't totally clear yet.",
    priority: ["Simplicity", "Speed of Feedback", "Reversibility"],
    options: [
      { title: "Bold Path", description: "Choosing the option that scares you a little.", pros: ["High growth", "Clear signal"], cons: ["More effort", "Higher stakes"], bestWhen: "You're early in your career." },
      { title: "Safe Path", description: "Choosing the path of least resistance.", pros: ["Lower stress", "Easy to revert"], cons: ["Slow growth", "Lower upside"], bestWhen: "You're already overwhelmed." }
    ],
    framework: { 
      title: "10-10-10 Rule", 
      explanation: "How will I feel about this in 10 mins, 10 months, and 10 years?", 
      application: "Most fears are 10-minute problems that don't matter in 10 years."
    },
    verdict: { 
      action: "Bias Toward Action", 
      reason: "In most cases, the risk of doing nothing is higher than the risk of picking wrong.", 
      tradeoffs: "You'll have to correct course as you go."
    },
    execution: ["Write down the 'Next Small Step'.", "Commit to it for the next 24 hours.", "Review how it feels after 3 days."],
    awareness: ["Beware of 'Over-Analysis' paralyzing your progress.", "Don't ignore your gut feeling for data."],
    takeaway: "A good plan today is better than a perfect plan next month.",
    riskScore: 5
  };
}

function parseAIResponse(text) {
  // Simple parser logic for real LLM output
  // For the demo app, we assume structured JSON or we'd add complex regex/LLM-json-mode here.
  return JSON.parse(text); 
}
