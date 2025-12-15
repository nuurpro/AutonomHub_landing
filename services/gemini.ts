import { GoogleGenAI } from "@google/genai";
import { AnimationVibe } from "../types";

// Helper to convert File to Base64
export const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64Data,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const checkApiKey = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  return false;
};

export const promptForApiKey = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    await window.aistudio.openSelectKey();
  } else {
    console.warn("AI Studio overlay not found");
  }
};

export const generateVideo = async (
  imageFile: File,
  vibe: AnimationVibe
): Promise<string> => {
  // Always create a new instance to get the latest key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
    Transform this static image into a high-quality, professional video advertisement suitable for Instagram Reels.
    Style: ${vibe}.
    Motion: Smooth, cinematic, high definition.
    Make the subject come alive naturally.
  `;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: imagePart.data,
      mimeType: imagePart.mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '9:16' // Portrait for Reels
    }
  });

  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  if (operation.error) {
    throw new Error((operation.error.message as string) || "Video generation failed");
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  
  if (!videoUri) {
    throw new Error("No video URI returned");
  }

  // We need to fetch the actual video blob to display it, appending the key
  // However, simpler to return the URL and let the frontend fetch/display it with the key attached.
  // Note: The key is needed to access the download link.
  
  return `${videoUri}&key=${process.env.API_KEY}`;
};