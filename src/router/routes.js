import AppLayout from '@/layout/AppLayout.vue';

export const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            //404
            {
                path: '/:pathMatch(.*)*',
                name: 'notfound',
                component: () => import('@/views/pages/errors/notFound.vue')
            },

            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/pages/dashboard/index.vue')
            },
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/pages/users/index.vue')
            }
        ]
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/pages/auth/login.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/auth/access.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/views/pages/auth/error.vue')
    }
];
