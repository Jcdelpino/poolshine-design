import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium text-sm">
        {language === 'es' ? 'EN' : 'ES'}
      </span>
    </Button>
  );
};

export default LanguageToggle;