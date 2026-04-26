const { createApp } = Vue;

const ProjectCard = {
    props: {
        proyecto: {
            type: Object,
            required: true
        }
    },
    template: `
        <article class="project-card-modern">
            <div class="card-image-wrapper">
                <img
                    v-if="proyecto.imagen"
                    :src="proyecto.imagen"
                    :alt="proyecto.nombre"
                    class="project-img"
                    loading="lazy"
                    width="320"
                    height="200"
                    @click="$emit('open-modal')"
                    style="cursor: zoom-in"
                >
                <span class="category-badge">{{ proyecto.categoria }}</span>
            </div>
            <div class="card-content">
                <h3 class="proyecto-titulo">{{ proyecto.nombre }}</h3>
                <p class="proyecto-desc">{{ proyecto.descripcion }}</p>
                <div class="card-footer">
                    <a v-if="proyecto.link && proyecto.link !== '#'" :href="proyecto.link" class="btn-project" target="_blank">
                        Ver Proyecto <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </article>
    `
};

const SkeletonCard = {
    template: `
        <div class="project-card-modern is-skeleton">
            <div class="card-image-wrapper skeleton"></div>
            <div class="card-content">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 60%"></div>
                <div class="skeleton skeleton-footer"></div>
            </div>
        </div>
    `
};

