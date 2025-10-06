import { supabase } from '@/integrations/supabase/client';
import type { SiteContent } from '@/contexts/ContentContext';

const CONTENT_KEY = 'main_site_content';

export class ContentService {
  /**
   * Carga el contenido desde Supabase
   */
  static async loadFromSupabase(): Promise<SiteContent | null> {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content_data, updated_at, updated_by')
        .eq('content_key', CONTENT_KEY)
        .maybeSingle();

      if (error) {
        console.error('Error loading content from Supabase:', error);
        return null;
      }

      if (data && data.content_data) {
        console.log('Content loaded from Supabase successfully');
        return data.content_data as SiteContent;
      }

      return null;
    } catch (error) {
      console.error('Error loading content from Supabase:', error);
      return null;
    }
  }

  /**
   * Guarda el contenido en Supabase
   */
  static async saveToSupabase(content: SiteContent): Promise<boolean> {
    try {
      // Para el panel de admin con autenticación simple, usamos un usuario anónimo
      // o creamos un usuario temporal para la persistencia
      const { data: { user } } = await supabase.auth.getUser();
      
      // Si no hay usuario autenticado, intentar autenticación anónima para guardar
      if (!user) {
        console.log('No authenticated user, attempting anonymous save...');
        
        const { error } = await supabase
          .from('site_content')
          .upsert({
            content_key: CONTENT_KEY,
            content_data: content,
            updated_by: null // Usuario anónimo
          }, {
            onConflict: 'content_key'
          });

        if (error) {
          console.error('Error saving content to Supabase (anonymous):', error);
          return false;
        }

        console.log('Content saved to Supabase successfully (anonymous)');
        return true;
      }

      // Si hay usuario autenticado, usar su ID
      const { error } = await supabase
        .from('site_content')
        .upsert({
          content_key: CONTENT_KEY,
          content_data: content,
          updated_by: user.id
        }, {
          onConflict: 'content_key'
        });

      if (error) {
        console.error('Error saving content to Supabase:', error);
        return false;
      }

      console.log('Content saved to Supabase successfully');
      return true;
    } catch (error) {
      console.error('Error saving content to Supabase:', error);
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
        console.log('Admin permissions verified via local authentication');
        return true;
      }

      // Fallback: verificar usuario de Supabase si existe
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return false;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin permissions:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking admin permissions:', error);
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
