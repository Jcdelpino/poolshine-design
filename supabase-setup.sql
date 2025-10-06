-- Script para configurar la base de datos de poolshine-design
-- Ejecutar en Supabase SQL Editor

-- 1. Crear tabla para el contenido del sitio
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL UNIQUE,
  content_data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- 2. Crear tabla para roles de usuario
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Crear función para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, role_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = has_role.user_id 
    AND user_roles.role = role_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Configurar políticas RLS (Row Level Security)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Políticas para site_content (lectura pública, escritura solo admin)
CREATE POLICY "Anyone can read site content"
  ON public.site_content
  FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update site content"
  ON public.site_content
  FOR UPDATE
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert site content"
  ON public.site_content
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Políticas para user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. Crear trigger para actualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Insertar contenido inicial
INSERT INTO public.site_content (content_key, content_data)
VALUES ('main_site_content', '{}'::jsonb)
ON CONFLICT (content_key) DO NOTHING;

-- 9. Crear usuario admin (opcional - para autenticación completa)
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('[user-id-aqui]', 'admin')
-- ON CONFLICT DO NOTHING;
