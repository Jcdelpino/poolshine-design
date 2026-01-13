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
