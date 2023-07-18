import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    //login
    if (to.name === 'login' && authStore.isAuthenticated) {
        return next({ name: 'dashboard' });
    }
    //logout
    if (to.name !== 'login' && !authStore.isAuthenticated) {
        return next({ name: 'login' });
    }

    next();
});

export default router;
