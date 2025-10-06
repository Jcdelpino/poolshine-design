// Script para aplicar la migración de permisos anónimos
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function applyMigration() {
  console.log('🔧 Applying migration to allow anonymous admin operations...');
  
  const migrationSQL = `
    -- Permitir operaciones anónimas en site_content para admin local
    -- Esto permite que el panel de admin local funcione sin autenticación de usuario

    -- Crear política para permitir INSERT anónimo
    CREATE POLICY IF NOT EXISTS "Allow anonymous insert for local admin"
      ON public.site_content
      FOR INSERT
      WITH CHECK (true);

    -- Crear política para permitir UPDATE anónimo  
    CREATE POLICY IF NOT EXISTS "Allow anonymous update for local admin"
      ON public.site_content
      FOR UPDATE
      USING (true)
      WITH CHECK (true);

    -- Crear política para permitir DELETE anónimo
    CREATE POLICY IF NOT EXISTS "Allow anonymous delete for local admin"
      ON public.site_content
      FOR DELETE
      USING (true);
  `;
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('❌ Migration error:', error);
      return;
    }
    
    console.log('✅ Migration applied successfully');
    
    // Probar que la sincronización funciona ahora
    console.log('🧪 Testing synchronization after migration...');
    
    const testContent = {
      test: 'migration test',
      timestamp: new Date().toISOString(),
      email: 'totalpoolserv@aol.com'
    };
    
    // Probar escritura
    const { error: writeError } = await supabase
      .from('site_content')
      .upsert({
        content_key: 'test_migration',
        content_data: testContent,
        updated_by: null
      }, {
        onConflict: 'content_key'
      });
    
    if (writeError) {
      console.error('❌ Write test failed:', writeError);
      return;
    }
    
    console.log('✅ Write test successful');
    
    // Probar lectura
    const { data: readData, error: readError } = await supabase
      .from('site_content')
      .select('*')
      .eq('content_key', 'test_migration')
      .single();
    
    if (readError) {
      console.error('❌ Read test failed:', readError);
      return;
    }
    
    console.log('✅ Read test successful');
    console.log('📊 Retrieved data:', readData);
    
    // Limpiar
    await supabase
      .from('site_content')
      .delete()
      .eq('content_key', 'test_migration');
    
    console.log('🎉 Migration and synchronization tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

applyMigration();
