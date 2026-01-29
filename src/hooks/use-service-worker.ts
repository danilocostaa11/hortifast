import { useEffect, useState } from 'react';

/**
 * Hook para registrar e gerenciar o Service Worker
 * Implementa PWA offline-first e caching
 */
export function useServiceWorker() {
  useEffect(() => {
    // Verificar suporte a Service Workers
    if ('serviceWorker' in navigator) {
      // Registrar Service Worker quando a página carrega
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then(registration => {
            console.log('✅ Service Worker registrado:', registration);

            // Verificar atualizações periodicamente
            setInterval(() => {
              registration.update();
            }, 60000); // A cada 1 minuto
          })
          .catch(error => {
            console.warn('❌ Erro ao registrar Service Worker:', error);
          });
      });

      // Listener para atualizações do Service Worker
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker atualizado');
        // Opcionalmente, notificar o usuário
      });

      // Listener para mensagens do Service Worker
      navigator.serviceWorker.addEventListener('message', event => {
        console.log('💬 Mensagem do Service Worker:', event.data);
        
        if (event.data.type === 'OFFLINE_READY') {
          console.log('📱 App pronto para uso offline');
        }
      });
    }
  }, []);

  return null;
}

/**
 * Função auxiliar para verificar se está online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Hook para monitorar status de conectividade
 */
export function useOnlineStatus() {
  const [isOnlineStatus, setIsOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnlineStatus(true);
    const handleOffline = () => setIsOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnlineStatus;
}
