// Script para crear usuario admin en Supabase
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lvhpsqbqbhepauvmnbjm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2aHBzcWJxYmhlcGF1dm1uYmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODcxMDUsImV4cCI6MjA3NTA2MzEwNX0.TpAb6plqqkDdpE9vPqygV5msOaL2eDFJs40vozHzwHA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createAdminUser() {
  console.log('👤 Creating admin user...');
  
  try {
    // 1. Intentar crear el usuario admin
    console.log('📝 Attempting to create admin user...');
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@totalpoolserv.com',
      password: 'Tinedoy123',
      options: {
        data: {
          role: 'admin'
        }
      }
    });
    
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        console.log('ℹ️ Admin user already exists, attempting to sign in...');
        
        // Intentar iniciar sesión con el usuario existente
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'admin@totalpoolserv.com',
          password: 'Tinedoy123'
        });
        
        if (signInError) {
          console.error('❌ Sign in failed:', signInError);
          return false;
        }
        
        console.log('✅ Admin user sign in successful');
        const userId = signInData.user.id;
        
        // Verificar/crear rol de admin
        await ensureAdminRole(userId);
        return true;
      } else {
        console.error('❌ Sign up error:', signUpError);
        return false;
      }
    }
    
    console.log('✅ Admin user created successfully');
    const userId = signUpData.user.id;
    
    // 2. Asignar rol de admin
    await ensureAdminRole(userId);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    return false;
  }
}

async function ensureAdminRole(userId) {
  try {
    console.log('🔐 Ensuring admin role...');
    
    // Verificar si ya tiene rol de admin
    const { data: existingRole, error: checkError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    if (checkError) {
      console.error('❌ Error checking admin role:', checkError);
      return false;
    }
    
    if (existingRole) {
      console.log('✅ Admin role already assigned');
      return true;
    }
    
    // Crear rol de admin
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin'
      });
    
    if (insertError) {
      console.error('❌ Error assigning admin role:', insertError);
      return false;
    }
    
    console.log('✅ Admin role assigned successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error ensuring admin role:', error);
    return false;
  }
}

async function testAdminAccess() {
  try {
    console.log('🧪 Testing admin access...');
    
    // Probar operaciones de admin
    const testContent = {
      test: 'admin access test',
      timestamp: new Date().toISOString(),
      email: 'totalpoolserv@aol.com'
    };
    
    // Probar escritura
    const { error: writeError } = await supabase
      .from('site_content')
      .upsert({
        content_key: 'admin_test',
        content_data: testContent,
        updated_by: null
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
      .eq('content_key', 'admin_test')
      .single();
    
    if (readError) {
      console.error('❌ Read test failed:', readError);
      return false;
    }
    
    console.log('✅ Read test successful');
    
    // Limpiar
    await supabase
      .from('site_content')
      .delete()
      .eq('content_key', 'admin_test');
    
    console.log('🎉 Admin access test completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Admin access test failed:', error);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting admin user setup...');
  
  const userCreated = await createAdminUser();
  if (!userCreated) {
    console.error('❌ Failed to create admin user');
    return;
  }
  
  const accessTested = await testAdminAccess();
  if (!accessTested) {
    console.error('❌ Admin access test failed');
    return;
  }
  
  console.log('🎉 Admin user setup completed successfully!');
  console.log('📋 Summary:');
  console.log('   - Email: admin@totalpoolserv.com');
  console.log('   - Password: Tinedoy123');
  console.log('   - Role: admin');
  console.log('   - Database access: ✅');
  console.log('   - Content operations: ✅');
}

main();
