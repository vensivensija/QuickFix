import React from 'react';
import { 
  Wrench, 
  Zap, 
  Disc, 
  Car, 
  Wind, 
  Refrigerator, 
  Cpu, 
  Tv, 
  Hammer, 
  Sparkles, 
  Droplets, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, className = 'w-6 h-6' }) => {
  switch (iconName.toLowerCase()) {
    case 'wrench':
    case 'plumbing':
      return <Wrench className={className} />;
    case 'zap':
    case 'electrical':
      return <Zap className={className} />;
    case 'disc':
    case 'tyre-puncture':
      return <Disc className={className} />;
    case 'car':
    case 'vehicle-repair':
      return <Car className={className} />;
    case 'wind':
    case 'ac-repair':
      return <Wind className={className} />;
    case 'refrigerator':
      return <Refrigerator className={className} />;
    case 'cpu':
    case 'washing-machine':
      return <Cpu className={className} />;
    case 'tv':
    case 'appliance':
      return <Tv className={className} />;
    case 'hammer':
    case 'carpenter':
      return <Hammer className={className} />;
    case 'sparkles':
    case 'cleaning':
      return <Sparkles className={className} />;
    case 'droplets':
    case 'water-pipe':
      return <Droplets className={className} />;
    case 'alerttriangle':
    case 'emergency-repair':
      return <AlertTriangle className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
};
