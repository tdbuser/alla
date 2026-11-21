// Cache-first: after the first visit the app opens from the phone itself, with zero server requests.
// The browser re-checks only this tiny file; bump V to ship an update. cache:'reload' guarantees fresh files.
const V='alla-2026-11-21e',CORE=['/','index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>{if(r.ok)return c.put(u,r)}).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;const u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||/\.(webmanifest|png|svg)$/.test(u.pathname))return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(s=>{if(s.ok){const c=s.clone();caches.open(V).then(x=>x.put(r,c))}return s}).catch(()=>caches.match('index.html'))))});
