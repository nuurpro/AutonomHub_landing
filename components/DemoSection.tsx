import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Play, AlertCircle, Loader2 } from 'lucide-react';
import Button from './ui/Button';
import { generateVideo, checkApiKey, promptForApiKey } from '../services/gemini';
import { AnimationVibe } from '../types';

const DemoSection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [vibe, setVibe] = useState<AnimationVibe>(AnimationVibe.CINEMATIC);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("Initializing AI...");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingMessages = [
    "Analyzing image composition...",
    "Identifying subjects...",
    "Calculating lighting paths...",
    "Hiring digital actors...",
    "Rendering 4K textures...",
    "Applying viral motion physics...",
    "Almost there..."
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      setGeneratedVideoUrl(null);
      setError(null);
    }
  };

  const cycleLoadingMessages = () => {
    let i = 0;
    return setInterval(() => {
      setLoadingMsg(loadingMessages[i % loadingMessages.length]);
      i++;
    }, 3000);
  };

  const handleGenerate = async () => {
    if (!file) return;
    setError(null);

    // Check API Key
    const hasKey = await checkApiKey();
    if (!hasKey) {
      try {
        await promptForApiKey();
        // Race condition mitigation as per guidelines: assume success and proceed immediately? 
        // Guideline says: "Do not add delay to mitigate the race condition."
        // We will try to proceed. Ideally we re-check or just try the call.
        // Let's try the call.
      } catch (e) {
        setError("API Key selection failed or was cancelled.");
        return;
      }
    }

    setIsGenerating(true);
    const msgInterval = cycleLoadingMessages();

    try {
      const videoUri = await generateVideo(file, vibe);
      setGeneratedVideoUrl(videoUri);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        // Token issue likely
        setError("API Key invalid or expired. Please try connecting again.");
        // Should reset key state theoretically, but we rely on window.aistudio
      } else {
        setError(err.message || "Failed to generate video. Please try again.");
      }
    } finally {
      clearInterval(msgInterval);
      setIsGenerating(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Try The Animator V1</h2>
          <p className="text-xl text-gray-400">See the magic yourself. Upload a photo, get a video.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
             <AlertCircle className="w-3 h-3" />
             <span>Powered by Google Gemini Veo. Requires API Key.</span>
          </div>
        </div>

        <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Input Side */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">1. Upload Image</label>
                <div 
                  className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors ${file ? 'border-primary bg-primary/5' : 'border-gray-700 hover:border-gray-500 hover:bg-white/5'}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-4" />
                      <p className="text-gray-400 text-sm">Click to upload JPG or PNG</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">2. Select Vibe</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(AnimationVibe).map((v) => (
                    <button
                      key={v}
                      onClick={() => setVibe(v)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all ${vibe === v ? 'bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(192,132,252,0.3)]' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-full" 
                size="lg"
                onClick={handleGenerate}
                disabled={!file}
                isLoading={isGenerating}
              >
                {!file ? 'Select an Image First' : 'Generate Video'}
                {!isGenerating && file && <Sparkles className="w-5 h-5 ml-2" />}
              </Button>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Output Side */}
            <div className="bg-black/50 rounded-xl border border-white/10 flex items-center justify-center min-h-[400px] relative overflow-hidden">
               {isGenerating ? (
                 <div className="text-center p-8">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-lg font-medium text-white animate-pulse">{loadingMsg}</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a minute or two...</p>
                 </div>
               ) : generatedVideoUrl ? (
                 <div className="relative w-full h-full">
                    <video 
                      src={generatedVideoUrl} 
                      controls 
                      autoPlay 
                      loop 
                      className="w-full h-full object-contain" 
                    />
                    <div className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      GENERATED
                    </div>
                 </div>
               ) : (
                 <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 opacity-50 ml-1" />
                    </div>
                    <p>Your viral video will appear here.</p>
                 </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;