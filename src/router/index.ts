import { createWebHistory, createRouter } from 'vue-router'

const router: any = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'base',
        component: () => import('@/pages/base/index.vue'),
        redirect: { name: 'pdf' },
        children: [
          {
            path: '/md5',
            name: 'md5',
            meta: {
              title: 'md5在线加密工具 - 工具网'
            },
            component: () => import('@/pages/md5/index.vue'),
          },
          {
            path: '/pdf',
            name: 'pdf',
            meta: {
              title: 'PDF转图片 - 工具网'
            },
            component: () => import('@/pages/pdf/index.vue'),
          },
        ]
      },
    ],
})

router.beforeEach((to: any) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
})

export default router;
