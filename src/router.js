import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './NotFound.vue';
// import { storeKey } from 'vuex';
import store from './store/index.js';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachDetails,
            props: true,
            children: [
                { path: '/coaches/:id/contact', component: ContactCoach } // /coaches/id/contact
            ]
        },
        { path: '/register', component: CoachRegistration, meta: { requireAuth: true } },
        { path: '/requests', component: RequestsReceived, meta: { requireAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requireUnauth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

// global navigation guard 
router.beforeEach(function (to, _, next) {
    if (to.meta.requireAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requireUnauth && store.getters.isAuthenticated) {
        next('/coaches')
    } else {
        next();
    }
})
export default router;