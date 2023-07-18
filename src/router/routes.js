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
                component: () => import('@/views/pages/NotFound.vue')
            },

            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/pages/users/users.vue')
            }
        ]
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/pages/auth/Login.vue')
    },
    {
        path: '/auth/access',
        name: 'accessDenied',
        component: () => import('@/views/pages/auth/Access.vue')
    },
    {
        path: '/auth/error',
        name: 'error',
        component: () => import('@/views/pages/auth/Error.vue')
    }
];
