import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  Droplets
} from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      info: '+52 (555) 123-4567',
      description: 'Llamadas y WhatsApp disponibles'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@aquacarepro.com',
      description: 'Respuesta en menos de 2 horas'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      info: 'Ciudad de México y Área Metropolitana',
      description: 'Cobertura en toda la zona'
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: 'Lun - Dom: 8:00 AM - 8:00 PM',
      description: 'Emergencias 24/7'
    }
  ];

  const services = [
    'Limpieza semanal',
    'Mantenimiento mensual',
    'Renovación completa',
    'Servicio de emergencia',
    'Análisis químico del agua',
    'Reparación de equipos'
  ];

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contacta con{' '}
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              Nosotros
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ¿Listo para tener la piscina de tus sueños? Contáctanos para una cotización 
            gratuita y personalizada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-card-soft border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Solicitar Cotización
                  </h3>
                  <p className="text-muted-foreground">
                    Gratuita y sin compromiso
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre
                    </label>
                    <Input 
                      placeholder="Tu nombre completo"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <Input 
                      placeholder="(555) 123-4567"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="tu@email.com"
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Servicio
                  </label>
                  <select className="w-full p-3 border border-border/50 rounded-lg bg-background text-foreground focus:border-primary focus:outline-none">
                    <option>Selecciona un servicio</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <Textarea 
                    placeholder="Cuéntanos sobre tu piscina y qué servicio necesitas..."
                    rows={4}
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-ocean hover:shadow-pool transition-all duration-300 transform hover:scale-105 py-3"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Solicitud
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <Card 
                    key={index}
                    className="group hover:shadow-card-soft transition-all duration-300 transform hover:-translate-y-1 border-border/50"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground mb-1">
                            {contact.title}
                          </h4>
                          <p className="text-primary font-medium mb-1">
                            {contact.info}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {contact.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Card */}
            <Card className="bg-gradient-water border-border/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-6">
                  <Droplets className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  ¿Necesitas Servicio Urgente?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contamos con servicio de emergencia 24/7 para resolver 
                  cualquier problema con tu piscina.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar Ahora
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;