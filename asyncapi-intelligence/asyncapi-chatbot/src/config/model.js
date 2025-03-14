module.exports = {
    modelId: 'rohith-yarramala/asyncapi-assitant-model', // Replace with your actual model ID
    huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
    modelOptions: {
      temperature: 0.7,
      max_length: 1000,
      top_p: 0.9,
    }
  };
  