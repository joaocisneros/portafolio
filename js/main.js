(function () {
    window.addEventListener("load", function () {
        let menu = document.getElementById("menu");
        let boton = document.getElementById("icono_menu");
        let contador = true;

        boton.addEventListener("click", mostrarMenu)
        function mostrarMenu() {
            if (contador) {
                menu.classList.add("menu__show")
                contador = !contador
            } else {
                menu.classList.remove("menu__show")
                contador = !contador
            }

        }


        /* MODO DARK*/
        let bodi = document.querySelector("body");
        let modo = document.getElementById("modo");
        
        modo.addEventListener("click", function () {
            let res = bodi.classList.toggle("dark")
            localStorage.setItem("modo", res)
        })

        let localStore = localStorage.getItem("modo")
        if (localStore === "true" || localStore == null) {
            bodi.classList.add("dark")
        } else {
            bodi.classList.remove("dark")
        }
    })


    /* NOTIFICACION DE PWA */
    let rechaza = document.getElementById("rechaza")
    let alerta__pwa = document.getElementById("alerta__pwa");
    let conPwa = localStorage.getItem("pwa")
    if (conPwa == "true" || conPwa == null) {
        setTimeout(() => {
            alerta__pwa.style.display = "block"
        }, 5000);
    } else {
        alerta__pwa.style.display = "none"
    }
    rechaza.addEventListener("click", function () {
        alerta__pwa.style.display = "none"
        localStorage.setItem("pwa", "false")
    })








}())