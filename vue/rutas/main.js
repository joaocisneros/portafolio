const misRutas = [
    { path: '/', component: htmlCssJs },
    { path: '/vue', component: vue },
    { path: '/php', component: php },
    { path: '/java', component: java },
    { path: '/bootstrap', component: bootstrap },
    { path: '/figma', component: figma },
    { path: '/corel', component: corel },
    { path: '/photo', component: photo },
    { path: '/office', component: office },
    { path: '/scratch', component: scratch },
]

const ruta = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes:misRutas,
})