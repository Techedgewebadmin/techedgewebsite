export interface FeatureProps {
  icon: string;
  titleKey: string;
  descriptionKey: string;
};

export const features: FeatureProps[] = [
  {
    icon: "tabler:chart-bar", 
    titleKey: 'Efficiency up to 98%',
    descriptionKey: 'Advanced solar technology with maximum performance',
  },
  {
    icon: "tabler:link", 
    titleKey: 'Seamless Integration',
    descriptionKey: 'Fits effortlessly into residential and industrial designs',
  },
  {
    icon: "tabler:grid-dots", 
    titleKey: 'Tailored Solutions',
    descriptionKey: 'Custom-engineered systems for your specific needs',
  },
  {
    icon: "tabler:wave-square", 
    titleKey: 'Smart Monitoring',
    descriptionKey: 'Real-time tracking and energy analytics',
  },
  {
    icon: "tabler:award", 
    titleKey: 'Certified Quality',
    descriptionKey: 'Fully compliant with IEC, TÜV, and CE standards.',
  },
];
