const { createApp } = Vue;

// Definimos un componente para las tarjetas de proyectos
// Esto permite que cada proyecto tenga su propia estructura y estilo
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
                <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="proyecto.nombre" class="project-img" loading="lazy" width="320" height="200" @click="$emit('open-modal')" style="cursor: zoom-in">
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
            isDarkMode: localStorage.getItem('modo') !== 'false',
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
                { nombre: 'OFIMÁTICA', img: 'img/office.png' }
            ],
            servicios: [
                { titulo: 'Diseño Web Profesional', desc: 'Desarrollo de sitios web modernos, optimizados y totalmente responsivos.', img: 'img/paginweb01.jpg' },
                { titulo: 'Marketing & Social Media', desc: 'Creación y gestión estratégica de Fan Pages para potenciar tu presencia digital.', img: 'img/fanpage.png' },
                { titulo: 'Identidad Visual & Logos', desc: 'Diseño gráfico profesional enfocado en branding y comunicación visual impactante.', img: 'img/logo02.jpeg' },
                { titulo: 'Soporte Técnico Integral', desc: 'Mantenimiento preventivo y correctivo de hardware y software empresarial.', img: 'img/mantenimiento.jpg' },
                { titulo: 'Seguridad & Protección', desc: 'Instalación de soluciones antivirus y blindaje de información sensible.', img: 'img/antivirus.png' },
                { titulo: 'Optimización de Sistemas', desc: 'Formateo y configuración avanzada para maximizar el rendimiento de PCs y Laptops.', img: 'img/formateo.jpg' }
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
                { nombre: 'Inglés', nivel: 'Básico', porcentaje: 40, icono: 'fas fa-globe-americas' },
                { nombre: 'Quechua', nivel: 'Básico', porcentaje: 30, icono: 'fas fa-comments' }
            ],
            experiencia: [
                { empresa: 'Consorcio Cyber SAC - La Pontificia', periodo: 'Ene 2023 – Dic 2024', cargo: 'Asistente de Gestión de Datos y Seguridad de Información', desc: 'Gestión de cuentas, mantenimiento de plataformas educativas (Moodle, Q10) y soporte técnico integral.' },
                { empresa: 'Compusur E.I.R.L', periodo: 'May 2021 – Jun 2021', cargo: 'Encargado de Soporte y mantenimiento técnico', desc: 'Mantenimiento preventivo/correctivo de hardware y software, gestión de respaldos de información.' },
                { empresa: 'Representaciones Customer', periodo: 'Dic 2020 – Mar 2021', cargo: 'Encargado de Marketing y publicidad', desc: 'Mantenimiento de plataforma web, diseño de productos digitales y gestión de redes sociales.' }
            ],
            formacion: [
                { institucion: 'Escuela de Educación Superior La Pontificia', periodo: '2023 – 2025', titulo: 'Ingeniería de Sistemas de Información', estado: 'Egresado (Bachiller en trámite)' },
                { institucion: 'Instituto de Educación Superior La Pontificia', periodo: '2018 – 2020', titulo: 'Profesional Técnico en Computación e Informática', estado: 'Título Profesional', img: 'img/certificados/titulo.png' },
                { institucion: 'Cisco Networking Academy', periodo: '2023', titulo: 'Introducción a la Ciberseguridad', estado: 'Certificado Finalizado', img: 'img/certificados/Cisco.png' }
            ]
        }
    },
    computed: {
        proyectosFiltrados() {
            return this.proyectos.filter(p => 
                this.filtroActual === 'Todos' || p.categoria === this.filtroActual
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
            
            // Simulamos un tiempo de preparación para dar feedback visual (Profesional)
            setTimeout(() => {
                this.isDownloading = false;
                
                // Creamos un enlace temporal para disparar la descarga nativa del navegador
                const tempLink = document.createElement('a');
                tempLink.href = fileUrl;
                tempLink.download = fileName;
                document.body.appendChild(tempLink);
                tempLink.click(); // Esto inicia la descarga directo al PC
                document.body.removeChild(tempLink);

                this.triggerToast('Descarga iniciada');
                
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#38bdf8', '#34d399', '#ffffff']
                });
            }, 1000);
        },
        triggerToast(message) {
            this.toastMessage = message;
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 3000); // Se oculta tras 3 segundos
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
            document.body.style.overflow = 'hidden'; // Bloquea el scroll al abrir
        },
        closeModal() {
            this.selectedImg = null;
            this.currentModalList = [];
            document.body.style.overflow = 'auto'; // Restaura el scroll
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
            // Maneja tanto 'imagen' (proyectos) como 'img' (certificados)
            this.selectedImg = item.imagen || item.img;
        }
    },
    watch: {
        isDarkMode(val) {
            localStorage.setItem('modo', val ? 'true' : 'false');
        },
        activeSection() {
            this.centerActiveMenuItem();
        }
    },
    async mounted() {
        // Forzar que la página siempre inicie en "Inicio" al refrescar
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        if (window.location.hash) history.replaceState(null, null, ' ');
        window.addEventListener('scroll', this.handleScroll);

        // Configuración de ScrollSpy para resaltar el menú
        const spyOptions = {
            root: null,
            rootMargin: '-25% 0px -65% 0px', // Detecta el cambio cuando la sección está en el área central-superior
            threshold: 0
        };

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activeSection = entry.target.id;
                }
            });
        }, spyOptions);

        document.querySelectorAll('section[id]').forEach((section) => {
            spyObserver.observe(section);
        });

        try {
            const response = await fetch('./proyectos.json');
            if (!response.ok) throw new Error("No se pudieron cargar los proyectos");
            this.proyectos = await response.json();
        } catch (error) {
            console.warn("Error cargando proyectos desde proyectos.json. Usando respaldo local:", error);
            // Respaldo por si el fetch falla (ej. ejecutando sin servidor o archivo no encontrado)
            // Asegúrate de que estos datos de respaldo sean consistentes con tu JSON
            // y que las imágenes existan.
            // Si tienes un archivo proyectos.json vacío o con errores, este fallback es crucial.
            // Considera mantener este fallback solo durante el desarrollo.
            this.proyectos = [
                { "id": 1, "nombre": "SISTEMA DE VENTAS", "categoria": "PHP", "descripcion": "Desarrollo de un sistema de ventas. Tecnologias empleadas (PHP, Laravel, MySQL)", "imagen": "img/ventas01.png", "link": "#" },
                { "id": 2, "nombre": "SISTEMA DE VENTAS EN JAVA", "categoria": "Java", "descripcion": "Desarrollo de un sistema-escritorio de ventas. Tecnologias empleadas (Java, MySQL)", "imagen": "img/ventas02.png", "link": "#" },
                { "id": 3, "nombre": "SISTEMA PARA COLEGIO", "categoria": "Diseño", "descripcion": "Desarrollo de un sistema para colegio. Tecnologias Docentes - Alumnos", "imagen": "img/colegio01.png", "link": "#" },
                { "id": 4, "nombre": "CONTROL DE ACCESO", "categoria": "PHP", "descripcion": "Sistema para la gestión de cuentas, accesos y permisos de usuarios.", "imagen": "img/controldeacceso.png", "link": "#" },
                { "id": 5, "nombre": "MI TIENDA EN LÍNEA", "categoria": "PHP", "descripcion": "Desarrollo de una plataforma de comercio electrónico (E-commerce).", "imagen": "img/tiendaenlinea.png", "link": "#" }
            ];
        } finally { // Asegurarse de que loading se desactive incluso si hay error
            this.loading = false;
        }
    }
});

app.mount('#app');