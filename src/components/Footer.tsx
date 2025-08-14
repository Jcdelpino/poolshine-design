import { Droplets, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Limpieza Profesional',
    'Mantenimiento Técnico',
    'Renovación Completa',
    'Tratamiento Químico',
    'Servicio 24/7',
    'Garantía Total'
  ];

  const quickLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },  
    { label: 'Galería', href: '#galeria' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Droplets className="w-7 h-7 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">
                Total Pool Service
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Más de 10 años transformando piscinas en oasis cristalinos. 
              Tu satisfacción es nuestra prioridad.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-primary-foreground/80">
                <Phone className="w-4 h-4 mr-3" />
                <span>+52 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-primary-foreground/80">
                <Mail className="w-4 h-4 mr-3" />
                <span>info@totalpoolservice.com</span>
              </div>
              <div className="flex items-center text-primary-foreground/80">
                <MapPin className="w-4 h-4 mr-3" />  
                <span>Ciudad de México</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Nuestros Servicios
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              ¿Necesitas Ayuda?
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Contáctanos para una cotización gratuita y personalizada.
            </p>
            <div className="space-y-3">
              <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                Cotización Gratuita
              </button>
              <button className="w-full border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                WhatsApp Directo
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-primary-foreground/70 text-sm mb-4 md:mb-0">
              © {currentYear} Total Pool Service. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-primary-foreground/70">
              <span className="hover:text-accent transition-colors cursor-pointer">
                Política de Privacidad
              </span>
              <span className="hover:text-accent transition-colors cursor-pointer">
                Términos de Servicio
              </span>
              <span className="hover:text-accent transition-colors cursor-pointer">
                Aviso Legal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;