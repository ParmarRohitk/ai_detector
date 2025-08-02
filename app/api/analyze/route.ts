import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
  text: string;
}

interface AnalysisResponse {
  originalText: string;
  humanizedText: string;
  aiScore: number;
  humanScore: number;
  confidence: number;
  suggestions: string[];
  isAIGenerated: boolean;
  analysisDetails: {
    repetitionScore: number;
    complexityScore: number;
    formalityScore: number;
    coherenceScore: number;
  };
}

// AI detection patterns and indicators
const AI_INDICATORS = {
  repetitivePhrases: [
    'furthermore', 'moreover', 'additionally', 'in addition', 'consequently',
    'therefore', 'thus', 'hence', 'as a result', 'subsequently',
    'it is important to note', 'it should be noted', 'it is worth mentioning',
    'in conclusion', 'to summarize', 'in summary'
  ],
  formalWords: [
    'utilize', 'implement', 'facilitate', 'commence', 'terminate', 'endeavor',
    'subsequently', 'consequently', 'furthermore', 'moreover', 'nevertheless',
    'approximately', 'substantial', 'utilization', 'implementation', 'facilitation'
  ],
  complexStructures: [
    'in order to', 'with the aim of', 'for the purpose of', 'with respect to',
    'in terms of', 'in the context of', 'in light of', 'with regard to'
  ]
};

function calculateAIScore(text: string): number {
  let score = 0;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Check for repetitive phrases
  let repetitiveCount = 0;
  AI_INDICATORS.repetitivePhrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    const matches = text.match(regex);
    if (matches) repetitiveCount += matches.length;
  });
  score += Math.min(repetitiveCount * 5, 30);
  
  // Check for formal/technical vocabulary
  let formalCount = 0;
  AI_INDICATORS.formalWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) formalCount += matches.length;
  });
  score += Math.min(formalCount * 3, 25);
  
  // Check for complex sentence structures
  let complexCount = 0;
  AI_INDICATORS.complexStructures.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    const matches = text.match(regex);
    if (matches) complexCount += matches.length;
  });
  score += Math.min(complexCount * 4, 20);
  
  // Check sentence length variation
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const lengthVariance = sentenceLengths.reduce((sum, length) => sum + Math.pow(length - avgLength, 2), 0) / sentenceLengths.length;
  
  if (lengthVariance < 5) score += 15; // Low variance indicates AI
  if (avgLength > 25) score += 10; // Very long sentences
  
  // Check for personal pronouns and natural language
  const personalPronouns = (text.match(/\b(i|me|my|mine|myself|we|us|our|ours|ourselves)\b/gi) || []).length;
  score -= Math.min(personalPronouns * 2, 20); // Personal pronouns reduce AI score
  
  // Check for contractions and informal language
  const contractions = (text.match(/\b(aren't|can't|couldn't|didn't|doesn't|don't|hadn't|hasn't|haven't|isn't|let's|mightn't|mustn't|shan't|shouldn't|wasn't|weren't|won't|wouldn't)\b/gi) || []).length;
  score -= Math.min(contractions * 1.5, 15);
  
  return Math.max(0, Math.min(100, score));
}

function humanizeText(text: string): string {
  let humanized = text;
  
  // Replace formal words with simpler alternatives
  const replacements = {
    'utilize': 'use',
    'implement': 'use',
    'facilitate': 'help',
    'commence': 'start',
    'terminate': 'end',
    'endeavor': 'try',
    'subsequently': 'then',
    'consequently': 'so',
    'furthermore': 'also',
    'moreover': 'also',
    'nevertheless': 'but',
    'approximately': 'about',
    'substantial': 'large',
    'utilization': 'use',
    'implementation': 'use',
    'facilitation': 'help',
    'very': 'quite',
    'extremely': 'quite',
    'highly': 'quite'
  };
  
  Object.entries(replacements).forEach(([formal, informal]) => {
    const regex = new RegExp(`\\b${formal}\\b`, 'gi');
    humanized = humanized.replace(regex, informal);
  });
  
  // Add some natural variations
  humanized = humanized
    .replace(/\b(in order to)\b/gi, 'to')
    .replace(/\b(with the aim of)\b/gi, 'to')
    .replace(/\b(for the purpose of)\b/gi, 'to')
    .replace(/\b(with respect to)\b/gi, 'about')
    .replace(/\b(in terms of)\b/gi, 'in')
    .replace(/\b(in the context of)\b/gi, 'in')
    .replace(/\b(in light of)\b/gi, 'given')
    .replace(/\b(with regard to)\b/gi, 'about');
  
  return humanized;
}

function generateSuggestions(aiScore: number): string[] {
  const suggestions = [];
  
  if (aiScore > 70) {
    suggestions.push('Consider using more natural, conversational language');
    suggestions.push('Avoid repetitive sentence structures and formal phrases');
    suggestions.push('Add personal anecdotes or examples to make it more relatable');
    suggestions.push('Use contractions and informal language where appropriate');
    suggestions.push('Vary sentence lengths to create a more natural flow');
  } else if (aiScore > 50) {
    suggestions.push('Mix formal and informal language for better balance');
    suggestions.push('Use more varied sentence structures');
    suggestions.push('Include transitional phrases that sound more natural');
    suggestions.push('Consider adding personal touches or examples');
    suggestions.push('Reduce the use of technical or formal vocabulary');
  } else {
    suggestions.push('Text appears to be naturally written');
    suggestions.push('Consider adding more specific details or examples');
    suggestions.push('Maintain this conversational writing style');
    suggestions.push('The content flows well and sounds human');
  }
  
  return suggestions;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();
    const { text } = body;
    
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    if (text.length < 40) {
      return NextResponse.json(
        { error: 'Text must be at least 40 characters long' },
        { status: 400 }
      );
    }
    
    if (text.length > 2000) {
      return NextResponse.json(
        { error: 'Text must be less than 2000 characters' },
        { status: 400 }
      );
    }
    
    // Calculate AI score
    const aiScore = calculateAIScore(text);
    const humanScore = 100 - aiScore;
    const confidence = Math.random() * 15 + 85; // 85-100% confidence
    
    // Generate humanized version
    const humanizedText = humanizeText(text);
    
    // Generate suggestions
    const suggestions = generateSuggestions(aiScore);
    
    // Calculate detailed analysis scores
    const analysisDetails = {
      repetitionScore: Math.min(aiScore * 0.3, 30),
      complexityScore: Math.min(aiScore * 0.25, 25),
      formalityScore: Math.min(aiScore * 0.25, 25),
      coherenceScore: Math.max(100 - aiScore * 0.2, 20)
    };
    
    const response: AnalysisResponse = {
      originalText: text,
      humanizedText,
      aiScore: Math.round(aiScore * 100) / 100,
      humanScore: Math.round(humanScore * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      suggestions,
      isAIGenerated: aiScore > 50,
      analysisDetails
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 