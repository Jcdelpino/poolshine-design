import React, { useState, useRef } from 'react';
import { useContent } from '@/contexts/ContentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/AdminLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ContentStatus } from '@/components/ContentStatus';
import { 
  Save, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3,
  Eye,
  Settings,
  Globe,
  Camera,
  Type,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

const Admin = () => {
  console.log('Admin component is loading...');
  
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    );
  }
  
  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  
  try {
    const { content, updateContent, saveContent, loadContent } = useContent();
    const { language, setLanguage } = useLanguage();
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('hero');
    const [previewMode, setPreviewMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingImage, setUploadingImage] = useState<string | null>(null);

    const handleImageUpload = async (file: File, section: string, field: string) => {
      setUploadingImage(`${section}-${field}`);
      
      try {
        // Convertir archivo a Data URL (base64) para persistencia en localStorage
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // Actualizar contenido con Data URL persistente
        if (section === 'hero') {
          // Sincronizar imagen del hero en ambos idiomas para evitar desajustes
          updateContent('hero', 'es', { [field]: dataUrl });
          updateContent('hero', 'en', { [field]: dataUrl });
        } else if (section === 'gallery') {
          // Manejar actualización de galería
          const galleryItems = [...content.gallery[language as 'es' | 'en'].items];
          const itemIndex = parseInt(field);
          if (galleryItems[itemIndex]) {
            galleryItems[itemIndex].image = dataUrl;
            updateContent('gallery', language, { items: galleryItems });
          }
        } else if (section === 'companyInfo' && field === 'logo') {
          // companyInfo no usa el parámetro language de la misma manera
          updateContent('companyInfo', '', { [field]: dataUrl });
        }

        // En una app real, aquí subirías al servidor
        console.log('Image uploaded (base64):', file.name);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploadingImage(null);
      }
    };

    const handleSave = async () => {
      try {
        await saveContent();
        console.log('Content saved successfully');
        alert('Contenido guardado exitosamente');
        // No recargar la página - los cambios ya están guardados automáticamente
      } catch (error) {
        console.error('Error saving:', error);
        alert('Error al guardar el contenido');
      }
    };

    const ImageUploadButton = ({ section, field, currentImage, label }: {
      section: string;
      field: string;
      currentImage: string;
      label: string;
    }) => (
      <div className="space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center space-x-4">
          {currentImage && (
            <img 
              src={currentImage} 
              alt={label}
              className="w-16 h-16 object-cover rounded-lg border"
            />
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fileInputRef.current?.click();
              fileInputRef.current?.setAttribute('data-section', section);
              fileInputRef.current?.setAttribute('data-field', field);
            }}
            disabled={uploadingImage === `${section}-${field}`}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploadingImage === `${section}-${field}` ? 'Subiendo...' : 'Cambiar'}
          </Button>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-background">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const section = e.target.getAttribute('data-section') || '';
              const field = e.target.getAttribute('data-field') || '';
              handleImageUpload(file, section, field);
            }
          }}
        />

        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-primary" />
                  <h1 className="text-2xl font-bold">Panel de Administración</h1>
                </div>
                <Badge variant="outline">Total Pool Service</Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'es' | 'en')}
                    className="bg-background border border-border rounded px-2 py-1"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {previewMode ? 'Editar' : 'Vista previa'}
                </Button>
                
                <Button onClick={handleSave} className="bg-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar cambios
                </Button>
                
                <Button
                  variant="outline"
                  onClick={logout}
                  className="text-destructive hover:text-destructive"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Content Status Card */}
          <div className="mb-6">
            <ContentStatus onRefresh={loadContent} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="hero" className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span>Hero</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Servicios</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Galería</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Contacto</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Empresa</span>
              </TabsTrigger>
            </TabsList>

            {/* Hero Section */}
            <TabsContent value="hero" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="w-5 h-5" />
                    <span>Sección Hero - {language === 'es' ? 'Español' : 'English'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título 1</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].title1}
                        onChange={(e) => updateContent('hero', language, { title1: e.target.value })}
                        placeholder="Ej: Mantenimiento"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título 2 (Destacado)</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].title2}
                        onChange={(e) => updateContent('hero', language, { title2: e.target.value })}
                        placeholder="Ej: Profesional"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título 3</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].title3}
                        onChange={(e) => updateContent('hero', language, { title3: e.target.value })}
                        placeholder="Ej: de Piscinas"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subtítulo</label>
                    <Textarea
                      value={content.hero[language as 'es' | 'en'].subtitle}
                      onChange={(e) => updateContent('hero', language, { subtitle: e.target.value })}
                      rows={3}
                      placeholder="Descripción principal del servicio..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Beneficio 1</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].benefit1}
                        onChange={(e) => updateContent('hero', language, { benefit1: e.target.value })}
                        placeholder="Primer beneficio"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Beneficio 2</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].benefit2}
                        onChange={(e) => updateContent('hero', language, { benefit2: e.target.value })}
                        placeholder="Segundo beneficio"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Beneficio 3</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].benefit3}
                        onChange={(e) => updateContent('hero', language, { benefit3: e.target.value })}
                        placeholder="Tercer beneficio"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Botón Primario</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].cta1}
                        onChange={(e) => updateContent('hero', language, { cta1: e.target.value })}
                        placeholder="Texto del botón principal"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Botón Secundario</label>
                      <Input
                        value={content.hero[language as 'es' | 'en'].cta2}
                        onChange={(e) => updateContent('hero', language, { cta2: e.target.value })}
                        placeholder="Texto del botón secundario"
                      />
                    </div>
                  </div>

                  <Separator />

                  <ImageUploadButton
                    section="hero"
                    field="backgroundImage"
                    currentImage={content.hero[language as 'es' | 'en'].backgroundImage}
                    label="Imagen de fondo del Hero"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Section */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Sección Servicios - {language === 'es' ? 'Español' : 'English'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título</label>
                      <Input
                        value={content.services[language as 'es' | 'en'].title}
                        onChange={(e) => updateContent('services', language, { title: e.target.value })}
                        placeholder="Ej: Nuestros"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título Destacado</label>
                      <Input
                        value={content.services[language as 'es' | 'en'].titleHighlight}
                        onChange={(e) => updateContent('services', language, { titleHighlight: e.target.value })}
                        placeholder="Ej: Servicios"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subtítulo</label>
                    <Textarea
                      value={content.services[language as 'es' | 'en'].subtitle}
                      onChange={(e) => updateContent('services', language, { subtitle: e.target.value })}
                      rows={2}
                      placeholder="Descripción de los servicios..."
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Servicios Individuales</h4>
                    {content.services[language as 'es' | 'en'].items.map((service, index) => (
                      <Card key={service.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Título del Servicio</label>
                              <Input
                                value={service.title}
                                onChange={(e) => {
                                  const updatedItems = [...content.services[language as 'es' | 'en'].items];
                                  updatedItems[index].title = e.target.value;
                                  updateContent('services', language, { items: updatedItems });
                                }}
                                placeholder="Nombre del servicio"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">ID del Servicio</label>
                              <Input
                                value={service.id}
                                onChange={(e) => {
                                  const updatedItems = [...content.services[language as 'es' | 'en'].items];
                                  updatedItems[index].id = e.target.value;
                                  updateContent('services', language, { items: updatedItems });
                                }}
                                placeholder="id-del-servicio"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-1 block">Descripción</label>
                            <Textarea
                              value={service.description}
                              onChange={(e) => {
                                const updatedItems = [...content.services[language as 'es' | 'en'].items];
                                updatedItems[index].description = e.target.value;
                                updateContent('services', language, { items: updatedItems });
                              }}
                              rows={2}
                              placeholder="Descripción del servicio..."
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-1 block">Características (una por línea)</label>
                            <Textarea
                              value={service.features.join('\n')}
                              onChange={(e) => {
                                const updatedItems = [...content.services[language as 'es' | 'en'].items];
                                updatedItems[index].features = e.target.value.split('\n').filter(f => f.trim());
                                updateContent('services', language, { items: updatedItems });
                              }}
                              rows={3}
                              placeholder="Característica 1&#10;Característica 2&#10;Característica 3"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Sección de Servicios Personalizados</h4>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título</label>
                      <Input
                        value={content.services[language as 'es' | 'en'].customTitle}
                        onChange={(e) => updateContent('services', language, { customTitle: e.target.value })}
                        placeholder="Título de la sección personalizada"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Descripción</label>
                      <Textarea
                        value={content.services[language as 'es' | 'en'].customDesc}
                        onChange={(e) => updateContent('services', language, { customDesc: e.target.value })}
                        rows={2}
                        placeholder="Descripción de servicios personalizados..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Botón CTA</label>
                      <Input
                        value={content.services[language as 'es' | 'en'].customCta}
                        onChange={(e) => updateContent('services', language, { customCta: e.target.value })}
                        placeholder="Texto del botón"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery Section */}
            <TabsContent value="gallery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Galería - {language === 'es' ? 'Español' : 'English'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título</label>
                      <Input
                        value={content.gallery[language as 'es' | 'en'].title}
                        onChange={(e) => updateContent('gallery', language, { title: e.target.value })}
                        placeholder="Ej: Galería de"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título Destacado</label>
                      <Input
                        value={content.gallery[language as 'es' | 'en'].titleHighlight}
                        onChange={(e) => updateContent('gallery', language, { titleHighlight: e.target.value })}
                        placeholder="Ej: Proyectos"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subtítulo</label>
                    <Textarea
                      value={content.gallery[language as 'es' | 'en'].subtitle}
                      onChange={(e) => updateContent('gallery', language, { subtitle: e.target.value })}
                      rows={2}
                      placeholder="Descripción de la galería..."
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">Elementos de la Galería</h4>
                      <Button
                        onClick={() => {
                          const newItem = {
                            id: Date.now(),
                            image: '/placeholder.svg',
                            title: 'Nuevo Proyecto',
                            category: 'Mantenimiento',
                            description: 'Descripción del proyecto...'
                          };
                          const updatedItems = [...content.gallery[language as 'es' | 'en'].items, newItem];
                          updateContent('gallery', language, { items: updatedItems });
                        }}
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar elemento
                      </Button>
                    </div>
                    
                    {content.gallery[language as 'es' | 'en'].items.map((item, index) => (
                      <Card key={item.id} className="border-l-4 border-l-accent">
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">Elemento {index + 1}</h5>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updatedItems = content.gallery[language as 'es' | 'en'].items.filter((_, i) => i !== index);
                                updateContent('gallery', language, { items: updatedItems });
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <ImageUploadButton
                            section="gallery"
                            field={index.toString()}
                            currentImage={item.image}
                            label="Imagen del proyecto"
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Título</label>
                              <Input
                                value={item.title}
                                onChange={(e) => {
                                  const updatedItems = [...content.gallery[language as 'es' | 'en'].items];
                                  updatedItems[index].title = e.target.value;
                                  updateContent('gallery', language, { items: updatedItems });
                                }}
                                placeholder="Título del proyecto"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-1 block">Categoría</label>
                              <Input
                                value={item.category}
                                onChange={(e) => {
                                  const updatedItems = [...content.gallery[language as 'es' | 'en'].items];
                                  updatedItems[index].category = e.target.value;
                                  updateContent('gallery', language, { items: updatedItems });
                                }}
                                placeholder="Categoría del proyecto"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-1 block">Descripción</label>
                            <Textarea
                              value={item.description}
                              onChange={(e) => {
                                const updatedItems = [...content.gallery[language as 'es' | 'en'].items];
                                updatedItems[index].description = e.target.value;
                                updateContent('gallery', language, { items: updatedItems });
                              }}
                              rows={2}
                              placeholder="Descripción del proyecto..."
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Section */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>Contacto - {language === 'es' ? 'Español' : 'English'}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título</label>
                      <Input
                        value={content.contact[language as 'es' | 'en'].title}
                        onChange={(e) => updateContent('contact', language, { title: e.target.value })}
                        placeholder="Ej: Contacta con"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título Destacado</label>
                      <Input
                        value={content.contact[language as 'es' | 'en'].titleHighlight}
                        onChange={(e) => updateContent('contact', language, { titleHighlight: e.target.value })}
                        placeholder="Ej: Nosotros"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subtítulo</label>
                    <Textarea
                      value={content.contact[language as 'es' | 'en'].subtitle}
                      onChange={(e) => updateContent('contact', language, { subtitle: e.target.value })}
                      rows={2}
                      placeholder="Descripción de contacto..."
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>Información de Contacto</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Teléfono</span>
                        </label>
                        <Input
                          value={content.contact[language as 'es' | 'en'].info.phone}
                          onChange={(e) => updateContent('contact', language, { 
                            info: { ...content.contact[language as 'es' | 'en'].info, phone: e.target.value }
                          })}
                          placeholder="+52 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </label>
                        <Input
                          value={content.contact[language as 'es' | 'en'].info.email}
                          onChange={(e) => updateContent('contact', language, { 
                            info: { ...content.contact[language as 'es' | 'en'].info, email: e.target.value }
                          })}
                          placeholder="info@empresa.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Ubicación</span>
                        </label>
                        <Input
                          value={content.contact[language as 'es' | 'en'].info.location}
                          onChange={(e) => updateContent('contact', language, { 
                            info: { ...content.contact[language as 'es' | 'en'].info, location: e.target.value }
                          })}
                          placeholder="Ciudad y área de servicio"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Horarios</span>
                        </label>
                        <Input
                          value={content.contact[language as 'es' | 'en'].info.hours}
                          onChange={(e) => updateContent('contact', language, { 
                            info: { ...content.contact[language as 'es' | 'en'].info, hours: e.target.value }
                          })}
                          placeholder="Lun - Dom: 8:00 AM - 8:00 PM"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Sección de Emergencias</h4>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Título de Emergencia</label>
                      <Input
                        value={content.contact[language as 'es' | 'en'].emergencyTitle}
                        onChange={(e) => updateContent('contact', language, { emergencyTitle: e.target.value })}
                        placeholder="¿Necesitas Servicio Urgente?"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Descripción de Emergencia</label>
                      <Textarea
                        value={content.contact[language as 'es' | 'en'].emergencyDesc}
                        onChange={(e) => updateContent('contact', language, { emergencyDesc: e.target.value })}
                        rows={2}
                        placeholder="Descripción del servicio de emergencia..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Company Info Section */}
            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Información de la Empresa</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre de la Empresa</label>
                    <Input
                      value={content.companyInfo.name}
                      onChange={(e) => updateContent('companyInfo', '', { name: e.target.value })}
                      placeholder="Nombre de la empresa"
                    />
                  </div>

                  <ImageUploadButton
                    section="companyInfo"
                    field="logo"
                    currentImage={content.companyInfo.logo}
                    label="Logo de la Empresa"
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Eslóganes por Idioma</h4>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Eslogan en Español</label>
                      <Textarea
                        value={content.companyInfo.tagline.es}
                        onChange={(e) => updateContent('companyInfo', '', { 
                          tagline: { ...content.companyInfo.tagline, es: e.target.value }
                        })}
                        rows={2}
                        placeholder="Eslogan de la empresa en español..."
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Eslogan en Inglés</label>
                      <Textarea
                        value={content.companyInfo.tagline.en}
                        onChange={(e) => updateContent('companyInfo', '', { 
                          tagline: { ...content.companyInfo.tagline, en: e.target.value }
                        })}
                        rows={2}
                        placeholder="Company tagline in English..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Admin component:', error);
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8d7da', 
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#721c24', marginBottom: '1rem' }}>
            Error en el Panel de Administración
          </h1>
          <p style={{ color: '#721c24', marginBottom: '1rem' }}>
            Ha ocurrido un error al cargar el panel.
          </p>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '1rem', 
            borderRadius: '4px',
            color: '#721c24',
            fontSize: '0.9rem',
            maxWidth: '500px',
            overflow: 'auto'
          }}>
            {error instanceof Error ? error.message : 'Error desconocido'}
          </pre>
        </div>
      </div>
    );
  }
};

export default Admin;
