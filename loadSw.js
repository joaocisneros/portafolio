const CACHE_CLEANUP_FLAG = 'portfolio-cache-cleanup-done';

window.addEventListener('load', () => {
    // PWA install prompt
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
    });

    const buttonAdd = document.querySelector('#buttonAdd');
    if (buttonAdd) {
        buttonAdd.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
        });
    }

    // Legacy cache cleanup — runs once, then skips
    if (sessionStorage.getItem(CACHE_CLEANUP_FLAG)) return;

    Promise.all([
        navigator.serviceWorker?.getRegistrations()
            .then(regs => Promise.all(regs.map(r => r.unregister())))
            .catch(() => []),
        caches?.keys()
            .then(names => Promise.all(names.map(n => caches.delete(n))))
            .catch(() => [])
    ]).then(() => {
        sessionStorage.setItem(CACHE_CLEANUP_FLAG, '1');
    });
});
