-- Permitir operaciones anónimas en site_content para admin local
-- Esto permite que el panel de admin local funcione sin autenticación de usuario

-- Crear política para permitir INSERT anónimo
CREATE POLICY "Allow anonymous insert for local admin"
  ON public.site_content
  FOR INSERT
  WITH CHECK (true);

-- Crear política para permitir UPDATE anónimo  
CREATE POLICY "Allow anonymous update for local admin"
  ON public.site_content
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Crear política para permitir DELETE anónimo
CREATE POLICY "Allow anonymous delete for local admin"
  ON public.site_content
  FOR DELETE
  USING (true);
