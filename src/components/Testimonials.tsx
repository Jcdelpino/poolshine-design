import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      location: 'Residencial Las Palmas',
      rating: 5,
      text: 'Increíble servicio! Mi piscina nunca había estado tan cristalina. El equipo es súper profesional y puntuales. Los recomiendo al 100%.',
      avatar: 'MG',
      service: 'Mantenimiento Mensual'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      location: 'Villa del Mar',
      rating: 5,
      text: 'Renovaron completamente mi piscina y quedó espectacular. La atención al detalle y la calidad del trabajo superó mis expectativas.',
      avatar: 'CR',
      service: 'Renovación Completa'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      location: 'Country Club Montaña',
      rating: 5,
      text: 'Llevamos 2 años con su servicio de mantenimiento y estamos súper contentos. Siempre llegan a tiempo y dejan todo impecable.',
      avatar: 'AM',
      service: 'Mantenimiento Semanal'
    },
    {
      id: 4,
      name: 'Roberto Silva',
      location: 'Condominio Azul',
      rating: 5,
      text: 'Tuvimos una emergencia con el sistema de filtración y vinieron el mismo día. Servicio rápido y eficiente. Muy recomendados.',
      avatar: 'RS',
      service: 'Servicio de Emergencia'
    },
    {
      id: 5,
      name: 'Carmen Díaz',
      location: 'Fraccionamiento Sol',
      rating: 5,
      text: 'El mejor servicio de limpieza de piscinas que he contratado. Son muy profesionales y el precio es muy justo para la calidad que ofrecen.',
      avatar: 'CD',
      service: 'Limpieza Profunda'
    },
    {
      id: 6,
      name: 'Miguel Torres',
      location: 'Club Deportivo Elite',
      rating: 5,
      text: 'Manejan el mantenimiento de nuestras 3 piscinas comerciales. Excelente trabajo, siempre cumplen con los estándares de salubridad.',
      avatar: 'MT',
      service: 'Mantenimiento Comercial'
    }
  ];

  const stats = [
    { number: '500+', label: t('testimonials.stat1') },
    { number: '10+', label: t('testimonials.stat2') },
    { number: '100%', label: t('testimonials.stat3') },
    { number: '24/7', label: t('testimonials.stat4') }
  ];

  return (
    <section id="testimonios" className="py-20 bg-gradient-water">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('testimonials.title')}{' '}
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              {t('testimonials.title_highlight')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-ocean bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="group hover:shadow-card-soft transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              <CardContent className="p-6 relative z-10">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-accent fill-current" 
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>

                {/* Service Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.service}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarFallback className="bg-gradient-ocean text-primary-foreground font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 shadow-card-soft border border-border/50">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('testimonials.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('testimonials.cta.desc')}
            </p>
            <button className="bg-gradient-ocean text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-pool transition-all duration-300 transform hover:scale-105">
              {t('testimonials.cta.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;