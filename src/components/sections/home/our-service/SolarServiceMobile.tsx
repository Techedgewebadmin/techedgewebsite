import type { Service } from '@/config/services.json';
import { Icon } from '@iconify-icon/react';
import { useState } from 'react';

interface Props {
  services: Service[];
}

export const SolarServicesMobile = ({ services }: Props) => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <div
          key={index}
          className={`border-2 border-dashed border-secondary-dark rounded-lg overflow-hidden ${openAccordion === index ? 'bg-muted/10' : 'bg-accent-foreground'}`}
        >
          {/* Accordion Header */}
          <button
            className="w-full flex items-center justify-between p-4 font-grotesk text-sm"
            onClick={() => toggleAccordion(index)}
          >
            <span>
              {service.title}
            </span>
            <Icon icon="ion:arrow-down" className={`text-base transition-transform duration-300 ${openAccordion === index ? 'rotate-180' : ''}`} />
          </button>

          {/* Accordion Content */}
          <div
            className={`transition-all duration-300 ease-in-out ${openAccordion === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="p-4 pt-0 space-y-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
