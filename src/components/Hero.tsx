import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
import heroImage from '@/assets/hero-pool.jpg';

const Hero = () => {
  const { language } = useLanguage();
  const { content } = useContent();
  const heroContent = content.hero[language as 'es' | 'en'];

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

  const makePhoneCall = () => {
    window.location.href = "tel:+12392982858";
  };
  
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroContent.backgroundImage?.startsWith('/src/') 
            ? heroContent.backgroundImage.replace('/src/assets/', '/') 
            : (heroContent.backgroundImage || heroImage)}
          alt="Piscina cristalina mantenida profesionalmente"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Certified Badge */}
      <div className="absolute top-20 right-4 md:top-24 md:right-8 z-20 animate-pulse">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-accent via-yellow-400 to-accent border-4 border-yellow-300 rounded-2xl p-4 md:p-5 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="flex flex-col items-center text-center">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-primary mb-1" />
              <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-wide">Certified</span>
              <span className="text-sm md:text-base font-extrabold text-primary leading-tight">Pool Contractor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            {heroContent.title1}{' '}
            <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              {heroContent.title2}
            </span>{' '}
            {heroContent.title3}
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            {heroContent.subtitle}
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {[
              heroContent.benefit1,
              heroContent.benefit2,
              heroContent.benefit3
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-primary-foreground/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg shadow-float hover:shadow-pool transition-all duration-300 transform hover:scale-105"
              onClick={scrollToQuoteForm}
            >
              {heroContent.cta1}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold px-8 py-4 text-lg transition-all duration-300"
              onClick={makePhoneCall}
            >
              <Phone className="w-5 h-5 mr-2" />
              {heroContent.cta2}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;