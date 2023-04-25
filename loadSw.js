if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Registro de SW exitoso', reg))
        .catch(err => console.warn('Error al tratar de registrar el sw', err))
}


/* ALERTA ANTES DE LA INSTALACION DE PWA */

window.onload = (e) => {
    const buttonAdd = document.querySelector('#buttonAdd');

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    buttonAdd.addEventListener('click', (e) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Aceptó su inslación');
                } else {
                    console.log('Rechazó su inslación');
                }
                deferredPrompt = null;
            });
    });
}