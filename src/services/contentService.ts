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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn('No authenticated user, cannot save to Supabase');
        return false;
      }

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
   */
  static async hasAdminPermissions(): Promise<boolean> {
    try {
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
