import React from 'react';
import { motion } from 'framer-motion';
import { Zap, DollarSign, Star } from 'lucide-react';
import { FeatureProps } from '../types';

const features: FeatureProps[] = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Faster than Humans",
    description: "Humans take 2 days to edit a reel. We take 2 minutes. Launch your ad campaign before lunch.",
    delay: 0.1
  },
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "$5 vs $500",
    description: "Stop paying expensive videographers and studios for simple Reels. AutonomHub is 100x cheaper.",
    delay: 0.2
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: "Algorithm Friendly",
    description: "Our AI generates high-retention motion that Instagram & TikTok algorithms love. Get viral reach.",
    delay: 0.3
  }
];

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-surface border border-white/5 p-8 rounded-2xl hover:border-primary/50 transition-colors group"
  >
    <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-primary/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The SMM Killer</h2>
          <p className="text-xl text-gray-400">Why businesses are switching to AutonomHub</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <FeatureCard key={index} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;