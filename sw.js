const CACHE='linguacore-20261101114650';
const ASSETS=["./", "index.html", "config.js", "manifest.webmanifest", "privacidad.html", "mascot-hero.webp", "mascot-avatar.webp", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "fonts/fonts.css", "fonts/bricolage-grotesque-latin-ext-wght-normal.woff2", "fonts/bricolage-grotesque-latin-wght-normal.woff2", "fonts/hanken-grotesk-latin-ext-wght-normal.woff2", "fonts/hanken-grotesk-latin-wght-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
    const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):undefined));
    if(hit){e.waitUntil(net.catch(()=>{}));return hit}
    return net;
  }));
});
