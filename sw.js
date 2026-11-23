// オフライン用：アプリ本体（このフォルダのファイル）を保存しておく。
// AIモデルとライブラリは、ページ側がブラウザ内（Cache Storage）に別途保存する。
const CACHE = 'vt-app-v3';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('vt-app-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// 同じサイトのファイルだけ扱う。ネットにつながれば最新版、だめなら保存版を返す
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const res = await fetch(e.request);
      if (res.ok) cache.put(e.request, res.clone());
      return res;
    } catch (err) {
      return (await cache.match(e.request, { ignoreSearch: true })) ||
             (e.request.mode === 'navigate' ? await cache.match('./index.html') : Response.error());
    }
  })());
});
