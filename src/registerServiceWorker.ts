export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/src/serviceWorker.ts').then((reg) => {
        console.log('service worker registered', reg);
      }).catch((err) => console.error('sw register failed', err));
    });
  }
}
