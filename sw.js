// Aiden's Mars Rover Academy — Service Worker
// Caches all lesson files for offline use

const CACHE_NAME = 'mars-rover-academy-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // Hub pages
  './aiden_curriculum.html',
  './aiden_q1_lessons.html',
  './aiden_q2_lessons.html',
  './aiden_q3_lessons.html',
  './aiden_q4_lessons.html',
  // Q1 — Scratch
  './aiden_q1_w1.html',
  './aiden_q1_w2.html',
  './aiden_q1_w3.html',
  './aiden_q1_w4.html',
  './aiden_q1_w5.html',
  './aiden_q1_w6.html',
  './aiden_q1_w7.html',
  './aiden_q1_w8.html',
  './aiden_q1_w9.html',
  './aiden_q1_w10.html',
  // Q2 — SPIKE Prime
  './aiden_q2_w1.html',
  './aiden_q2_w2.html',
  './aiden_q2_w3.html',
  './aiden_q2_w4.html',
  './aiden_q2_w5.html',
  './aiden_q2_w6.html',
  './aiden_q2_w7.html',
  './aiden_q2_w8.html',
  './aiden_q2_w9.html',
  './aiden_q2_w10.html',
  // Q3 — Python
  './aiden_q3_w1.html',
  './aiden_q3_w2.html',
  './aiden_q3_w3.html',
  './aiden_q3_w4.html',
  './aiden_q3_w5.html',
  './aiden_q3_w6.html',
  './aiden_q3_w7.html',
  './aiden_q3_w8.html',
  './aiden_q3_w9.html',
  './aiden_q3_w10.html',
  // Q4 — Arduino
  './aiden_q4_w1.html',
  './aiden_q4_w2.html',
  './aiden_q4_w3.html',
  './aiden_q4_w4.html',
  './aiden_q4_w5.html',
  './aiden_q4_w6.html',
  './aiden_q4_w7.html',
  './aiden_q4_w8.html',
  './aiden_q4_w9.html',
  './aiden_q4_w10.html',
];

// Install: cache everything
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first (serve offline instantly)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('./aiden_curriculum.html'));
    })
  );
});
