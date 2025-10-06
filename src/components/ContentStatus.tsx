import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Database, HardDrive, AlertCircle, CheckCircle } from 'lucide-react';
import { ContentService } from '@/services/contentService';

interface ContentStatusProps {
  onRefresh?: () => void;
}

export const ContentStatus: React.FC<ContentStatusProps> = ({ onRefresh }) => {
  const [lastUpdate, setLastUpdate] = useState<{
    updated_at: string;
    updated_by: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAdminPermissions, setHasAdminPermissions] = useState(false);
  const [dbConnectionStatus, setDbConnectionStatus] = useState<'connected' | 'disconnected' | 'unknown'>('unknown');

  const loadStatus = async () => {
    setIsLoading(true);
    try {
      // Verificar si las variables de entorno están configuradas
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        console.warn('Supabase environment variables not configured');
        setDbConnectionStatus('disconnected');
        setHasAdminPermissions(true); // Asumir permisos locales
        setIsLoading(false);
        return;
      }

      const [updateInfo, adminStatus] = await Promise.all([
        ContentService.getLastUpdateInfo(),
        ContentService.hasAdminPermissions()
      ]);
      
      setLastUpdate(updateInfo);
      setHasAdminPermissions(adminStatus);
      
      // Verificar estado de conexión con la base de datos
      if (updateInfo) {
        setDbConnectionStatus('connected');
      } else {
        setDbConnectionStatus('disconnected');
      }
    } catch (error) {
      console.error('Error loading content status:', error);
      setDbConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusIcon = () => {
    if (isLoading) {
      return <RefreshCw className="w-4 h-4 animate-spin" />;
    }
    
    if (hasAdminPermissions) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    
    return <AlertCircle className="w-4 h-4 text-yellow-500" />;
  };

  const getStatusBadge = () => {
    if (isLoading) {
      return <Badge variant="outline">Cargando...</Badge>;
    }
    
    if (hasAdminPermissions) {
      return <Badge variant="default" className="bg-green-500">Admin Activo</Badge>;
    }
    
    return <Badge variant="outline" className="text-yellow-600">Solo Local</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            {getStatusIcon()}
            <span>Estado del Contenido</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusBadge()}
            <Button
              variant="outline"
              size="sm"
              onClick={loadStatus}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Database className={`w-4 h-4 ${
              dbConnectionStatus === 'connected' ? 'text-green-500' : 
              dbConnectionStatus === 'disconnected' ? 'text-red-500' : 
              'text-yellow-500'
            }`} />
            <div>
              <p className="text-sm font-medium">Base de Datos</p>
              <p className="text-xs text-muted-foreground">
                {dbConnectionStatus === 'connected' ? 'Conectado y sincronizado' : 
                 dbConnectionStatus === 'disconnected' ? 'Desconectado' : 
                 'Verificando...'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Almacenamiento Local</p>
              <p className="text-xs text-muted-foreground">Siempre disponible</p>
            </div>
          </div>
        </div>

        {lastUpdate && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Última actualización:</strong> {formatDate(lastUpdate.updated_at)}
            </p>
            {lastUpdate.updated_by && (
              <p className="text-xs text-muted-foreground">
                Por usuario: {lastUpdate.updated_by}
              </p>
            )}
          </div>
        )}

        {!hasAdminPermissions && (
          <div className="pt-2 border-t">
            <div className="flex items-center space-x-2 text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">
                Autenticación local activa. Los cambios se guardan en la base de datos automáticamente.
              </p>
            </div>
          </div>
        )}

        {dbConnectionStatus === 'disconnected' && (
          <div className="pt-2 border-t">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <div>
                <p className="text-sm font-medium">
                  Configuración de Supabase requerida
                </p>
                <p className="text-xs text-muted-foreground">
                  Los cambios se guardan localmente. Para persistencia en la base de datos, configure las variables de entorno de Supabase.
                </p>
              </div>
            </div>
          </div>
        )}

        {onRefresh && (
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                loadStatus();
                onRefresh();
              }}
              disabled={isLoading}
              className="w-full"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar Contenido
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
