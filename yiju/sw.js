/* Generated at build time. Caches this app for offline practice. */
const CACHE = "yiju-1794902448399"
const SCOPE = "/retail-english/yiju/"
const ASSETS = ["/retail-english/yiju/","/retail-english/yiju/assets/index-BMif-YiM.js","/retail-english/yiju/assets/index-C2994p2B.css","/retail-english/yiju/favicon.svg","/retail-english/yiju/icons/apple-touch-icon.png","/retail-english/yiju/icons/icon-192.png","/retail-english/yiju/icons/icon-512.png","/retail-english/yiju/icons/icon-maskable-512.png","/retail-english/yiju/index.html","/retail-english/yiju/manifest.webmanifest"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return
  const url = new URL(event.request.url)
  if (!url.pathname.startsWith(SCOPE)) return
  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request)
      if (cached) return cached
      try {
        return await fetch(event.request)
      } catch (error) {
        if (event.request.mode === "navigate") {
          const fallback = (await caches.match(SCOPE + "index.html")) || (await caches.match(SCOPE))
          if (fallback) return fallback
        }
        throw error
      }
    })(),
  )
})
