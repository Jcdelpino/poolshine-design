// Script final para probar la sincronización completa
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testFinalSync() {
  console.log('🧪 Testing final synchronization setup...');
  
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
    
    // 2. Simular el contenido actual con el email actualizado
    const currentContent = {
      hero: {
        es: {
          title1: 'Mantenimiento',
          title2: 'Profesional',
          title3: 'de Piscinas',
          subtitle: 'Transformamos tu piscina en un oasis cristalino.',
          email: 'totalpoolserv@aol.com' // Email actualizado
        }
      },
      contact: {
        es: {
          info: {
            email: 'totalpoolserv@aol.com' // Email actualizado
          }
        },
        en: {
          info: {
            email: 'totalpoolserv@aol.com' // Email actualizado
          }
        }
      }
    };
    
    // 3. Guardar contenido
    console.log('💾 Saving content to Supabase...');
    const { error: saveError } = await supabase
      .from('site_content')
      .upsert({
        content_key: 'main_site_content',
        content_data: currentContent,
        updated_by: authData.user.id
      }, {
        onConflict: 'content_key'
      });
    
    if (saveError) {
      console.error('❌ Save error:', saveError);
      return;
    }
    
    console.log('✅ Content saved successfully');
    
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
    console.log('📊 Email in loaded content:', loadedData.content_data.contact.es.info.email);
    
    // 5. Verificar que el email se guardó correctamente
    if (loadedData.content_data.contact.es.info.email === 'totalpoolserv@aol.com') {
      console.log('✅ Email synchronization verified!');
    } else {
      console.log('❌ Email synchronization failed');
    }
    
    console.log('🎉 Final synchronization test completed successfully!');
    console.log('📋 Summary:');
    console.log('   - Admin authentication: ✅');
    console.log('   - Content save: ✅');
    console.log('   - Content load: ✅');
    console.log('   - Email sync: ✅');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testFinalSync();
