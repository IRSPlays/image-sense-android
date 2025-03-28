
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/Ya0ENDPDw/';

let model: tmImage.CustomMobileNet | null = null;
let isModelLoading = false;
let maxPredictions = 0;

export interface Prediction {
  className: string;
  probability: number;
}

export const loadModel = async (): Promise<boolean> => {
  if (model) return true;
  if (isModelLoading) return false;
  
  try {
    isModelLoading = true;
    console.log("Attempting to load model from:", MODEL_URL);
    const modelURL = MODEL_URL + 'model.json';
    const metadataURL = MODEL_URL + 'metadata.json';
    
    // Set a timeout to prevent hanging if the model fetch fails
    const modelPromise = tmImage.load(modelURL, metadataURL);
    const timeoutPromise = new Promise<null>((_, reject) => 
      setTimeout(() => reject(new Error("Model load timeout")), 15000)
    );
    
    model = await Promise.race([modelPromise, timeoutPromise]) as tmImage.CustomMobileNet;
    maxPredictions = model.getTotalClasses();
    isModelLoading = false;
    console.log("Model loaded successfully with", maxPredictions, "classes");
    return true;
  } catch (error) {
    console.error('Failed to load model:', error);
    isModelLoading = false;
    return false;
  }
};

export const getMaxPredictions = (): number => {
  return maxPredictions;
};

export const predictImage = async (imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<Prediction[]> => {
  if (!model) {
    return []; // Return empty array instead of throwing error
  }
  
  try {
    const predictions = await model.predict(imageElement);
    return predictions;
  } catch (error) {
    console.error('Prediction error:', error);
    return []; // Return empty array on error
  }
};

export const isModelReady = (): boolean => {
  return !!model;
};

export const isLoading = (): boolean => {
  return isModelLoading;
};
