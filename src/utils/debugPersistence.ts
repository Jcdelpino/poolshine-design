import { supabase } from '@/integrations/supabase/client';
import { ContentService } from '@/services/contentService';

export const debugPersistence = async () => {
  console.log('=== DEBUGGING PERSISTENCE ===');
  
  // 1. Verificar variables de entorno
  console.log('1. Environment Variables:');
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
  
  // 2. Verificar conexión a Supabase
  console.log('2. Supabase Connection:');
  try {
    const { data, error } = await supabase.from('site_content').select('count').limit(1);
    if (error) {
      console.error('Supabase connection error:', error);
    } else {
      console.log('Supabase connection successful');
    }
  } catch (err) {
    console.error('Supabase connection failed:', err);
  }
  
  // 3. Verificar autenticación
  console.log('3. Authentication Status:');
  const { data: { user } } = await supabase.auth.getUser();
  console.log('Authenticated user:', user);
  console.log('Local admin auth:', sessionStorage.getItem('admin_authenticated'));
  
  // 4. Probar guardado directo
  console.log('4. Testing Direct Save:');
  const testContent = {
    hero: {
      es: { title1: 'Test', title2: 'Test', title3: 'Test', subtitle: 'Test', benefit1: 'Test', benefit2: 'Test', benefit3: 'Test', cta1: 'Test', cta2: 'Test', backgroundImage: '/test.jpg' },
      en: { title1: 'Test', title2: 'Test', title3: 'Test', subtitle: 'Test', benefit1: 'Test', benefit2: 'Test', benefit3: 'Test', cta1: 'Test', cta2: 'Test', backgroundImage: '/test.jpg' }
    },
    services: { es: { title: 'Test', titleHighlight: 'Test', subtitle: 'Test', customTitle: 'Test', customDesc: 'Test', customCta: 'Test', items: [] }, en: { title: 'Test', titleHighlight: 'Test', subtitle: 'Test', customTitle: 'Test', customDesc: 'Test', customCta: 'Test', items: [] } },
    gallery: { es: { title: 'Test', titleHighlight: 'Test', subtitle: 'Test', items: [] }, en: { title: 'Test', titleHighlight: 'Test', subtitle: 'Test', items: [] } },
    contact: { es: { title: 'Test', titleHighlight: 'Test', subtitle: 'Test', info: { phone: 'Test', email: 'Test', location: 'Test', hours: 'Test' }, emergencyTitle: 'Test', emergencyDesc: 'Test' }, en: { title: 'Test', titleHighlight: 'Test', subtitle: 'Test', info: { phone: 'Test', email: 'Test', location: 'Test', hours: 'Test' }, emergencyTitle: 'Test', emergencyDesc: 'Test' } },
    companyInfo: { name: 'Test', logo: '/test.jpg', tagline: { es: 'Test', en: 'Test' } }
  };
  
  try {
    const success = await ContentService.saveToSupabase(testContent as any);
    console.log('Direct save result:', success);
  } catch (error) {
    console.error('Direct save error:', error);
  }
  
  // 5. Verificar permisos
  console.log('5. Admin Permissions:');
  try {
    const hasPermissions = await ContentService.hasAdminPermissions();
    console.log('Has admin permissions:', hasPermissions);
  } catch (error) {
    console.error('Permission check error:', error);
  }
  
  console.log('=== END DEBUG ===');
};
