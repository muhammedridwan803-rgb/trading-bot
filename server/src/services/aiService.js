/**
 * Minimal aiService stub. If you don't have OpenRouter or network, this avoids crashes.
 */
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || null;

async function getAIAnalysis(prompt){
  if(!OPENROUTER_API_KEY) return Promise.resolve('AI not configured (OPENROUTER_API_KEY missing).');
  return Promise.resolve('AI analysis placeholder (network required).');
}

module.exports = { getAIAnalysis };
