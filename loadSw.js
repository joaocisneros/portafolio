const CACHE_CLEANUP_FLAG = 'portfolio-cache-cleanup-v20260426';

async function unregisterExistingServiceWorkers() {
    if (!('serviceWorker' in navigator)) return false;

    const registrations = await navigator.serviceWorker.getRegistrations();
    if (!registrations.length) return false;

    await Promise.all(registrations.map((registration) => registration.unregister()));
    return true;
}

async function clearBrowserCaches() {
    if (!('caches' in window)) return false;

    const cacheNames = await caches.keys();
    if (!cacheNames.length) return false;

    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    return true;
}

async function cleanupLegacyCaching() {
    try {
        const [removedWorkers, clearedCaches] = await Promise.all([
            unregisterExistingServiceWorkers(),
            clearBrowserCaches()
        ]);

        const hadChanges = removedWorkers || clearedCaches;
        const alreadyReloaded = sessionStorage.getItem(CACHE_CLEANUP_FLAG) === 'done';

        if (hadChanges && !alreadyReloaded) {
            sessionStorage.setItem(CACHE_CLEANUP_FLAG, 'done');
            window.location.reload();
            return;
        }

        sessionStorage.setItem(CACHE_CLEANUP_FLAG, 'done');
    } catch (error) {
        console.warn('No se pudo completar la limpieza de cache antigua.', error);
    }
}

window.addEventListener('load', () => {
    cleanupLegacyCaching();

    const buttonAdd = document.querySelector('#buttonAdd');
    if (!buttonAdd) return;

    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
    });

    buttonAdd.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
            console.log('Acepto la instalacion');
        } else {
            console.log('Rechazo la instalacion');
        }

        deferredPrompt = null;
    });
});
