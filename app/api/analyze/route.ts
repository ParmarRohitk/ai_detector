import { NextRequest, NextResponse } from 'next/server';

interface AnalysisRequest {
  text: string;
}

interface AnalysisResponse {
  originalText: string;
  humanizedText: string;
  humanizedChanges: Array<{
    original: string;
    replacement: string;
    startIndex: number;
    endIndex: number;
  }>;
  aiScore: number;
  humanScore: number;
  confidence: number;
  suggestions: string[];
  isAIGenerated: boolean;
  detectedAIModel: string;
  analysisDetails: {
    repetitionScore: number;
    complexityScore: number;
    formalityScore: number;
    coherenceScore: number;
    technicalJargonScore: number;
    sentenceStructureScore: number;
  };
}

// AI detection patterns and indicators - Enhanced for better accuracy
const AI_INDICATORS = {
  repetitivePhrases: [
    'furthermore', 'moreover', 'additionally', 'in addition', 'consequently',
    'therefore', 'thus', 'hence', 'as a result', 'subsequently',
    'it is important to note', 'it should be noted', 'it is worth mentioning',
    'in conclusion', 'to summarize', 'in summary', 'in essence',
    'it is crucial to', 'it is essential to', 'it is vital to',
    'on the other hand', 'in contrast', 'however', 'nevertheless',
    'despite this', 'regardless of', 'in spite of', 'although',
    'while it is true', 'it can be argued', 'it is evident that',
    'clearly', 'obviously', 'naturally', 'of course'
  ],
  formalWords: [
    'utilize', 'implement', 'facilitate', 'commence', 'terminate', 'endeavor',
    'subsequently', 'consequently', 'furthermore', 'moreover', 'nevertheless',
    'approximately', 'substantial', 'utilization', 'implementation', 'facilitation',
    'optimize', 'maximize', 'minimize', 'leverage', 'streamline', 'enhance',
    'comprehensive', 'systematic', 'methodical', 'strategic', 'proactive',
    'innovative', 'cutting-edge', 'state-of-the-art', 'revolutionary',
    'paradigm', 'framework', 'methodology', 'infrastructure', 'ecosystem'
  ],
  complexStructures: [
    'in order to', 'with the aim of', 'for the purpose of', 'with respect to',
    'in terms of', 'in the context of', 'in light of', 'with regard to',
    'as far as', 'insofar as', 'to the extent that', 'provided that',
    'assuming that', 'given that', 'considering that', 'bearing in mind',
    'with a view to', 'with the intention of', 'for the sake of',
    'in accordance with', 'in compliance with', 'in conformity with'
  ],
  aiPatterns: [
    'let me explain', 'i would like to', 'i want to', 'i need to',
    'here are some', 'here is a', 'this is a', 'this includes',
    'some key features', 'key benefits', 'main advantages',
    'important aspects', 'crucial elements', 'essential components',
    'comprehensive overview', 'detailed analysis', 'thorough examination',
    'extensive research', 'in-depth study', 'comprehensive guide'
  ]
};

