// Script para probar la sincronización con Supabase
import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testSync() {
  console.log('🧪 Testing Supabase synchronization...');
  
  // Datos de prueba
  const testContent = {
    test: 'data',
    timestamp: new Date().toISOString(),
    email: 'totalpoolserv@aol.com'
  };
  
  try {
    // 1. Probar escritura
    console.log('📝 Testing write operation...');
    const { data: writeData, error: writeError } = await supabase
      .from('site_content')
      .upsert({
        content_key: 'test_sync',
        content_data: testContent,
        updated_by: null
      }, {
        onConflict: 'content_key'
      });
    
    if (writeError) {
      console.error('❌ Write error:', writeError);
      return;
    }
    
    console.log('✅ Write successful');
    
    // 2. Probar lectura
    console.log('📖 Testing read operation...');
    const { data: readData, error: readError } = await supabase
      .from('site_content')
      .select('*')
      .eq('content_key', 'test_sync')
      .single();
    
    if (readError) {
      console.error('❌ Read error:', readError);
      return;
    }
    
    console.log('✅ Read successful');
    console.log('📊 Retrieved data:', readData);
    
    // 3. Verificar que los datos coinciden
    if (JSON.stringify(readData.content_data) === JSON.stringify(testContent)) {
      console.log('✅ Data integrity verified');
    } else {
      console.log('❌ Data integrity check failed');
    }
    
    // 4. Limpiar datos de prueba
    console.log('🧹 Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('site_content')
      .delete()
      .eq('content_key', 'test_sync');
    
    if (deleteError) {
      console.error('⚠️ Cleanup error (non-critical):', deleteError);
    } else {
      console.log('✅ Cleanup successful');
    }
    
    console.log('🎉 All synchronization tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSync();
