
# Backend for Talk Through Application

This is the backend server for the Talk Through application with LLM integration.

## Setup

1. Install dependencies:
```
npm install
```

2. Download a Llama model:
   - Create a `models` directory in the backend folder
   - Download a compatible Llama model (recommended: llama-2-7b-chat.gguf)
   - Place the model file in the `models` directory
   - You can find models at: https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF

3. Start the server:
```
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/ai/recommendations` - Generate AI recommendations for a patient

## Environment Variables

- `PORT` - Port for the server (default: 5000)

## Note

The Llama model requires significant system resources. For better performance:
- Use a machine with at least 8GB RAM
- For GPU acceleration, modify the `gpuLayers` parameter in the code
