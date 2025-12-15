import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Button from './ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-medium text-gray-300">V1.0 Now Live: The Animator</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          Stop Posting <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400 decoration-4 decoration-red-500 line-through decoration-slice">Boring Photos</span>. <br className="hidden md:block" />
          Get an <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primaryDark">SMM Agency</span> in your pocket.
        </motion.h1>

        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 mb-10"
        >
          Your SMM manager is slow. AutonomHub creates professional video ads from your static photos instantly using GenAI. No filming. No editing.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" onClick={() => window.location.href = "mailto:nuur.ergashev@gmail.com"}>
            Pre-register
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-3">
             {[...Array(5)].map((_, i) => (
               <img 
                key={i} 
                className="w-10 h-10 rounded-full border-2 border-background object-cover" 
                src={`https://picsum.photos/40/40?random=${i}`} 
                alt="User" 
              />
             ))}
             <div className="w-10 h-10 rounded-full border-2 border-background bg-surface flex items-center justify-center text-xs font-bold text-white">
               +15
             </div>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Trusted by 15+ Tashkent businesses
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;