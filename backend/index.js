
const express = require('express');
const cors = require('cors');
const { LlamaModel, LlamaContext, LlamaChatSession } = require('node-llama-cpp');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Llama model
const MODEL_PATH = path.join(__dirname, 'models/llama-2-7b-chat.gguf');
let model;
let context;

async function initializeModel() {
  try {
    console.log('Loading Llama model...');
    model = new LlamaModel({
      modelPath: MODEL_PATH,
      contextSize: 2048,
      batchSize: 512,
      gpuLayers: 0 // Set to higher number if GPU is available
    });
    
    context = new LlamaContext({ model });
    console.log('Llama model loaded successfully');
  } catch (err) {
    console.error('Error loading Llama model:', err);
    console.log('Please download a Llama model and place it in the models directory');
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// AI recommendations endpoint
app.post('/api/ai/recommendations', async (req, res) => {
  try {
    const { patientData } = req.body;
    
    if (!model || !context) {
      return res.status(503).json({
        success: false,
        message: 'AI model is not initialized. Please ensure the model is downloaded and properly loaded.'
      });
    }

    // Create a chat session
    const session = new LlamaChatSession({ context });

    // Construct a prompt with patient information
    const prompt = `You are a specialized AI assistant for speech therapists. 
Based on the following patient information, provide 3 specific activity recommendations 
to help improve their social communication skills. Format your response as a JSON array 
with objects containing 'title', 'description', and 'techniques' fields.
    
Patient information:
${JSON.stringify(patientData, null, 2)}`;

    console.log('Generating AI recommendations...');
    const response = await session.prompt(prompt);
    
    // Try to extract JSON from the response
    let recommendations;
    try {
      // Look for JSON-like structure in the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback to parsing the whole response
        recommendations = JSON.parse(response);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Provide a fallback response
      recommendations = [
        {
          title: "Communication Warm-up",
          description: "Daily practice with conversation starters in structured settings",
          techniques: ["Visual cue cards", "Role playing", "Structured dialogues"]
        },
        {
          title: "Emotion Recognition Activities",
          description: "Regular practice identifying emotions in facial expressions and tone of voice",
          techniques: ["Emotion cards", "Video modeling", "Mirroring exercises"]
        },
        {
          title: "Social Story Creation",
          description: "Creating and practicing social stories relevant to the patient's challenges",
          techniques: ["Visual storytelling", "Role play", "Scenario discussion"]
        }
      ];
    }
    
    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    res.status(500).json({
      success: false, 
      message: 'Failed to generate AI recommendations',
      error: error.message
    });
  }
});

// Initialize the AI model and start the server
(async () => {
  await initializeModel();
  
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`AI model ${model ? 'successfully loaded' : 'FAILED to load - please download the model'}`);
  });
})();
