import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'nav.services': 'Servicios',
    'nav.gallery': 'Galería',
    'nav.testimonials': 'Testimonios',
    'nav.contact': 'Contacto',
    'nav.quote': 'Cotizar Ahora',
    
    // Hero
    'hero.title1': 'Mantenimiento',
    'hero.title2': 'Profesional',
    'hero.title3': 'de Piscinas',
    'hero.subtitle': 'Transformamos tu piscina en un oasis cristalino. Servicios de mantenimiento, renovación y limpieza profesional con más de 10 años de experiencia.',
    'hero.benefit1': 'Agua cristalina garantizada',
    'hero.benefit2': 'Servicio 24/7',
    'hero.benefit3': 'Presupuesto gratuito',
    'hero.cta1': 'Solicitar Cotización',
    'hero.cta2': 'Llamar Ahora',
    
    // Services
    'services.title': 'Nuestros',
    'services.title_highlight': 'Servicios',
    'services.subtitle': 'Ofrecemos servicios integrales para el cuidado de tu piscina, desde mantenimiento regular hasta renovaciones completas.',
    'services.cleaning.title': 'Limpieza Profesional',
    'services.cleaning.desc': 'Limpieza profunda de piscinas con equipos especializados y productos de alta calidad.',
    'services.cleaning.feat1': 'Aspirado completo',
    'services.cleaning.feat2': 'Limpieza de filtros',
    'services.cleaning.feat3': 'Balance químico',
    'services.maintenance.title': 'Mantenimiento Técnico',
    'services.maintenance.desc': 'Revisión y mantenimiento de equipos de filtración, bombas y sistemas de circulación.',
    'services.maintenance.feat1': 'Revisión de bombas',
    'services.maintenance.feat2': 'Limpieza de skimmers',
    'services.maintenance.feat3': 'Calibración de equipos',
    'services.renovation.title': 'Renovación Completa',
    'services.renovation.desc': 'Renovamos tu piscina desde azulejos hasta sistemas de filtración para que luzca como nueva.',
    'services.renovation.feat1': 'Cambio de azulejos',
    'services.renovation.feat2': 'Renovación de liner',
    'services.renovation.feat3': 'Actualización de equipos',
    'services.chemical.title': 'Tratamiento Químico',
    'services.chemical.desc': 'Análisis y tratamiento químico del agua para mantener niveles óptimos de pH y cloro.',
    'services.chemical.feat1': 'Análisis de agua',
    'services.chemical.feat2': 'Dosificación química',
    'services.chemical.feat3': 'Control de algas',
    'services.support.title': 'Servicio 24/7',
    'services.support.desc': 'Disponibilidad completa para emergencias y mantenimiento urgente de tu piscina.',
    'services.support.feat1': 'Emergencias 24h',
    'services.support.feat2': 'Mantenimiento programado',
    'services.support.feat3': 'Respuesta rápida',
    'services.warranty.title': 'Garantía Total',
    'services.warranty.desc': 'Todos nuestros servicios incluyen garantía completa y seguimiento post-servicio.',
    'services.warranty.feat1': 'Garantía escrita',
    'services.warranty.feat2': 'Seguimiento mensual',
    'services.warranty.feat3': 'Satisfacción garantizada',
    'services.custom.title': '¿Necesitas un servicio personalizado?',
    'services.custom.desc': 'Contacta con nuestro equipo para recibir una cotización personalizada según las necesidades específicas de tu piscina.',
    'services.custom.cta': 'Solicitar Cotización Personalizada',
    
    // Gallery
    'gallery.title': 'Galería de',
    'gallery.title_highlight': 'Proyectos',
    'gallery.subtitle': 'Descubre algunos de nuestros trabajos más destacados y las transformaciones que hemos logrado en piscinas de todo tipo.',
    'gallery.filter.all': 'Todos',
    'gallery.filter.maintenance': 'Mantenimiento',
    'gallery.filter.renovation': 'Renovación',
    'gallery.filter.cleaning': 'Limpieza',
    
    // Testimonials
    'testimonials.title': 'Lo que dicen nuestros',
    'testimonials.title_highlight': 'Clientes',
    'testimonials.subtitle': 'La satisfacción de nuestros clientes es nuestra prioridad. Descubre por qué confían en nosotros para el cuidado de sus piscinas.',
    'testimonials.stat1': 'Clientes Satisfechos',
    'testimonials.stat2': 'Años de Experiencia',
    'testimonials.stat3': 'Garantía de Calidad',
    'testimonials.stat4': 'Soporte Disponible',
    'testimonials.cta.title': '¿Listo para unirte a nuestros clientes satisfechos?',
    'testimonials.cta.desc': 'Contacta con nosotros hoy mismo y descubre por qué somos la opción preferida para el mantenimiento de piscinas.',
    'testimonials.cta.button': 'Solicitar Cotización Gratuita',
    
    // Contact
    'contact.title': 'Contacta con',
    'contact.title_highlight': 'Nosotros',
    'contact.subtitle': '¿Listo para tener la piscina de tus sueños? Contáctanos para una cotización gratuita y personalizada.',
    'contact.form.title': 'Solicitar Cotización',
    'contact.form.subtitle': 'Gratuita y sin compromiso',
    'contact.form.name': 'Nombre',
    'contact.form.phone': 'Teléfono',
    'contact.form.email': 'Email',
    'contact.form.service': 'Tipo de Servicio',
    'contact.form.service_placeholder': 'Selecciona un servicio',
    'contact.form.message': 'Mensaje',
    'contact.form.message_placeholder': 'Cuéntanos sobre tu piscina y qué servicio necesitas...',
    'contact.form.submit': 'Enviar Solicitud',
    'contact.info.phone': 'Teléfono',
    'contact.info.phone_desc': 'Llamadas y WhatsApp disponibles',
    'contact.info.email': 'Email',
    'contact.info.email_desc': 'Respuesta en menos de 2 horas',
    'contact.info.location': 'Ubicación',
    'contact.info.location_value': 'Ciudad de México y Área Metropolitana',
    'contact.info.location_desc': 'Cobertura en toda la zona',
    'contact.info.hours': 'Horarios',
    'contact.info.hours_value': 'Lun - Dom: 8:00 AM - 8:00 PM',
    'contact.info.hours_desc': 'Emergencias 24/7',
    'contact.emergency.title': '¿Necesitas Servicio Urgente?',
    'contact.emergency.desc': 'Contamos con servicio de emergencia 24/7 para resolver cualquier problema con tu piscina.',
    'contact.emergency.call': 'Llamar Ahora',
    'contact.emergency.whatsapp': 'WhatsApp',
    
    // Contact services
    'contact.service.weekly': 'Limpieza semanal',
    'contact.service.monthly': 'Mantenimiento mensual',
    'contact.service.renovation': 'Renovación completa',
    'contact.service.emergency': 'Servicio de emergencia',
    'contact.service.analysis': 'Análisis químico del agua',
    'contact.service.repair': 'Reparación de equipos',
    
    // Footer
    'footer.tagline': 'Más de 10 años transformando piscinas en oasis cristalinos. Tu satisfacción es nuestra prioridad.',
    'footer.services_title': 'Nuestros Servicios',
    'footer.links_title': 'Enlaces Rápidos',
    'footer.help_title': '¿Necesitas Ayuda?',
    'footer.help_desc': 'Contáctanos para una cotización gratuita y personalizada.',
    'footer.quote_button': 'Cotización Gratuita',
    'footer.whatsapp_button': 'WhatsApp Directo',
    'footer.copyright': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.legal': 'Aviso Legal'
  },
  en: {
    // Header
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    
    // Hero
    'hero.title1': 'Professional',
    'hero.title2': 'Pool',
    'hero.title3': 'Maintenance',
    'hero.subtitle': 'We transform your pool into a crystal clear oasis. Maintenance, renovation and professional cleaning services with over 10 years of experience.',
    'hero.benefit1': 'Crystal clear water guaranteed',
    'hero.benefit2': '24/7 Service',
    'hero.benefit3': 'Free estimate',
    'hero.cta1': 'Request Quote',
    'hero.cta2': 'Call Now',
    
    // Services
    'services.title': 'Our',
    'services.title_highlight': 'Services',
    'services.subtitle': 'We offer comprehensive services for your pool care, from regular maintenance to complete renovations.',
    'services.cleaning.title': 'Professional Cleaning',
    'services.cleaning.desc': 'Deep pool cleaning with specialized equipment and high-quality products.',
    'services.cleaning.feat1': 'Complete vacuuming',
    'services.cleaning.feat2': 'Filter cleaning',
    'services.cleaning.feat3': 'Chemical balance',
    'services.maintenance.title': 'Technical Maintenance',
    'services.maintenance.desc': 'Review and maintenance of filtration equipment, pumps and circulation systems.',
    'services.maintenance.feat1': 'Pump inspection',
    'services.maintenance.feat2': 'Skimmer cleaning',
    'services.maintenance.feat3': 'Equipment calibration',
    'services.renovation.title': 'Complete Renovation',
    'services.renovation.desc': 'We renovate your pool from tiles to filtration systems to make it look like new.',
    'services.renovation.feat1': 'Tile replacement',
    'services.renovation.feat2': 'Liner renovation',
    'services.renovation.feat3': 'Equipment upgrade',
    'services.chemical.title': 'Chemical Treatment',
    'services.chemical.desc': 'Water analysis and chemical treatment to maintain optimal pH and chlorine levels.',
    'services.chemical.feat1': 'Water analysis',
    'services.chemical.feat2': 'Chemical dosing',
    'services.chemical.feat3': 'Algae control',
    'services.support.title': '24/7 Service',
    'services.support.desc': 'Full availability for emergencies and urgent pool maintenance.',
    'services.support.feat1': '24h emergencies',
    'services.support.feat2': 'Scheduled maintenance',
    'services.support.feat3': 'Quick response',
    'services.warranty.title': 'Total Warranty',
    'services.warranty.desc': 'All our services include full warranty and post-service follow-up.',
    'services.warranty.feat1': 'Written warranty',
    'services.warranty.feat2': 'Monthly follow-up',
    'services.warranty.feat3': 'Satisfaction guaranteed',
    'services.custom.title': 'Need a custom service?',
    'services.custom.desc': 'Contact our team to receive a personalized quote according to your pool\'s specific needs.',
    'services.custom.cta': 'Request Custom Quote',
    
    // Gallery
    'gallery.title': 'Project',
    'gallery.title_highlight': 'Gallery',
    'gallery.subtitle': 'Discover some of our most outstanding work and the transformations we have achieved in pools of all types.',
    'gallery.filter.all': 'All',
    'gallery.filter.maintenance': 'Maintenance',
    'gallery.filter.renovation': 'Renovation',
    'gallery.filter.cleaning': 'Cleaning',
    
    // Testimonials
    'testimonials.title': 'What our',
    'testimonials.title_highlight': 'Clients',
    'testimonials.subtitle': 'Our clients\' satisfaction is our priority. Discover why they trust us for their pool care.',
    'testimonials.stat1': 'Satisfied Clients',
    'testimonials.stat2': 'Years of Experience',
    'testimonials.stat3': 'Quality Guarantee',
    'testimonials.stat4': 'Available Support',
    'testimonials.cta.title': 'Ready to join our satisfied clients?',
    'testimonials.cta.desc': 'Contact us today and discover why we are the preferred choice for pool maintenance.',
    'testimonials.cta.button': 'Request Free Quote',
    
    // Contact
    'contact.title': 'Contact',
    'contact.title_highlight': 'Us',
    'contact.subtitle': 'Ready to have the pool of your dreams? Contact us for a free and personalized quote.',
    'contact.form.title': 'Request Quote',
    'contact.form.subtitle': 'Free and no commitment',
    'contact.form.name': 'Name',
    'contact.form.phone': 'Phone',
    'contact.form.email': 'Email',
    'contact.form.service': 'Service Type',
    'contact.form.service_placeholder': 'Select a service',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Tell us about your pool and what service you need...',
    'contact.form.submit': 'Send Request',
    'contact.info.phone': 'Phone',
    'contact.info.phone_desc': 'Calls and WhatsApp available',
    'contact.info.email': 'Email',
    'contact.info.email_desc': 'Response in less than 2 hours',
    'contact.info.location': 'Location',
    'contact.info.location_value': 'Mexico City and Metropolitan Area',
    'contact.info.location_desc': 'Coverage throughout the area',
    'contact.info.hours': 'Hours',
    'contact.info.hours_value': 'Mon - Sun: 8:00 AM - 8:00 PM',
    'contact.info.hours_desc': '24/7 emergencies',
    'contact.emergency.title': 'Need Urgent Service?',
    'contact.emergency.desc': 'We have 24/7 emergency service to solve any problem with your pool.',
    'contact.emergency.call': 'Call Now',
    'contact.emergency.whatsapp': 'WhatsApp',
    
    // Contact services
    'contact.service.weekly': 'Weekly cleaning',
    'contact.service.monthly': 'Monthly maintenance',
    'contact.service.renovation': 'Complete renovation',
    'contact.service.emergency': 'Emergency service',
    'contact.service.analysis': 'Water chemical analysis',
    'contact.service.repair': 'Equipment repair',
    
    // Footer
    'footer.tagline': 'Over 10 years transforming pools into crystal clear oases. Your satisfaction is our priority.',
    'footer.services_title': 'Our Services',
    'footer.links_title': 'Quick Links',
    'footer.help_title': 'Need Help?',
    'footer.help_desc': 'Contact us for a free and personalized quote.',
    'footer.quote_button': 'Free Quote',
    'footer.whatsapp_button': 'Direct WhatsApp',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.legal': 'Legal Notice'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};