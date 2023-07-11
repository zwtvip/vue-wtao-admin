/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '@/router/types'

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('@/views/demo/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true
    }
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    redirect: '/screen/view',
    meta: {
      title: '大屏',
      ignoreAuth: true
    },
    children: [
      {
        path: 'view',
        name: 'View',
        component: () => import('@/views/screen/content/components/View.vue'),
        meta: {
          title: '大屏预览',
          ignoreAuth: true
        }
      },
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/screen/content/components/Manage.vue'),
        meta: {
          title: '大屏管理',
          ignoreAuth: true
        }
      }
    ]
  }
]

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name)
