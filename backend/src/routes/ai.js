/**
 * Generalized AI routing layer for YoTRT tools
 * Supports multiple interaction patterns with AI models
 */

import express from 'express';
import { callOpenRouterAPI, extractResponseText } from '../utils/openRouterClient.js';
import { validateAnalysisRequest } from '../middleware/validation.js';

const apiRouter = express.Router();

/**
 * POST /api/chat
 * Conversational AI endpoint for multi-turn dialogues
 */
apiRouter.post('/chat', async (req, res) => {
  try {
    const { messages, model, temperature, maxTokens } = req.body;
    
    const messagesAreValid = Array.isArray(messages) && messages.length > 0;
    if (!messagesAreValid) {
      return res.status(400).json({
        errorType: 'ValidationError',
        reason: 'messages field must be a non-empty array'
      });
    }
    
    for (const singleMessage of messages) {
      const hasRequiredFields = singleMessage.role && singleMessage.content;
      if (!hasRequiredFields) {
        return res.status(400).json({
          errorType: 'ValidationError',
          reason: 'Each message requires both role and content properties'
        });
      }
    }
    
    const llmResponse = await callOpenRouterAPI({
      messages,
      model,
      temperature,
      maxTokens
    });
    
    res.json({
      processed: true,
      aiReply: extractResponseText(llmResponse),
      modelUsed: llmResponse.model,
      tokenMetrics: llmResponse.usage
    });
    
  } catch (caughtError) {
    console.error('Chat endpoint failure:', caughtError);
    res.status(500).json({
      errorType: 'ProcessingFailure',
      reason: caughtError.message
    });
  }
});

/**
 * POST /api/analyze
 * Injection testing endpoint for security research tools
 */
apiRouter.post('/analyze', validateAnalysisRequest, async (req, res) => {
  try {
    const { systemPrompt, userInjection } = req.body;
    
    const conversationFlow = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInjection }
    ];
    
    const llmResponse = await callOpenRouterAPI({ messages: conversationFlow });
    
    res.json({
      processed: true,
      aiReply: extractResponseText(llmResponse),
      modelUsed: llmResponse.model,
      tokenMetrics: llmResponse.usage
    });
    
  } catch (caughtError) {
    console.error('Analysis endpoint failure:', caughtError);
    res.status(500).json({
      errorType: 'AnalysisFailed',
      reason: caughtError.message
    });
  }
});

/**
 * POST /api/complete
 * Text generation endpoint for creative and analytical tasks
 */
apiRouter.post('/complete', async (req, res) => {
  try {
    const { prompt, systemPrompt, model, temperature, maxTokens } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        errorType: 'ValidationError',
        reason: 'prompt field is mandatory'
      });
    }
    
    const conversationFlow = [];
    if (systemPrompt) {
      conversationFlow.push({ role: 'system', content: systemPrompt });
    }
    conversationFlow.push({ role: 'user', content: prompt });
    
    const llmResponse = await callOpenRouterAPI({
      messages: conversationFlow,
      model,
      temperature,
      maxTokens
    });
    
    res.json({
      processed: true,
      generatedText: extractResponseText(llmResponse),
      modelUsed: llmResponse.model,
      tokenMetrics: llmResponse.usage
    });
    
  } catch (caughtError) {
    console.error('Completion endpoint failure:', caughtError);
    res.status(500).json({
      errorType: 'CompletionFailed',
      reason: caughtError.message
    });
  }
});

export default apiRouter;
