import { Button } from '@/components/ui/button';
import { CheckCircle, Phone } from 'lucide-react';
import heroImage from '@/assets/hero-pool.jpg';

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Piscina cristalina mantenida profesionalmente"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Mantenimiento{' '}
            <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              Profesional
            </span>{' '}
            de Piscinas
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Transformamos tu piscina en un oasis cristalino. Servicios de mantenimiento, 
            renovación y limpieza profesional con más de 10 años de experiencia.
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {[
              'Agua cristalina garantizada',
              'Servicio 24/7',
              'Presupuesto gratuito'
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
            >
              Solicitar Cotización
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Llamar Ahora
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