/**
 * General-purpose OpenRouter API utilities
 * Can be used by any YoTRT tool that needs AI capabilities
 */

import { config } from '../config/config.js';

/**
 * Make a request to OpenRouter API
 * @param {Object} params - Request parameters
 * @param {string} params.model - AI model to use (optional, defaults to config)
 * @param {Array} params.messages - Chat messages array
 * @param {number} params.temperature - Temperature setting (optional)
 * @param {number} params.maxTokens - Max tokens (optional)
 * @returns {Promise<Object>} API response
 */
export async function callOpenRouterAPI({ model, messages, temperature, maxTokens }) {
  const requestBody = {
    model: model || config.openRouter.model,
    messages: messages
  };
  
  // Add optional parameters if provided
  if (temperature !== undefined) {
    requestBody.temperature = temperature;
  }
  if (maxTokens !== undefined) {
    requestBody.max_tokens = maxTokens;
  }
  
  const response = await fetch(`${config.openRouter.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openRouter.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/mellowfever92/year-of-the-red-teamer',
      'X-Title': 'Year of the Red Teamer - AI Tools'
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }
  
  return await response.json();
}

/**
 * Extract the AI response text from OpenRouter API response
 * @param {Object} apiResponse - Response from OpenRouter API
 * @returns {string} The AI-generated text
 */
export function extractResponseText(apiResponse) {
  return apiResponse.choices?.[0]?.message?.content || '';
}
