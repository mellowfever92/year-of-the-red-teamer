# AI Integration Guide for YoTRT Tools

This guide shows you how to add **optional** AI capabilities to any Year of the Red Teamer tool using the backend infrastructure.

## 🎯 Design Principle

Tools should work **standalone OR with backend support** - this means:
- ✅ Tool functions without backend
- ✅ Backend enhances features when available
- ✅ Graceful degradation when backend is offline
- ✅ No breaking changes to existing functionality

## 🔧 Integration Pattern

### Step 1: Create a Dual-Mode AI Client

Add this bridge layer to your tool's JavaScript:

```javascript
// YoTRT AI Bridge - Supports both proxy and standalone modes
const IntelligenceLayer = (function() {
  const strategyConfig = {
    currentStrategy: 'proxy', // 'proxy' or 'standalone'
    proxyEndpoint: 'http://localhost:3000',
    fallbackCredential: '', // Only for standalone
    modelPreference: 'x-ai/grok-2-1212',
    creativityLevel: 0.7,
    tokenBudget: 1000
  };
  
  // Strategy selector based on availability
  const selectExecutionStrategy = async () => {
    if (strategyConfig.currentStrategy === 'standalone') {
      return new StandaloneExecutor();
    }
    
    const proxyAvailable = await checkProxyHealth();
    if (proxyAvailable) {
      return new ProxyExecutor();
    }
    
    console.warn('Proxy unavailable, falling back to standalone mode');
    return new StandaloneExecutor();
  };
  
  // Proxy health verification
  const checkProxyHealth = async () => {
    try {
      const healthCheck = await fetch(`${strategyConfig.proxyEndpoint}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      return healthCheck.ok;
    } catch (checkError) {
      return false;
    }
  };
  
  // Proxy-based executor
  class ProxyExecutor {
    async execute(conversationTurns, overrides = {}) {
      const targetModel = overrides.modelPreference || strategyConfig.modelPreference;
      const creativity = overrides.creativityLevel || strategyConfig.creativityLevel;
      const tokenLimit = overrides.tokenBudget || strategyConfig.tokenBudget;
      
      const proxyPayload = {
        messages: conversationTurns,
        model: targetModel,
        temperature: creativity,
        maxTokens: tokenLimit
      };
      
      const proxyResponse = await fetch(`${strategyConfig.proxyEndpoint}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proxyPayload)
      });
      
      if (!proxyResponse.ok) {
        const errorPayload = await proxyResponse.json();
        throw new Error(errorPayload.reason || 'Proxy execution failed');
      }
      
      const resultData = await proxyResponse.json();
      return resultData.aiReply;
    }
  }
  
  // Standalone executor (requires credential)
  class StandaloneExecutor {
    async execute(conversationTurns, overrides = {}) {
      if (!strategyConfig.fallbackCredential) {
        throw new Error('Standalone mode requires credential configuration');
      }
      
      const targetModel = overrides.modelPreference || strategyConfig.modelPreference;
      const creativity = overrides.creativityLevel || strategyConfig.creativityLevel;
      const tokenLimit = overrides.tokenBudget || strategyConfig.tokenBudget;
      
      const directPayload = {
        model: targetModel,
        messages: conversationTurns,
        temperature: creativity,
        max_tokens: tokenLimit
      };
      
      const directResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strategyConfig.fallbackCredential}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(directPayload)
      });
      
      if (!directResponse.ok) {
        throw new Error(`Direct execution failed: ${directResponse.status}`);
      }
      
      const resultData = await directResponse.json();
      return resultData.choices[0].message.content;
    }
  }
  
  // Public API
  return {
    configure: (newConfig) => Object.assign(strategyConfig, newConfig),
    getConfig: () => ({ ...strategyConfig }),
    converse: async (turns, opts) => {
      const executor = await selectExecutionStrategy();
      return await executor.execute(turns, opts);
    },
    healthCheck: checkProxyHealth
  };
})();
```

### Step 2: Add UI Controls

Include mode selection in your tool:

```html
<!-- Intelligence Layer Controls -->
<div class="intelligence-controls" style="margin: 20px 0; padding: 15px; border: 2px solid #00ff88;">
  <h3>🧠 Intelligence Layer Configuration</h3>
  <div style="margin: 10px 0;">
    <button id="btn-proxy-mode" class="mode-btn active">🔒 Proxy Mode (Secure)</button>
    <button id="btn-standalone-mode" class="mode-btn">⚡ Standalone Mode (Dev)</button>
  </div>
  <div id="layer-status" style="margin-top: 10px; padding: 10px; background: rgba(0,255,136,0.1);"></div>
</div>

<style>
.mode-btn {
  padding: 10px 20px;
  margin: 5px;
  background: rgba(0,255,136,0.2);
  border: 2px solid #00ff88;
  color: #00ff88;
  cursor: pointer;
  font-family: 'Courier New', monospace;
}
.mode-btn.active {
  background: #00ff88;
  color: #0a0e27;
  font-weight: bold;
}
</style>

<script>
// Wire up mode switching
document.getElementById('btn-proxy-mode').addEventListener('click', () => {
  IntelligenceLayer.configure({ currentStrategy: 'proxy' });
  updateModeUI('proxy');
  refreshLayerStatus();
});

document.getElementById('btn-standalone-mode').addEventListener('click', () => {
  const userConfirmed = confirm('Standalone mode requires API credential. Continue?');
  if (userConfirmed) {
    IntelligenceLayer.configure({ currentStrategy: 'standalone' });
    updateModeUI('standalone');
    refreshLayerStatus();
  }
});

function updateModeUI(activeMode) {
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = activeMode === 'proxy' 
    ? document.getElementById('btn-proxy-mode')
    : document.getElementById('btn-standalone-mode');
  activeBtn.classList.add('active');
}

async function refreshLayerStatus() {
  const statusElement = document.getElementById('layer-status');
  const currentConfig = IntelligenceLayer.getConfig();
  
  if (currentConfig.currentStrategy === 'standalone') {
    statusElement.innerHTML = '⚠️ <strong>Standalone Mode Active</strong><br>Requires credential configuration';
    statusElement.style.borderLeft = '4px solid #ffaa00';
    return;
  }
  
  statusElement.innerHTML = '🔄 Checking proxy availability...';
  statusElement.style.borderLeft = '4px solid #00aaff';
  
  const proxyHealthy = await IntelligenceLayer.healthCheck();
  
  if (proxyHealthy) {
    statusElement.innerHTML = '✅ <strong>Proxy Connected</strong><br>Backend is operational and ready';
    statusElement.style.borderLeft = '4px solid #00ff88';
  } else {
    statusElement.innerHTML = '❌ <strong>Proxy Unavailable</strong><br>Start backend server or switch to standalone mode';
    statusElement.style.borderLeft = '4px solid #ff0066';
  }
}

// Check status when page loads
window.addEventListener('load', refreshLayerStatus);
</script>
```

### Step 3: Integrate Into Your Tool Logic

Replace existing AI interactions:

```javascript
// Example: Injection testing function
async function performInjectionTest(systemInstructions, attackVector) {
  const conversationStructure = [
    { role: 'system', content: systemInstructions },
    { role: 'user', content: attackVector }
  ];
  
  try {
    displayStatus('Processing via Intelligence Layer...');
    
    const intelligenceResponse = await IntelligenceLayer.converse(conversationStructure);
    
    displayResults(intelligenceResponse);
    return intelligenceResponse;
    
  } catch (executionError) {
    console.error('Intelligence Layer error:', executionError);
    displayError(`Failed to process: ${executionError.message}`);
    return null;
  }
}

// Example: Simple prompt completion
async function generateCompletionText(userPromptText) {
  const singleTurn = [
    { role: 'user', content: userPromptText }
  ];
  
  const completionResult = await IntelligenceLayer.converse(singleTurn, {
    creativityLevel: 0.9,
    tokenBudget: 500
  });
  
  return completionResult;
}
```

## 🎨 Real-World Example: Transforming Week 9 Tool

### Original Implementation (Insecure):
```javascript
// Week 9 original code - API key exposed
const SECRET_KEY = 'sk-or-v1-xxxxxxxxxxxxx'; // ❌ DANGER!

async function runAnalysis() {
  const promptText = document.getElementById('system-prompt').value;
  const injectionText = document.getElementById('user-injection').value;
  
  const rawResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'x-ai/grok-2-1212',
      messages: [
        { role: 'system', content: promptText },
        { role: 'user', content: injectionText }
      ]
    })
  });
  
  const parsedData = await rawResponse.json();
  showAnalysisResult(parsedData.choices[0].message.content);
}
```

### Transformed Implementation (Secure & Optional):
```javascript
// Week 9 with Intelligence Layer - no exposed secrets!

async function runAnalysis() {
  const promptText = document.getElementById('system-prompt').value;
  const injectionText = document.getElementById('user-injection').value;
  
  const dialogueFlow = [
    { role: 'system', content: promptText },
    { role: 'user', content: injectionText }
  ];
  
  try {
    const analysisResult = await IntelligenceLayer.converse(dialogueFlow);
    showAnalysisResult(analysisResult);
  } catch (processingError) {
    showError(`Analysis failed: ${processingError.message}`);
  }
}
```

## 🌟 Architecture Benefits

1. **Strategy Pattern**: Automatically selects best execution method
2. **Zero Secrets**: No API keys in client code when using proxy
3. **Graceful Fallback**: Auto-switches if proxy unavailable  
4. **Health Monitoring**: Real-time backend status checks
5. **Flexible Override**: Per-request parameter customization

## 🧪 Testing Workflow

### Test Proxy Strategy
1. Launch backend: `cd backend && npm run dev`
2. Open tool in browser
3. Click "Proxy Mode" button
4. Verify status shows ✅ Connected
5. Test AI functionality

### Test Standalone Strategy
1. Click "Standalone Mode" button
2. Configure credential: `IntelligenceLayer.configure({ fallbackCredential: 'sk-...' })`
3. Test functionality
4. Clear credential before closing

### Test Auto-Fallback
1. Start in Proxy Mode with backend running
2. Stop backend server
3. Make AI request
4. Observe automatic fallback (check console logs)

## 🔄 Migration Steps

For converting existing tools:

- [ ] Add `IntelligenceLayer` module to your HTML/JS
- [ ] Create mode selection UI elements
- [ ] Replace all direct API calls with `IntelligenceLayer.converse()`
- [ ] Add status monitoring
- [ ] Remove hardcoded API credentials
- [ ] Test both proxy and standalone modes
- [ ] Document configuration for users

## 💡 Advanced Usage

### Custom Model Selection
```javascript
const advancedResult = await IntelligenceLayer.converse(
  conversationTurns,
  { 
    modelPreference: 'anthropic/claude-3-opus',
    creativityLevel: 0.3,  // More deterministic
    tokenBudget: 2000       // Longer responses
  }
);
```

### Configuration Updates
```javascript
// Update proxy endpoint for production
IntelligenceLayer.configure({
  proxyEndpoint: 'https://your-backend.railway.app'
});

// Set default model
IntelligenceLayer.configure({
  modelPreference: 'meta-llama/llama-3-70b-instruct'
});
```

## 🚨 Security Best Practices

- ❌ Never commit `fallbackCredential` values
- ❌ Never log API keys or tokens
- ✅ Always use proxy mode for production
- ✅ Keep backend `.env` files private
- ✅ Use HTTPS endpoints in production
- ✅ Rotate credentials regularly

## 📚 Additional Resources

- `backend/README.md` - Backend setup instructions
- `DEPLOYMENT.md` - Production deployment guide  
- `ARCHITECTURE.md` - System design documentation
