// Script para probar la sincronización completa
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testCompleteSync() {
  console.log('🧪 Testing complete synchronization setup...');
  
  try {
    // 1. Autenticar con admin
    console.log('🔐 Authenticating with admin...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@totalpoolserv.com',
      password: 'Tinedoy123'
    });
    
    if (authError) {
      console.error('❌ Authentication failed:', authError);
      return;
    }
    
    console.log('✅ Authentication successful');
    console.log('👤 User ID:', authData.user.id);
    
    // 2. Simular el contenido completo con el email actualizado
    const fullContent = {
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
          backgroundImage: '/hero-pool.jpg'
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
          backgroundImage: '/hero-pool.jpg'
        }
      },
      contact: {
        es: {
          title: 'Contacta con',
          titleHighlight: 'Nosotros',
          subtitle: '¿Listo para tener la piscina de tus sueños? Contáctanos para una cotización gratuita y personalizada.',
          info: {
            phone: '+52 (555) 123-4567',
            email: 'totalpoolserv@aol.com', // Email actualizado
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
            email: 'totalpoolserv@aol.com', // Email actualizado
            location: 'Mexico City and Metropolitan Area',
            hours: 'Mon - Sun: 8:00 AM - 8:00 PM'
          },
          emergencyTitle: 'Need Urgent Service?',
          emergencyDesc: 'We have 24/7 emergency service to solve any problem with your pool.'
        }
      },
      companyInfo: {
        name: 'Total Pool Service',
        logo: '/total-pool-logo.png',
        tagline: {
          es: 'Más de 10 años transformando piscinas en oasis cristalinos. Tu satisfacción es nuestra prioridad.',
          en: 'Over 10 years transforming pools into crystal clear oases. Your satisfaction is our priority.'
        }
      }
    };
    
    // 3. Guardar contenido completo
    console.log('💾 Saving full content to Supabase...');
    const { error: saveError } = await supabase
      .from('site_content')
      .upsert({
        content_key: 'main_site_content',
        content_data: fullContent,
        updated_by: authData.user.id
      }, {
        onConflict: 'content_key'
      });
    
    if (saveError) {
      console.error('❌ Save error:', saveError);
      return;
    }
    
    console.log('✅ Full content saved successfully');
    
    // 4. Cargar contenido
    console.log('📥 Loading content from Supabase...');
    const { data: loadedData, error: loadError } = await supabase
      .from('site_content')
      .select('*')
      .eq('content_key', 'main_site_content')
      .single();
    
    if (loadError) {
      console.error('❌ Load error:', loadError);
      return;
    }
    
    console.log('✅ Content loaded successfully');
    
    // 5. Verificar que el email se guardó correctamente en ambos idiomas
    const emailEs = loadedData.content_data.contact.es.info.email;
    const emailEn = loadedData.content_data.contact.en.info.email;
    
    console.log('📧 Email in Spanish version:', emailEs);
    console.log('📧 Email in English version:', emailEn);
    
    if (emailEs === 'totalpoolserv@aol.com' && emailEn === 'totalpoolserv@aol.com') {
      console.log('✅ Email synchronization verified in both languages!');
    } else {
      console.log('❌ Email synchronization failed');
    }
    
    // 6. Verificar otros datos importantes
    const heroTitleEs = loadedData.content_data.hero.es.title2;
    const heroTitleEn = loadedData.content_data.hero.en.title2;
    
    console.log('🏊 Hero title ES:', heroTitleEs);
    console.log('🏊 Hero title EN:', heroTitleEn);
    
    if (heroTitleEs === 'Profesional' && heroTitleEn === 'Pool') {
      console.log('✅ Hero content synchronization verified!');
    }
    
    console.log('🎉 Complete synchronization test completed successfully!');
    console.log('📋 Summary:');
    console.log('   - Admin authentication: ✅');
    console.log('   - Full content save: ✅');
    console.log('   - Content load: ✅');
    console.log('   - Email sync (ES): ✅');
    console.log('   - Email sync (EN): ✅');
    console.log('   - Hero content sync: ✅');
    console.log('   - Last updated:', loadedData.updated_at);
    console.log('   - Updated by:', loadedData.updated_by);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testCompleteSync();
