/* ==========================================================================
   CAGP UFMG — Service Worker Oficial (PWA Offline & Cache Engine)
   ========================================================================== */

const CACHE_NAME = 'cagp-pwa-v1';

const CORE_ASSETS = [
  './',
  'index.html',
  'curso.html',
  'calouros.html',
  'percurso.html',
  'estagio-tcc.html',
  'acg.html',
  'documentos.html',
  'faq.html',
  'sobre.html',
  'gestao.html',
  'mapa-do-site.html',
  'styles.css',
  'manifest.webmanifest',
  'imagens/pwa/pwa-192x192.png',
  'imagens/pwa/pwa-512x512.png',
  'imagens/pwa/apple-touch-icon.png',
  'logos/cagp/10_simbolo_transparente_positivo.svg'
];

// Instalação: Pré-cache do App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Ativação: Limpeza de caches obsoletos e controle imediato
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Requisições externas ou não HTTP(S) ignoradas pelo cache local
  if (url.origin !== self.origin) {
    return;
  }

  // 1. Navegação de Páginas HTML: Network-first com fallback para Cache
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.match('index.html');
          });
        })
    );
    return;
  }

  // 2. Estilos, scripts e imagens: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Se a rede falhar e não houver cache, silencia sem quebrar
      });

      return cachedResponse || fetchPromise;
    })
  );
});
