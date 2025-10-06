// Script para probar la conexión con Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  console.log('🔍 Probando conexión con Supabase...');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseKey.substring(0, 20) + '...');
  
  try {
    // Probar conexión básica
    const { data, error } = await supabase
      .from('site_content')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Error de conexión:', error.message);
      return false;
    }
    
    console.log('✅ Conexión exitosa con Supabase');
    console.log('📊 Datos recibidos:', data);
    return true;
    
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    return false;
  }
}

// Ejecutar prueba
testSupabaseConnection();
