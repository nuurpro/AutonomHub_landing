import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Sliders, Download } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Upload Photo",
    desc: "Take a photo of your product (burger, dress, shoe) or use an existing asset.",
    icon: <Upload className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Select Vibe",
    desc: "Choose from our AI presets: Steam, Zoom, Cinematic, or Neon.",
    icon: <Sliders className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Download 4K",
    desc: "Get a ready-to-post MP4 video in minutes. No watermark on pro plans.",
    icon: <Download className="w-6 h-6" />
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">From Static to Viral in 3 Steps</h2>
             <p className="text-gray-400 text-lg mb-10">You don't need a degree in video editing. Our interface is designed for business owners who value their time.</p>
             
             <div className="space-y-8">
                {steps.map((step) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="lg:w-1/2 relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] bg-black"
             >
                {/* Simulated UI for How It Works Visual */}
                <img 
                  src="https://picsum.photos/600/800" 
                  alt="App Interface" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
                   <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-xs text-primary font-bold uppercase">Processing</span>
                         <span className="text-xs text-white">84%</span>
                      </div>
                      <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-primary h-full w-[84%]"></div>
                      </div>
                      <p className="text-sm text-white mt-2">Generating motion for "Spicy Burger"...</p>
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;