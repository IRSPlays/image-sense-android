
const API_KEY = "AIzaSyDyzWlsUqTC0JLu7GmaSHe_kFWpUFb1OY8";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface GeminiResponse {
  suggestions: string[];
  error?: string;
}

export const getSearchSuggestions = async (query: string): Promise<GeminiResponse> => {
  if (!query.trim()) {
    return { suggestions: [] };
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Based on this search query about fish: "${query}", 
                suggest 5 related fish species or search terms that would be relevant. 
                Return only the suggestions as a JSON array of strings, no explanations.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 150,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return { suggestions: [], error: data.error.message };
    }

    // Parse the response to extract the suggestions array
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
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
    return { suggestions: [], error: "Network error" };
  }
};
