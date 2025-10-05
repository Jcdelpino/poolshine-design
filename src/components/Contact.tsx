import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
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
  const { language, t } = useLanguage();
  const { content } = useContent();
  const contactContent = content.contact[language as 'es' | 'en'];
  
  const info = contactContent.info;
  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      info: info.phone,
      description: t('contact.info.phone_desc')
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      info: info.email,
      description: t('contact.info.email_desc')
    },
    {
      icon: MapPin,
      title: t('contact.info.location'),
      info: info.location,
      description: t('contact.info.location_desc')
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      info: info.hours,
      description: t('contact.info.hours_desc')
    }
  ];

  const services = [
    t('contact.service.weekly'),
    t('contact.service.monthly'),
    t('contact.service.renovation'),
    t('contact.service.emergency'),
    t('contact.service.analysis'),
    t('contact.service.repair')
  ];

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {contactContent.title}{' '}
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              {contactContent.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {contactContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card id="quote-form" className="shadow-card-soft border-border/50 transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-ocean rounded-xl flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {t('contact.form.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('contact.form.subtitle')}
                  </p>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.name')}
                    </label>
                    <Input 
                      placeholder="Tu nombre completo"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <Input 
                      placeholder="(555) 123-4567"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input 
                    type="email"
                    placeholder="tu@email.com"
                    className="border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.service')}
                  </label>
                  <select className="w-full p-3 border border-border/50 rounded-lg bg-background text-foreground focus:border-primary focus:outline-none">
                    <option>{t('contact.form.service_placeholder')}</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    placeholder={t('contact.form.message_placeholder')}
                    rows={4}
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-ocean hover:shadow-pool transition-all duration-300 transform hover:scale-105 py-3"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.form.submit')}
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
                  {contactContent.emergencyTitle}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {contactContent.emergencyDesc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('contact.emergency.call')}
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('contact.emergency.whatsapp')}
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