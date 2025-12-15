import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './ui/Button';
import { PricingTierProps } from '../types';

const tiers: PricingTierProps[] = [
  {
    name: "Marketer",
    price: "$89",
    description: "Perfect for solo marketers and small biz owners.",
    features: [
      "Unlimited AI Photo Animation",
      "50 high-quality generations/mo",
      "AI Caption Writer",
      "Basic Analytics",
      "Email Support"
    ],
    ctaText: "Start Free Trial",
    isPopular: false
  },
  {
    name: "Content Creator",
    price: "$249",
    description: "For agencies and serious influencers.",
    features: [
      "Everything in Marketer",
      "2,000 Credits / mo",
      "Veo 4K Video Generation",
      "Market Analysis Tools",
      "Virality Prediction AI",
      "Priority 24/7 Support"
    ],
    ctaText: "Get Access",
    isPopular: true
  }
];

const PricingCard: React.FC<PricingTierProps> = ({ name, price, description, features, isPopular, ctaText }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`relative p-8 rounded-2xl border ${isPopular ? 'bg-white/5 border-primary shadow-[0_0_30px_rgba(163,230,53,0.1)]' : 'bg-surface border-white/5'} flex flex-col h-full`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
        Most Popular
      </div>
    )}
    <div className="mb-6">
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-white">{price}</span>
        <span className="text-gray-500">/ mo</span>
      </div>
    </div>

    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feat, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
          <Check className="w-5 h-5 text-primary flex-shrink-0" />
          <span>{feat}</span>
        </li>
      ))}
    </ul>

    <Button variant={isPopular ? 'primary' : 'outline'} className="w-full" onClick={() => window.location.href = "mailto:nuur.ergashev@gmail.com"}>
      {ctaText}
    </Button>
  </motion.div>
);

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, Aggressive Pricing</h2>
          <p className="text-xl text-gray-400">Cheaper than an intern. Faster than an agency.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <PricingCard key={index} {...tier} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">Need a custom enterprise plan? <a href="mailto:nuur.ergashev@gmail.com" className="text-primary hover:underline">Contact Sales</a></p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;