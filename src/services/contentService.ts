import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import type { SiteContent } from '@/types/content';

const CONTENT_KEY = 'main_site_content';

export class ContentService {
  /**
   * Carga el contenido desde Supabase
   */
  static async loadFromSupabase(): Promise<SiteContent | null> {
    try {
      console.log('📥 Attempting to load content from Supabase...');
      
      // Asegurar que estamos autenticados como admin
      const isAuthenticated = await this.ensureAdminAuth();
      if (!isAuthenticated) {
        console.error('❌ Could not authenticate as admin');
        return null;
      }
      
      const { data, error } = await supabase
        .from('site_content')
        .select('content_data, updated_at, updated_by')
        .eq('content_key', CONTENT_KEY)
        .maybeSingle();

      if (error) {
        console.error('❌ Error loading content from Supabase:', error);
        console.error('Error details:', error.message, error.details, error.hint);
        return null;
      }

      if (data && data.content_data) {
        console.log('✅ Content loaded from Supabase successfully');
        console.log('📅 Last updated:', data.updated_at);
        console.log('👤 Updated by:', data.updated_by);
        return data.content_data as unknown as SiteContent;
      }

      console.log('ℹ️ No content found in Supabase');
      return null;
    } catch (error) {
      console.error('❌ Exception loading content from Supabase:', error);
      return null;
    }
  }

  /**
   * Asegura que el usuario admin esté autenticado
   */
  private static async ensureAdminAuth(): Promise<boolean> {
    try {
      // Verificar si ya hay un usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log('✅ User already authenticated:', user.email);
        return true;
      }
      
      // Intentar autenticación con el usuario admin
      console.log('🔐 Authenticating as admin...');
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'admin@totalpoolserv.com',
        password: 'Tinedoy123'
      });
      
      if (authError) {
        console.error('❌ Admin authentication failed:', authError);
        return false;
      }
      
      console.log('✅ Admin authentication successful:', authData.user?.email);
      return true;
    } catch (error) {
      console.error('❌ Error in admin authentication:', error);
      return false;
    }
  }

  /**
   * Guarda el contenido en Supabase
   */
  static async saveToSupabase(content: SiteContent): Promise<boolean> {
    try {
      console.log('💾 Attempting to save content to Supabase...');
      
      // Asegurar que estamos autenticados como admin
      const isAuthenticated = await this.ensureAdminAuth();
      if (!isAuthenticated) {
        console.error('❌ Could not authenticate as admin');
        return false;
      }
      
      // Obtener el usuario actual
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('site_content')
        .upsert({
          content_key: CONTENT_KEY,
          content_data: content as any,
          updated_by: currentUser?.id || null
        } as any, {
          onConflict: 'content_key'
        });

      if (error) {
        console.error('❌ Error saving content to Supabase:', error);
        console.error('Error details:', error.message, error.details, error.hint);
        return false;
      }

      console.log('✅ Content saved to Supabase successfully');
      console.log('👤 Saved by:', currentUser?.id);
      return true;
    } catch (error) {
      console.error('❌ Exception saving content to Supabase:', error);
      return false;
    }
  }

  /**
   * Verifica si el usuario actual tiene permisos de admin
   * Para el panel simple, verificamos si hay autenticación local
   */
  static async hasAdminPermissions(): Promise<boolean> {
    try {
      // Verificar si hay autenticación local (sessionStorage)
      const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true';
      
      if (isAuthenticated) {
        console.log('✅ Admin permissions verified via local authentication');
        return true;
      }

      // Verificar si podemos autenticarnos como admin en Supabase
      const canAuthAsAdmin = await this.ensureAdminAuth();
      if (canAuthAsAdmin) {
        console.log('✅ Admin permissions verified via Supabase authentication');
        return true;
      }

      console.log('❌ No admin permissions found');
      return false;
    } catch (error) {
      console.error('❌ Error checking admin permissions:', error);
      return false;
    }
  }

  /**
   * Obtiene información sobre la última actualización del contenido
   */
  static async getLastUpdateInfo(): Promise<{
    updated_at: string;
    updated_by: string | null;
  } | null> {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('updated_at, updated_by')
        .eq('content_key', CONTENT_KEY)
        .maybeSingle();

      if (error) {
        console.error('Error getting update info:', error);
        return null;
      }

      return data || null;
    } catch (error) {
      console.error('Error getting update info:', error);
      return null;
    }
  }
}