window.addEventListener("load", function () {
    let cursos = document.querySelector(".cursos")
    let tecnologia = document.querySelector("#tecnologia")
    let botonCursos = document.getElementById("mostrarCursos");

    let con = true;

    botonCursos.addEventListener("click", function () {
        if (con) {
            cursos.classList.add("view");
            con = false
        } else {
            cursos.classList.remove("view");
            con = true
        }
    })
    console.log(botonCursos)

})
