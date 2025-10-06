// Archivo de prueba para verificar variables de entorno
export const testEnvVars = () => {
  console.log('🧪 Testing Environment Variables:');
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
  console.log('All env vars:', import.meta.env);
  
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (url && key) {
    console.log('✅ Environment variables are loaded correctly');
    return true;
  } else {
    console.log('❌ Environment variables are missing');
    return false;
  }
};
