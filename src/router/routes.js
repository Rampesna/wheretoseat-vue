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
                path: '/categories',
                name: 'categories',
                component: () => import('@/views/pages/categories/categories.vue')
            },
            {
                path: '/topics',
                name: 'topics',
                component: () => import('@/views/pages/topics/topics.vue')
            },
            {
                path: '/questions',
                name: 'questions',
                component: () => import('@/views/pages/questions/questions.vue')
            },
            {
                path: '/users',
                name: 'users',
                component: () => import('@/views/pages/users/users.vue')
            },
            {
                path: '/analytics',
                name: 'analytics',
                component: () => import('@/views/pages/analytics/analytics.vue')
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
