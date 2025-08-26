import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
import { Eye, X } from 'lucide-react';

// Import gallery images
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { language, t } = useLanguage();
  const { content } = useContent();
  const galleryContent = content.gallery[language as 'es' | 'en'];

  const categories = [t('gallery.filter.all'), t('gallery.filter.maintenance'), t('gallery.filter.renovation'), t('gallery.filter.cleaning')];
  const [activeCategory, setActiveCategory] = useState(t('gallery.filter.all'));

  const filteredItems = activeCategory === t('gallery.filter.all')
    ? galleryContent.items 
    : galleryContent.items.filter(item => item.category.includes(activeCategory));

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {galleryContent.title}{' '}
            <span className="bg-gradient-ocean bg-clip-text text-transparent">
              {galleryContent.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            {galleryContent.subtitle}
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-ocean text-primary-foreground shadow-float'
                    : 'bg-secondary text-secondary-foreground hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id}
              className="group overflow-hidden hover:shadow-card-soft transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-accent text-accent-foreground">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for selected image */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-primary/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <img
                src={filteredItems[selectedImage].image}
                alt={filteredItems[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                <Badge className="mb-2 bg-accent text-accent-foreground">
                  {filteredItems[selectedImage].category}
                </Badge>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  {filteredItems[selectedImage].title}
                </h3>
                <p className="text-primary-foreground/90">
                  {filteredItems[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;