# Configuración de Supabase para Persistencia

## Problema Actual

El panel de administración no está guardando cambios en la base de datos porque **faltan las variables de entorno de Supabase**.

## Solución

### 1. Crear archivo `.env` en la raíz del proyecto

```bash
# En la raíz del proyecto (mismo nivel que package.json)
touch .env
```

### 2. Agregar las variables de entorno

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://lvhpsqbqbhepauvmnbjm.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica_aqui
```

### 3. Obtener las credenciales de Supabase

1. **Ir a [supabase.com](https://supabase.com)**
2. **Seleccionar el proyecto**: `lvhpsqbqbhepauvmnbjm`
3. **Ir a Settings > API**
4. **Copiar las siguientes credenciales**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_PUBLISHABLE_KEY`

### 4. Verificar la configuración

Una vez configuradas las variables:

1. **Reiniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Verificar en la consola del navegador** que aparezcan los logs:
   - ✅ "Content auto-saved to Supabase successfully"
   - ❌ "Supabase environment variables not configured"

3. **Probar el panel de administración**:
   - Hacer un cambio en el contenido
   - Verificar que se guarde en la base de datos
   - Recargar la página y verificar que el cambio persista

## Estado Actual

- ✅ **Autenticación**: Funciona con contraseña "Tinedoy1971"
- ✅ **localStorage**: Los cambios se guardan localmente
- ❌ **Supabase**: No configurado (falta archivo .env)
- ❌ **Persistencia real**: Los cambios no se sincronizan entre dispositivos

## Después de la Configuración

- ✅ **Autenticación**: Funciona con contraseña "Tinedoy1971"
- ✅ **localStorage**: Los cambios se guardan localmente
- ✅ **Supabase**: Conectado y funcionando
- ✅ **Persistencia real**: Los cambios se sincronizan entre dispositivos

## Verificación

Una vez configurado, el panel de administración debería mostrar:

- **Estado de conexión**: "Conectado y sincronizado" (verde)
- **Logs en consola**: "Content saved to Supabase successfully"
- **Persistencia**: Los cambios se mantienen al recargar la página
- **Sincronización**: Los cambios se propagan entre dispositivos
