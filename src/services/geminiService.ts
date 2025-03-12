
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = "AIzaSyDyzWlsUqTC0JLu7GmaSHe_kFWpUFb1OY8";
const genAI = new GoogleGenerativeAI(API_KEY);

export interface GeminiResponse {
  suggestions: string[];
  error?: string;
}

export const getSearchSuggestions = async (query: string): Promise<GeminiResponse> => {
  if (!query.trim()) {
    return { suggestions: [] };
  }

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 150,
        topP: 0.95,
        topK: 40,
      },
    });

    // Create the prompt for fish-related suggestions
    const prompt = `Based on this search query about fish: "${query}", 
      suggest 5 related fish species or search terms that would be relevant. 
      Return only the suggestions as a JSON array of strings, no explanations.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return { suggestions: [] };
    }

    try {
      // Try to extract a JSON array from the response text
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        const suggestions = JSON.parse(jsonMatch[0]);
        return { suggestions: Array.isArray(suggestions) ? suggestions : [] };
      }
      
      // Fallback: split by lines if JSON parsing fails
      const lines = text.split('\n')
        .map(line => line.replace(/^[\d-.*"\s]+/, '').trim())
        .filter(line => line.length > 0);
      
      return { suggestions: lines.slice(0, 5) };
    } catch (e) {
      console.error("Error parsing Gemini response:", e);
      return { suggestions: [], error: "Failed to parse suggestions" };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      suggestions: [], 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};

// Function to have a chat conversation about fish
export const chatWithFishExpert = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1000,
      },
    });

    // Start a chat session with a fish expert context
    const chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a fish specialist who can explain about fish and anything related to fish. You are familiar with fish species around the world." }],
        },
        {
          role: "model",
          parts: [{ text: "I'd be happy to serve as your fish specialist! I have extensive knowledge about fish species, marine biology, aquatic ecosystems, and fishing practices from around the world. Feel free to ask me anything about freshwater or saltwater fish, aquarium care, conservation, or any other fish-related topics. How can I help you today?" }],
        },
      ],
    });

    // Send the user's message to the chat
    const result = await chatSession.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Error in fish expert chat:", error);
    return "Sorry, I couldn't connect to the fish expert at the moment. Please try again later.";
  }
};
