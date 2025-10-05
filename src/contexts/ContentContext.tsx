import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContentService } from '@/services/contentService';

// Use public folder paths for images to ensure they load correctly in Vercel
const heroImage = '/hero-pool.jpg';
const gallery1 = '/gallery-1.jpg';
const gallery2 = '/gallery-2.jpg';
const gallery3 = '/gallery-3.jpg';
const gallery4 = '/gallery-4.jpg';
const gallery5 = '/gallery-5.jpg';
const gallery6 = '/gallery-6.jpg';
const totalPoolLogo = '/total-pool-logo.png';

// Función helper para hacer merge profundo de objetos
const deepMerge = (target: any, source: any): any => {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else if (source[key] !== undefined) {
      // Para arrays, reemplazar completamente en lugar de hacer merge
      if (Array.isArray(source[key])) {
        result[key] = [...source[key]];
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
};

// Content types for different sections
export interface HeroContent {
  title1: string;
  title2: string;
  title3: string;
  subtitle: string;
  benefit1: string;
  benefit2: string;
  benefit3: string;
  cta1: string;
  cta2: string;
  backgroundImage: string;
}

export interface ServiceContent {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  hours: string;
}

export interface SiteContent {
  hero: {
    es: HeroContent;
    en: HeroContent;
  };
  services: {
    es: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      customTitle: string;
      customDesc: string;
      customCta: string;
      items: ServiceContent[];
    };
    en: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      customTitle: string;
      customDesc: string;
      customCta: string;
      items: ServiceContent[];
    };
  };
  gallery: {
    es: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      items: GalleryItem[];
    };
    en: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      items: GalleryItem[];
    };
  };
  contact: {
    es: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      info: ContactInfo;
      emergencyTitle: string;
      emergencyDesc: string;
    };
    en: {
      title: string;
      titleHighlight: string;
      subtitle: string;
      info: ContactInfo;
      emergencyTitle: string;
      emergencyDesc: string;
    };
  };
  companyInfo: {
    name: string;
    logo: string;
    tagline: {
      es: string;
      en: string;
    };
  };
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: string, language: string, data: any) => Promise<void>;
  saveContent: () => Promise<void>;
  loadContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Default content structure
