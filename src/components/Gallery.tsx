import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/contexts/ContentContext';
import { Eye, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface GroupedItem {
  category: string;
  items: GalleryItem[];
  title: string;
  description: string;
}

const Gallery = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupedItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language, t } = useLanguage();
  const { content } = useContent();
  const galleryContent = content.gallery[language as 'es' | 'en'];

  const categories = [t('gallery.filter.all'), t('gallery.filter.maintenance'), t('gallery.filter.renovation'), t('gallery.filter.cleaning'), t('gallery.filter.construction')];
  const [activeCategory, setActiveCategory] = useState(t('gallery.filter.all'));

  // Group items by category
  const groupedItems: GroupedItem[] = galleryContent.items.reduce((acc: GroupedItem[], item: GalleryItem) => {
    const existingGroup = acc.find(g => g.category === item.category);
    if (existingGroup) {
      existingGroup.items.push(item);
    } else {
      acc.push({
        category: item.category,
        items: [item],
        title: item.title,
        description: item.description
      });
    }
    return acc;
  }, []);

  const filteredGroups = activeCategory === t('gallery.filter.all')
    ? groupedItems 
    : groupedItems.filter(group => group.category.includes(activeCategory));

  const openModal = (group: GroupedItem) => {
    setSelectedGroup(group);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedGroup(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGroup) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedGroup.items.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGroup) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedGroup.items.length) % selectedGroup.items.length);
    }
  };

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
          {filteredGroups.map((group) => (
            <Card 
              key={group.category}
              className="group overflow-hidden hover:shadow-card-soft transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openModal(group)}
            >
              <div className="relative overflow-hidden">
                {/* Show first image as cover */}
                <img
                  src={group.items[0].image}
                  alt={group.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Multiple images indicator */}
                {group.items.length > 1 && (
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium">
                    <Images className="w-4 h-4" />
                    {group.items.length}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-accent text-accent-foreground">
                      {group.category}
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
                  {group.category}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {group.items.length > 1 
                    ? `${group.items.length} ${language === 'es' ? 'proyectos' : 'projects'}`
                    : group.description
                  }
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal for selected group with carousel */}
        {selectedGroup && (
          <div 
            className="fixed inset-0 bg-primary/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Navigation arrows */}
              {selectedGroup.items.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              <img
                src={selectedGroup.items[currentImageIndex].image}
                alt={selectedGroup.items[currentImageIndex].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Image dots indicator */}
              {selectedGroup.items.length > 1 && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedGroup.items.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex 
                          ? 'bg-primary-foreground' 
                          : 'bg-primary-foreground/40'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                <Badge className="mb-2 bg-accent text-accent-foreground">
                  {selectedGroup.category}
                </Badge>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  {selectedGroup.items[currentImageIndex].title}
                </h3>
                <p className="text-primary-foreground/90">
                  {selectedGroup.items[currentImageIndex].description}
                </p>
                {selectedGroup.items.length > 1 && (
                  <p className="text-primary-foreground/70 text-sm mt-2">
                    {currentImageIndex + 1} / {selectedGroup.items.length}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;