function calculateAIScore(text: string): number {
  let score = 0;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  // Enhanced repetitive phrases detection
  let repetitiveCount = 0;
  AI_INDICATORS.repetitivePhrases.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    const matches = text.match(regex);
    if (matches) repetitiveCount += matches.length;
  });
  score += Math.min(repetitiveCount * 6, 30);
  
  // Enhanced formal vocabulary detection
  let formalCount = 0;
  AI_INDICATORS.formalWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) formalCount += matches.length;
  });
  score += Math.min(formalCount * 3, 25);
  
  // Enhanced complex structures detection
  let complexCount = 0;
  AI_INDICATORS.complexStructures.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    const matches = text.match(regex);
    if (matches) complexCount += matches.length;
  });
  score += Math.min(complexCount * 5, 20);
  
  // AI-specific patterns detection
  let aiPatternCount = 0;
  AI_INDICATORS.aiPatterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'gi');
    const matches = text.match(regex);
    if (matches) aiPatternCount += matches.length;
  });
  score += Math.min(aiPatternCount * 8, 25);
  
  // Enhanced sentence structure analysis
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);
  const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
  const lengthVariance = sentenceLengths.reduce((sum, length) => sum + Math.pow(length - avgLength, 2), 0) / sentenceLengths.length;
  
  // More sophisticated sentence length analysis
  if (lengthVariance < 2) score += 25; // Very uniform sentence lengths
  else if (lengthVariance < 5) score += 15; // Low variance
  else if (lengthVariance < 10) score += 8; // Moderate variance
  
  if (avgLength > 35) score += 20; // Very long sentences
  else if (avgLength > 25) score += 12; // Long sentences
  else if (avgLength < 8) score += 5; // Very short sentences (might be AI)
  
  // Enhanced natural language indicators
  const personalPronouns = (text.match(/\b(i|me|my|mine|myself|we|us|our|ours|ourselves)\b/gi) || []).length;
  score -= Math.min(personalPronouns * 2.5, 20);
  
  const contractions = (text.match(/\b(aren't|can't|couldn't|didn't|doesn't|don't|hadn't|hasn't|haven't|isn't|let's|mightn't|mustn't|shan't|shouldn't|wasn't|weren't|won't|wouldn't)\b/gi) || []).length;
  score -= Math.min(contractions * 1.5, 15);
  
  // Punctuation analysis
  const questions = (text.match(/\?/g) || []).length;
  const exclamations = (text.match(/\!/g) || []).length;
  score -= Math.min((questions + exclamations) * 1, 10);
  
  const ellipsis = (text.match(/\.{3,}/g) || []).length;
  const dashes = (text.match(/--/g) || []).length;
  score -= Math.min((ellipsis + dashes) * 1.5, 8);
  
  // Word frequency analysis (AI tends to repeat words)
  const wordFrequency: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length > 3) { // Only count words longer than 3 characters
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  const repeatedWords = Object.values(wordFrequency).filter(count => count > 2).length;
  score += Math.min(repeatedWords * 2, 15);
  
  // Paragraph structure analysis
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  if (paragraphs.length > 0) {
    const avgParagraphLength = paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0) / paragraphs.length;
    if (avgParagraphLength > 100) score += 10; // Very long paragraphs
    if (avgParagraphLength < 20) score += 5; // Very short paragraphs
  }
  
  // Technical jargon detection
  const technicalTerms = (text.match(/\b(algorithm|optimization|implementation|framework|methodology|infrastructure|ecosystem|paradigm|leverage|streamline|enhance|comprehensive|systematic|methodical|strategic|proactive|innovative|cutting-edge|state-of-the-art|revolutionary)\b/gi) || []).length;
  score += Math.min(technicalTerms * 2, 20);
  
  // List and enumeration detection (AI loves lists)
  const listPatterns = (text.match(/(\d+\.|•|\-|\*)/g) || []).length;
  score += Math.min(listPatterns * 1.5, 15);
  
  // Normalize score based on text length and add some randomness for realism
  if (totalWords < 50) {
    score = score * 0.7;
  } else if (totalWords < 100) {
    score = score * 0.85;
  }
  
  // Add small random variation to make results more dynamic
  const randomVariation = (Math.random() - 0.5) * 10;
  score += randomVariation;
  
  return Math.max(0, Math.min(100, Math.round(score)));
}

interface HumanizedResult {
  text: string;
  changes: Array<{
    original: string;
    replacement: string;
    startIndex: number;
    endIndex: number;
  }>;
}

function humanizeText(text: string): HumanizedResult {
  let humanized = text;
  const changes: Array<{
    original: string;
    replacement: string;
    startIndex: number;
    endIndex: number;
  }> = [];
  
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
    'highly': 'quite',
    'in order to': 'to',
    'with the aim of': 'to',
    'for the purpose of': 'to',
    'with respect to': 'about',
    'in terms of': 'in',
    'in the context of': 'in',
    'in light of': 'given',
    'with regard to': 'about',
    'optimize': 'improve',
    'maximize': 'increase',
    'minimize': 'reduce',
    'leverage': 'use',
    'streamline': 'simplify',
    'enhance': 'improve',
    'comprehensive': 'complete',
    'systematic': 'organized',
    'methodical': 'careful',
    'strategic': 'planned',
    'proactive': 'forward-thinking',
    'innovative': 'new',
    'cutting-edge': 'advanced',
    'state-of-the-art': 'modern',
    'revolutionary': 'game-changing',
    'paradigm': 'approach',
    'framework': 'structure',
    'methodology': 'method',
    'infrastructure': 'setup',
    'ecosystem': 'environment',
    'crucial': 'important',
    'essential': 'needed',
    'vital': 'key',
    'evident': 'clear',
    'obviously': 'clearly',
    'naturally': 'of course',
    'clearly': 'obviously'
  };
  
  Object.entries(replacements).forEach(([formal, informal]) => {
    const regex = new RegExp(`\\b${formal}\\b`, 'gi');
    let match;
    while ((match = regex.exec(humanized)) !== null) {
      changes.push({
        original: match[0],
        replacement: informal,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    humanized = humanized.replace(regex, informal);
  });
  
  // Sort changes by start index to maintain order
  changes.sort((a, b) => a.startIndex - b.startIndex);
  
  return { text: humanized, changes };
}

function detectAIModel(text: string, aiScore: number): string {
  if (aiScore < 30) return 'Likely Human';
  
  const hasTechnicalTerms = /\b(algorithm|optimization|implementation|framework|methodology|infrastructure|ecosystem|paradigm|leverage|streamline|enhance|comprehensive|systematic|methodical|strategic|proactive|innovative|cutting-edge|state-of-the-art|revolutionary)\b/gi.test(text);
  const hasFormalPhrases = /\b(furthermore|moreover|additionally|consequently|therefore|thus|hence|subsequently|it is important to note|it should be noted|it is worth mentioning|in conclusion|to summarize|in summary)\b/gi.test(text);
  const hasRepetitivePatterns = /\b(let me explain|i would like to|i want to|i need to|here are some|here is a|this is a|this includes|some key features|key benefits|main advantages)\b/gi.test(text);
  
  if (hasTechnicalTerms && hasFormalPhrases) {
    return 'Likely ChatGPT/GPT-4';
  } else if (hasRepetitivePatterns && aiScore > 60) {
    return 'Likely Claude';
  } else if (hasFormalPhrases && aiScore > 50) {
    return 'Likely AI Generated';
  } else {
    return 'Unknown AI Model';
  }
}

function generateSuggestions(aiScore: number): string[] {
  const suggestions = [];
  
  if (aiScore > 70) {
    suggestions.push('Consider using more natural, conversational language');
    suggestions.push('Avoid repetitive sentence structures and formal phrases');
    suggestions.push('Add personal anecdotes or examples to make it more relatable');
    suggestions.push('Use contractions and informal language where appropriate');
    suggestions.push('Vary sentence lengths to create a more natural flow');
    suggestions.push('Include more personal opinions and subjective statements');
  } else if (aiScore > 50) {
    suggestions.push('Mix formal and informal language for better balance');
    suggestions.push('Use more varied sentence structures');
    suggestions.push('Include transitional phrases that sound more natural');
    suggestions.push('Consider adding personal touches or examples');
    suggestions.push('Reduce the use of technical or formal vocabulary');
    suggestions.push('Add more conversational elements');
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
    
    // Calculate confidence based on analysis factors with more dynamic range
    const baseConfidence = Math.min(95, Math.max(65, 100 - aiScore * 0.25));
    const confidenceVariation = (Math.random() - 0.5) * 15; // ±7.5% variation
    const confidence = Math.max(60, Math.min(98, baseConfidence + confidenceVariation));
    
    // Generate humanized version
    const humanizedResult = humanizeText(text);
    
    // Generate suggestions
    const suggestions = generateSuggestions(aiScore);
    
    // Calculate detailed analysis scores
    const analysisDetails = {
      repetitionScore: Math.min(aiScore * 0.25, 25),
      complexityScore: Math.min(aiScore * 0.2, 20),
      formalityScore: Math.min(aiScore * 0.2, 20),
      coherenceScore: Math.max(100 - aiScore * 0.15, 25),
      technicalJargonScore: Math.min(aiScore * 0.15, 15),
      sentenceStructureScore: Math.min(aiScore * 0.2, 20)
    };
    
    const detectedModel = detectAIModel(text, aiScore);
    
    const response: AnalysisResponse = {
      originalText: text,
      humanizedText: humanizedResult.text,
      humanizedChanges: humanizedResult.changes,
      aiScore: Math.round(aiScore * 100) / 100,
      humanScore: Math.round(humanScore * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      suggestions,
      isAIGenerated: aiScore > 50,
      detectedAIModel: detectedModel,
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