import { Card, CardContent } from '@/components/ui/card';
import { 
  Droplets, 
  Wrench, 
  Sparkles, 
  Shield, 
  Clock, 
  Award 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: 'Limpieza Profesional',
      description: 'Limpieza profunda de piscinas con equipos especializados y productos de alta calidad.',
      features: ['Aspirado completo', 'Limpieza de filtros', 'Balance químico']
    },
    {
      icon: Wrench,
      title: 'Mantenimiento Técnico',
      description: 'Revisión y mantenimiento de equipos de filtración, bombas y sistemas de circulación.',
      features: ['Revisión de bombas', 'Limpieza de skimmers', 'Calibración de equipos']
    },
    {
      icon: Sparkles,
      title: 'Renovación Completa',
      description: 'Renovamos tu piscina desde azulejos hasta sistemas de filtración para que luzca como nueva.',
      features: ['Cambio de azulejos', 'Renovación de liner', 'Actualización de equipos']
    },
    {
      icon: Shield,
      title: 'Tratamiento Químico',
      description: 'Análisis y tratamiento químico del agua para mantener niveles óptimos de pH y cloro.',
      features: ['Análisis de agua', 'Dosificación química', 'Control de algas']
    },
    {
      icon: Clock,
      title: 'Servicio 24/7',
      description: 'Disponibilidad completa para emergencias y mantenimiento urgente de tu piscina.',
      features: ['Emergencias 24h', 'Mantenimiento programado', 'Respuesta rápida']
    },
    {
      icon: Award,
      title: 'Garantía Total',
      description: 'Todos nuestros servicios incluyen garantía completa y seguimiento post-servicio.',
      features: ['Garantía escrita', 'Seguimiento mensual', 'Satisfacción garantizada']
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-gradient-water">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nuestros{' '}
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ofrecemos servicios integrales para el cuidado de tu piscina, 
            desde mantenimiento regular hasta renovaciones completas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
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
              ¿Necesitas un servicio personalizado?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contacta con nuestro equipo para recibir una cotización personalizada 
              según las necesidades específicas de tu piscina.
            </p>
            <button className="bg-gradient-ocean text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-pool transition-all duration-300 transform hover:scale-105">
              Solicitar Cotización Personalizada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;