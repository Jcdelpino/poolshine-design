import { useState } from 'react';
import { Menu, X, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
import LanguageToggle from '@/components/LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { content } = useContent();

  const navItems = [
    { label: t('nav.services'), href: '#servicios' },
    { label: t('nav.gallery'), href: '#galeria' },
    { label: t('nav.testimonials'), href: '#testimonios' },
    { label: t('nav.contact'), href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
            <div className="w-10 h-10 bg-gradient-ocean rounded-full flex items-center justify-center">
              <Droplets className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              {content.companyInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <Button 
              variant="default" 
              className="bg-gradient-ocean hover:shadow-pool transition-all duration-300"
            >
              {t('nav.quote')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center justify-between mt-4">
                <LanguageToggle />
                <Button 
                  variant="default" 
                  className="bg-gradient-ocean hover:shadow-pool transition-all duration-300 flex-1 ml-4"
                >
                  {t('nav.quote')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
