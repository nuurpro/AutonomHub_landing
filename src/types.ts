import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export interface PricingTierProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  description: string;
}

export enum AnimationVibe {
  CINEMATIC = 'Cinematic & Slow',
  STEAM = 'Steamy & Hot',
  ZOOM = 'Fast Zoom & Action',
  NEON = 'Neon Lights & Cyberpunk'
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}