const app = createApp({
    components: {
        'project-card': ProjectCard,
        'skeleton-card': SkeletonCard
    },
    data() {
        return {
            menuActive: false,
            isDownloading: false,
            activeSection: 'hero-section',
            selectedImg: null,
            showToast: false,
            toastMessage: '',
            showScrollTop: false,
            currentModalList: [],
            currentIndex: 0,
            filtroActual: 'Todos',
            categorias: ['Todos', 'PHP', 'Java', 'Diseño'],
            loading: true,
            proyectos: [],
            tecnologias: [
                { nombre: 'HTML', img: 'img/html5.svg' },
                { nombre: 'CSS', img: 'img/css.svg' },
                { nombre: 'BOOTSTRAP', img: 'img/bootstrap.svg' },
                { nombre: 'PHP', img: 'img/php.svg' },
                { nombre: 'LARAVEL', img: 'img/laravel.png' },
                { nombre: 'MYSQL', img: 'img/mysql.svg' },
                { nombre: 'PHOTOSHOP', img: 'img/photoshop.svg' },
                { nombre: 'COREL DRAW', img: 'img/corel.png' },
                { nombre: 'GIT', img: 'img/git.svg' },
                { nombre: 'GITHUB', img: 'img/github.svg' },
                { nombre: 'OFIMATICA', img: 'img/office.png' }
            ],
            servicios: [
                { titulo: 'Desarrollo de Sistemas', desc: 'Creamos sistemas web a medida para ordenar procesos, ventas y operaciones del negocio.', img: 'img/paginweb01.jpg' },
                { titulo: 'Diseno y Presencia Digital', desc: 'Disenamos sitios web, interfaces y piezas visuales para fortalecer la imagen de tu marca.', img: 'img/fanpage.png' },
                { titulo: 'Identidad Visual', desc: 'Construimos recursos graficos y branding para comunicar con mayor claridad y profesionalismo.', img: 'img/logo02.jpeg' },
                { titulo: 'Soporte Tecnico', desc: 'Brindamos mantenimiento preventivo y correctivo para asegurar continuidad operativa.', img: 'img/mantenimiento.jpg' },
                { titulo: 'Seguridad y Respaldo', desc: 'Implementamos proteccion, antivirus y buenas practicas para cuidar la informacion del negocio.', img: 'img/antivirus.png' },
                { titulo: 'Optimizacion de Equipos', desc: 'Mejoramos rendimiento, configuracion y estabilidad en PCs y laptops de trabajo.', img: 'img/formateo.jpg' }
            ],
            certificados: [
                { titulo: 'TITULO PROFESIONAL', img: 'img/certificados/titulo.png' },
                { titulo: 'CERTIFICADO INGLES', img: 'img/certificados/ingles.jpg' },
                { titulo: 'MODULO I', img: 'img/certificados/01.png' },
                { titulo: 'MODULO II', img: 'img/certificados/02.png' },
                { titulo: 'MODULO III', img: 'img/certificados/03.png' },
                { titulo: 'DIPLOMA EGRESADO', img: 'img/certificados/egresado.png' },
                { titulo: 'CYBERSEGURIDAD', img: 'img/certificados/Cisco.png' }
            ],
            idiomas: [
                { nombre: 'Español', nivel: 'Nativo', porcentaje: 100, icono: 'fas fa-language' },
                { nombre: 'Ingles', nivel: 'Basico', porcentaje: 40, icono: 'fas fa-globe-americas' },
                { nombre: 'Quechua', nivel: 'Basico', porcentaje: 30, icono: 'fas fa-comments' }
            ],
            experiencia: [
                { empresa: 'Consorcio Cyber SAC - La Pontificia', periodo: 'Ene 2023 - Dic 2024', cargo: 'Asistente de Gestion de Datos y Seguridad de Informacion', desc: 'Gestion de cuentas, mantenimiento de plataformas educativas (Moodle, Q10) y soporte tecnico integral.' },
                { empresa: 'Compusur E.I.R.L', periodo: 'May 2021 - Jun 2021', cargo: 'Encargado de Soporte y Mantenimiento Tecnico', desc: 'Mantenimiento preventivo y correctivo de hardware y software, con gestion de respaldos de informacion.' },
                { empresa: 'Representaciones Customer', periodo: 'Dic 2020 - Mar 2021', cargo: 'Encargado de Marketing y Publicidad', desc: 'Mantenimiento de plataforma web, diseno de productos digitales y gestion de redes sociales.' }
            ],
            formacion: [
                { institucion: 'Escuela de Educacion Superior La Pontificia', periodo: '2023 - 2025', titulo: 'Ingenieria de Sistemas de Informacion', estado: 'Egresado (Bachiller en tramite)' },
                { institucion: 'Instituto de Educacion Superior La Pontificia', periodo: '2018 - 2020', titulo: 'Profesional Tecnico en Computacion e Informatica', estado: 'Titulo Profesional', img: 'img/certificados/titulo.png' },
                { institucion: 'Cisco Networking Academy', periodo: '2023', titulo: 'Introduccion a la Ciberseguridad', estado: 'Certificado Finalizado', img: 'img/certificados/Cisco.png' }
            ]
        };
    },
    computed: {
        proyectosFiltrados() {
            return this.proyectos.filter((proyecto) =>
                this.filtroActual === 'Todos' || proyecto.categoria === this.filtroActual
            );
        }
    },
    methods: {
        centerActiveMenuItem() {
            this.$nextTick(() => {
                const activeItem = document.querySelector('.menu__item.activo');
                if (activeItem) {
                    activeItem.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest'
                    });
                }
            });
        },
        handleDownloadCV(event) {
            if (this.isDownloading) return;

            const link = event.currentTarget;
            const fileUrl = link.getAttribute('href');
            const fileName = link.getAttribute('download');

            this.isDownloading = true;

            setTimeout(() => {
                this.isDownloading = false;

                const tempLink = document.createElement('a');
                tempLink.href = fileUrl;
                tempLink.download = fileName;
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);

                this.triggerToast('Descarga iniciada');

                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#38bdf8', '#34d399', '#ffffff']
                    });
                }
            }, 1000);
        },
        triggerToast(message) {
            this.toastMessage = message;
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        },
        handleScroll() {
            this.showScrollTop = window.scrollY > 400;
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        openModal(index, list) {
            this.currentIndex = index;
            this.currentModalList = list;
            this.updateSelectedImg();
            document.body.style.overflow = 'hidden';
        },
        closeModal() {
            this.selectedImg = null;
            this.currentModalList = [];
            document.body.style.overflow = 'auto';
        },
        nextModal() {
            this.currentIndex = (this.currentIndex + 1) % this.currentModalList.length;
            this.updateSelectedImg();
        },
        prevModal() {
            this.currentIndex = (this.currentIndex - 1 + this.currentModalList.length) % this.currentModalList.length;
            this.updateSelectedImg();
        },
        updateSelectedImg() {
            const item = this.currentModalList[this.currentIndex];
            this.selectedImg = item.imagen || item.img;
        }
    },
    watch: {
        activeSection() {
            this.centerActiveMenuItem();
        }
    },
    async mounted() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        window.scrollTo(0, 0);
        if (window.location.hash) history.replaceState(null, null, ' ');
        window.addEventListener('scroll', this.handleScroll);

        const spyOptions = {
            root: null,
            rootMargin: '-25% 0px -65% 0px',
            threshold: 0
        };

        const navSectionMap = {
            'hero-section': 'hero-section',
            'servicios-section': 'servicios-section',
            'proyectos-section': 'proyectos-section',
            'sobre-mi': 'sobre-mi',
            'trayectoria': 'sobre-mi',
            'tecnologias-section': 'sobre-mi',
            'certificados-section': 'sobre-mi',
            'contacto-section': 'contacto-section'
        };

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.activeSection = navSectionMap[entry.target.id] || entry.target.id;
                }
            });
        }, spyOptions);

        document.querySelectorAll('section[id]').forEach((section) => {
            spyObserver.observe(section);
        });

        try {
            const response = await fetch('./proyectos.json');
            if (!response.ok) throw new Error('No se pudieron cargar los proyectos');
            this.proyectos = await response.json();
        } catch (error) {
            console.warn('Error cargando proyectos desde proyectos.json. Usando respaldo local:', error);
            this.proyectos = [
                { id: 1, nombre: 'SISTEMA DE VENTAS', categoria: 'PHP', descripcion: 'Desarrollo de un sistema de ventas. Tecnologias empleadas (PHP, Laravel, MySQL)', imagen: 'img/ventas01.png', link: '#' },
                { id: 2, nombre: 'SISTEMA DE VENTAS EN JAVA', categoria: 'Java', descripcion: 'Desarrollo de un sistema de ventas de escritorio. Tecnologias empleadas (Java, MySQL)', imagen: 'img/ventas02.png', link: '#' },
                { id: 3, nombre: 'SISTEMA PARA COLEGIO', categoria: 'Diseño', descripcion: 'Desarrollo de un sistema para colegio con modulos para docentes y alumnos.', imagen: 'img/colegio01.png', link: '#' },
                { id: 4, nombre: 'CONTROL DE ACCESO', categoria: 'PHP', descripcion: 'Sistema para la gestion de cuentas, accesos y permisos de usuarios.', imagen: 'img/controldeacceso.png', link: '#' },
                { id: 5, nombre: 'MI TIENDA EN LINEA', categoria: 'PHP', descripcion: 'Desarrollo de una plataforma de comercio electronico (E-commerce).', imagen: 'img/tiendaenlinea.png', link: '#' },
                { id: 6, nombre: 'SISTEMA DE FARMACIA - BOTICA', categoria: 'PHP', descripcion: 'Desarrollo de un sistema para farmacia y botica con gestion de productos, ventas e inventario.', imagen: 'img/farmacia-botica.png', link: '#' }
            ];
        } finally {
            this.loading = false;
        }
    }
});

app.mount('#app');
