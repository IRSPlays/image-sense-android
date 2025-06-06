import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/RIIUrqVaD/';

let model: tmImage.CustomMobileNet | null = null;
let isModelLoading = false;
let maxPredictions = 0;

// Enable memory optimizations for continuous predictions
tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 0);

export interface Prediction {
  className: string;
  probability: number;
}

export const loadModel = async (): Promise<boolean> => {
  if (model) return true;
  if (isModelLoading) return false;
  
  try {
    isModelLoading = true;
    const modelURL = MODEL_URL + 'model.json';
    const metadataURL = MODEL_URL + 'metadata.json';
    
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    isModelLoading = false;
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
    throw new Error('Model not loaded');
  }
  
  try {
    const predictions = await model.predict(imageElement);
    
    // Clean up memory after each prediction to prevent memory leaks during continuous use
    if (tf.memory().numTensors > 100) {
      tf.tidy(() => {});
    }
    
    return predictions;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

export const isModelReady = (): boolean => {
  return !!model;
};

export const isLoading = (): boolean => {
  return isModelLoading;
};