const defaultContent: SiteContent = {
  hero: {
    es: {
      title1: 'Mantenimiento',
      title2: 'Profesional',
      title3: 'de Piscinas',
      subtitle: 'Transformamos tu piscina en un oasis cristalino. Servicios de mantenimiento, renovación y limpieza profesional con más de 10 años de experiencia.',
      benefit1: 'Agua cristalina garantizada',
      benefit2: 'Servicio 24/7',
      benefit3: 'Presupuesto gratuito',
      cta1: 'Solicitar Cotización',
      cta2: 'Llamar Ahora',
      backgroundImage: heroImage
    },
    en: {
      title1: 'Professional',
      title2: 'Pool',
      title3: 'Maintenance',
      subtitle: 'We transform your pool into a crystal clear oasis. Maintenance, renovation and professional cleaning services with over 10 years of experience.',
      benefit1: 'Crystal clear water guaranteed',
      benefit2: '24/7 Service',
      benefit3: 'Free estimate',
      cta1: 'Request Quote',
      cta2: 'Call Now',
      backgroundImage: heroImage
    }
  },
  services: {
    es: {
      title: 'Nuestros',
      titleHighlight: 'Servicios',
      subtitle: 'Ofrecemos servicios integrales para el cuidado de tu piscina, desde mantenimiento regular hasta renovaciones completas.',
      customTitle: '¿Necesitas un servicio personalizado?',
      customDesc: 'Contacta con nuestro equipo para recibir una cotización personalizada según las necesidades específicas de tu piscina.',
      customCta: 'Solicitar Cotización Personalizada',
      items: [
        {
          id: 'cleaning',
          title: 'Limpieza Profesional',
          description: 'Limpieza profunda de piscinas con equipos especializados y productos de alta calidad.',
          features: ['Aspirado completo', 'Limpieza de filtros', 'Balance químico']
        },
        {
          id: 'maintenance',
          title: 'Mantenimiento Técnico',
          description: 'Revisión y mantenimiento de equipos de filtración, bombas y sistemas de circulación.',
          features: ['Revisión de bombas', 'Limpieza de skimmers', 'Calibración de equipos']
        },
        {
          id: 'renovation',
          title: 'Renovación Completa',
          description: 'Renovamos tu piscina desde azulejos hasta sistemas de filtración para que luzca como nueva.',
          features: ['Cambio de azulejos', 'Renovación de liner', 'Actualización de equipos']
        }
      ]
    },
    en: {
      title: 'Our',
      titleHighlight: 'Services',
      subtitle: 'We offer comprehensive services for your pool care, from regular maintenance to complete renovations.',
      customTitle: 'Need a custom service?',
      customDesc: 'Contact our team to receive a personalized quote according to your pool\'s specific needs.',
      customCta: 'Request Custom Quote',
      items: [
        {
          id: 'cleaning',
          title: 'Professional Cleaning',
          description: 'Deep pool cleaning with specialized equipment and high-quality products.',
          features: ['Complete vacuuming', 'Filter cleaning', 'Chemical balance']
        },
        {
          id: 'maintenance',
          title: 'Technical Maintenance',
          description: 'Review and maintenance of filtration equipment, pumps and circulation systems.',
          features: ['Pump inspection', 'Skimmer cleaning', 'Equipment calibration']
        },
        {
          id: 'renovation',
          title: 'Complete Renovation',
          description: 'We renovate your pool from tiles to filtration systems to make it look like new.',
          features: ['Tile replacement', 'Liner renovation', 'Equipment upgrade']
        }
      ]
    }
  },
  gallery: {
    es: {
      title: 'Galería de',
      titleHighlight: 'Proyectos',
      subtitle: 'Descubre algunos de nuestros trabajos más destacados y las transformaciones que hemos logrado en piscinas de todo tipo.',
      items: [
        {
          id: 1,
          image: gallery1,
          title: 'Piscina Infinity Luxury',
          category: 'Mantenimiento Premium',
          description: 'Piscina infinity con vista al océano, mantenimiento especializado en sistemas de desborde.'
        },
        {
          id: 2,
          image: gallery2,
          title: 'Piscina Residencial Moderna',
          category: 'Limpieza Profunda',
          description: 'Piscina rectangular con sistema de filtración moderno, limpieza semanal programada.'
        },
        {
          id: 3,
          image: gallery3,
          title: 'Renovación Completa',
          category: 'Renovación',
          description: 'Transformación total: nuevos azulejos, sistema de filtración y acabados modernos.'
        },
        {
          id: 4,
          image: gallery4,
          title: 'Servicio Profesional',
          category: 'Mantenimiento',
          description: 'Nuestro equipo especializado realizando limpieza y mantenimiento técnico.'
        },
        {
          id: 5,
          image: gallery5,
          title: 'Piscina con Spa',
          category: 'Mantenimiento Especializado',
          description: 'Piscina de lujo con jacuzzi integrado, mantenimiento de sistemas duales.'
        },
        {
          id: 6,
          image: gallery6,
          title: 'Piscina Olímpica',
          category: 'Mantenimiento Comercial',
          description: 'Piscina de competición con estándares olímpicos, mantenimiento diario especializado.'
        }
      ]
    },
    en: {
      title: 'Project',
      titleHighlight: 'Gallery',
      subtitle: 'Discover some of our most outstanding work and the transformations we have achieved in pools of all types.',
      items: [
        {
          id: 1,
          image: gallery1,
          title: 'Infinity Luxury Pool',
          category: 'Premium Maintenance',
          description: 'Infinity pool with ocean view, specialized maintenance for overflow systems.'
        },
        {
          id: 2,
          image: gallery2,
          title: 'Modern Residential Pool',
          category: 'Deep Cleaning',
          description: 'Rectangular pool with modern filtration system, scheduled weekly cleaning.'
        }
      ]
    }
  },
  contact: {
    es: {
      title: 'Contacta con',
      titleHighlight: 'Nosotros',
      subtitle: '¿Listo para tener la piscina de tus sueños? Contáctanos para una cotización gratuita y personalizada.',
      info: {
        phone: '+52 (555) 123-4567',
        email: 'info@totalpoolservice.com',
        location: 'Ciudad de México y Área Metropolitana',
        hours: 'Lun - Dom: 8:00 AM - 8:00 PM'
      },
      emergencyTitle: '¿Necesitas Servicio Urgente?',
      emergencyDesc: 'Contamos con servicio de emergencia 24/7 para resolver cualquier problema con tu piscina.'
    },
    en: {
      title: 'Contact',
      titleHighlight: 'Us',
      subtitle: 'Ready to have the pool of your dreams? Contact us for a free and personalized quote.',
      info: {
        phone: '+52 (555) 123-4567',
        email: 'info@totalpoolservice.com',
        location: 'Mexico City and Metropolitan Area',
        hours: 'Mon - Sun: 8:00 AM - 8:00 PM'
      },
      emergencyTitle: 'Need Urgent Service?',
      emergencyDesc: 'We have 24/7 emergency service to solve any problem with your pool.'
    }
  },
  companyInfo: {
    name: 'Total Pool Service',
    logo: totalPoolLogo,
    tagline: {
      es: 'Más de 10 años transformando piscinas en oasis cristalinos. Tu satisfacción es nuestra prioridad.',
      en: 'Over 10 years transforming pools into crystal clear oases. Your satisfaction is our priority.'
    }
  }
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  const updateContent = async (section: string, language: string, data: any) => {
    setContent(prev => {
      let newContent;
      
      // Manejo especial para companyInfo que no tiene estructura multilenguaje en el nivel superior
      if (section === 'companyInfo') {
        newContent = {
          ...prev,
          companyInfo: {
            ...prev.companyInfo,
            ...data
          }
        };
      } else {
        // Para todas las demás secciones con estructura multilenguaje
        newContent = {
          ...prev,
          [section]: {
            ...prev[section as keyof SiteContent],
            [language]: {
              ...(prev[section as keyof SiteContent] as any)[language as 'es' | 'en'],
              ...data
            }
          }
        };
      }
      
      // Guardar automáticamente en localStorage después de cada actualización
      try {
        localStorage.setItem('siteContent', JSON.stringify(newContent));
        console.log('Content auto-saved to localStorage');
        
        // También intentar guardar en Supabase si hay usuario autenticado
        ContentService.saveToSupabase(newContent).then((success) => {
          if (success) {
            console.log('Content auto-saved to Supabase');
          } else {
            console.warn('Failed to auto-save to Supabase');
          }
        }).catch((error) => {
          console.error('Error auto-saving to Supabase:', error);
        });
      } catch (error) {
        console.error('Error auto-saving content:', error);
      }
      
      return newContent;
    });
  };

  const saveContent = async () => {
    try {
      // Primero guardar en localStorage como backup
      localStorage.setItem('siteContent', JSON.stringify(content));
      
      // Luego intentar guardar en Supabase usando el servicio
      const success = await ContentService.saveToSupabase(content);
      
      if (!success) {
        console.warn('Failed to save to Supabase, content saved to localStorage only');
        return Promise.resolve();
      }

      console.log('Content saved successfully to both localStorage and Supabase');
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving content:', error);
      return Promise.reject(error);
    }
  };

  const loadContent = async () => {
    try {
      // Función para corregir rutas de imágenes inválidas
      const fixImagePaths = (obj: any): any => {
        if (typeof obj === 'string' && obj.startsWith('/src/assets/')) {
          // Convertir /src/assets/image.jpg a /image.jpg
          return obj.replace('/src/assets/', '/');
        }
        if (Array.isArray(obj)) {
          return obj.map(item => fixImagePaths(item));
        }
        if (obj && typeof obj === 'object') {
          const fixed: any = {};
          for (const key in obj) {
            fixed[key] = fixImagePaths(obj[key]);
          }
          return fixed;
        }
        return obj;
      };

      // Intentar cargar desde Supabase primero usando el servicio
      try {
        const supabaseContent = await ContentService.loadFromSupabase();
        
        if (supabaseContent) {
          // Corregir rutas de imágenes antes de hacer merge
          const fixedContent = fixImagePaths(supabaseContent);
          
          // Usar deepMerge para mezclar contenido de Supabase con valores por defecto
          const mergedContent = deepMerge(defaultContent, fixedContent);
          
          setContent(mergedContent);
          
          // Sincronizar localStorage con Supabase
          localStorage.setItem('siteContent', JSON.stringify(mergedContent));
          
          console.log('Content loaded successfully from Supabase');
          return;
        }
      } catch (supabaseError) {
        console.warn('Could not load from Supabase, falling back to localStorage:', supabaseError);
      }

      // Fallback a localStorage si Supabase falla
      const savedContent = localStorage.getItem('siteContent');
      if (savedContent) {
        const parsedContent = JSON.parse(savedContent);
        
        // Corregir rutas de imágenes antes de hacer merge
        const fixedContent = fixImagePaths(parsedContent);
        
        // Usar deepMerge para mezclar contenido guardado con valores por defecto
        const mergedContent = deepMerge(defaultContent, fixedContent);
        
        setContent(mergedContent);
        console.log('Content loaded successfully from localStorage');
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, saveContent, loadContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
