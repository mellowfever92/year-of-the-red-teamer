/**
 * Input validation middleware
 * Validates and sanitizes request body data
 */

const MAX_PROMPT_LENGTH = 10000;
const MAX_SYSTEM_PROMPT_LENGTH = 5000;

export function validateAnalysisRequest(req, res, next) {
  const { systemPrompt, userInjection } = req.body;
  
  // Check required fields
  if (!systemPrompt || !userInjection) {
    return res.status(400).json({
      error: 'Missing required fields',
      detail: 'Both systemPrompt and userInjection are required'
    });
  }
  
  // Validate types
  if (typeof systemPrompt !== 'string' || typeof userInjection !== 'string') {
    return res.status(400).json({
      error: 'Invalid field types',
      detail: 'systemPrompt and userInjection must be strings'
    });
  }
  
  // Validate lengths
  if (systemPrompt.length > MAX_SYSTEM_PROMPT_LENGTH) {
    return res.status(400).json({
      error: 'System prompt too long',
      detail: `Maximum length is ${MAX_SYSTEM_PROMPT_LENGTH} characters`
    });
  }
  
  if (userInjection.length > MAX_PROMPT_LENGTH) {
    return res.status(400).json({
      error: 'User injection too long',
      detail: `Maximum length is ${MAX_PROMPT_LENGTH} characters`
    });
  }
  
  // Trim whitespace
  req.body.systemPrompt = systemPrompt.trim();
  req.body.userInjection = userInjection.trim();
  
  // Check if prompts are empty after trimming
  if (!req.body.systemPrompt || !req.body.userInjection) {
    return res.status(400).json({
      error: 'Empty fields',
      detail: 'systemPrompt and userInjection cannot be empty'
    });
  }
  
  next();
}
