import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
import { 
  Droplets, 
  Wrench, 
  Sparkles, 
  Shield, 
  Clock, 
  Award 
} from 'lucide-react';

const Services = () => {
  const { language, t } = useLanguage();
  const { content } = useContent();
  const servicesContent = content.services[language as 'es' | 'en'];

  const scrollToQuoteForm = () => {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
      // Smooth scroll to the form
      quoteForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      // Add highlight effect temporarily
      setTimeout(() => {
        quoteForm.classList.add('ring-4', 'ring-primary/30', 'ring-offset-4');
        setTimeout(() => {
          quoteForm.classList.remove('ring-4', 'ring-primary/30', 'ring-offset-4');
        }, 2000);
      }, 500);
    }
  };
  
  const services = [
    {
      icon: Droplets,
      title: t('services.cleaning.title'),
      description: t('services.cleaning.desc'),
      features: [t('services.cleaning.feat1'), t('services.cleaning.feat2'), t('services.cleaning.feat3')]
    },
    {
      icon: Wrench,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.desc'),
      features: [t('services.maintenance.feat1'), t('services.maintenance.feat2'), t('services.maintenance.feat3')]
    },
    {
      icon: Sparkles,
      title: t('services.renovation.title'),
      description: t('services.renovation.desc'),
      features: [t('services.renovation.feat1'), t('services.renovation.feat2'), t('services.renovation.feat3')]
    },
    {
      icon: Shield,
      title: t('services.chemical.title'),
      description: t('services.chemical.desc'),
      features: [t('services.chemical.feat1'), t('services.chemical.feat2'), t('services.chemical.feat3')]
    },
    {
      icon: Clock,
      title: t('services.support.title'),
      description: t('services.support.desc'),
      features: [t('services.support.feat1'), t('services.support.feat2'), t('services.support.feat3')]
    },
    {
      icon: Award,
      title: t('services.warranty.title'),
      description: t('services.warranty.desc'),
      features: [t('services.warranty.feat1'), t('services.warranty.feat2'), t('services.warranty.feat3')]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-gradient-water">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {servicesContent.title}{' '}
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              {servicesContent.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {servicesContent.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesContent.items.map((service, index) => {
            const IconComponent = services[index]?.icon || services[0].icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-card-soft transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-ocean rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 shadow-card-soft border border-border/50">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {servicesContent.customTitle}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {servicesContent.customDesc}
            </p>
            <button 
              className="bg-gradient-ocean text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-pool transition-all duration-300 transform hover:scale-105"
              onClick={scrollToQuoteForm}
            >
              {servicesContent.customCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;