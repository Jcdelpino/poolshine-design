// Script para configurar el admin y probar la sincronización
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupAdmin() {
  console.log('🔧 Setting up admin authentication...');
  
  try {
    // Intentar iniciar sesión con el usuario admin creado en la migración
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin@totalpoolserv.com',
      password: 'Tinedoy123'
    });
    
    if (authError) {
      console.error('❌ Authentication error:', authError);
      console.log('ℹ️ Will proceed with anonymous access and local storage only');
      return false;
    }
    
    console.log('✅ Admin authentication successful');
    console.log('👤 User ID:', authData.user?.id);
    
    // Probar la sincronización con usuario autenticado
    console.log('🧪 Testing synchronization with authenticated user...');
    
    const testContent = {
      test: 'admin sync test',
      timestamp: new Date().toISOString(),
      email: 'totalpoolserv@aol.com'
    };
    
    // Probar escritura
    const { error: writeError } = await supabase
      .from('site_content')
      .upsert({
        content_key: 'test_admin_sync',
        content_data: testContent,
        updated_by: authData.user.id
      }, {
        onConflict: 'content_key'
      });
    
    if (writeError) {
      console.error('❌ Write test failed:', writeError);
      return false;
    }
    
    console.log('✅ Write test successful');
    
    // Probar lectura
    const { data: readData, error: readError } = await supabase
      .from('site_content')
      .select('*')
      .eq('content_key', 'test_admin_sync')
      .single();
    
    if (readError) {
      console.error('❌ Read test failed:', readError);
      return false;
    }
    
    console.log('✅ Read test successful');
    console.log('📊 Retrieved data:', readData);
    
    // Limpiar
    await supabase
      .from('site_content')
      .delete()
      .eq('content_key', 'test_admin_sync');
    
    console.log('🎉 Admin setup and synchronization tests completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    return false;
  }
}

setupAdmin();
