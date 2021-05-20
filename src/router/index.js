import Vue from 'vue'
import Router from 'vue-router'
import userRouter from './modules/user'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard',
      roles: ['admin'] }
    }]
  },

  {
    path: '/infomanage',
    component: Layout,
    redirect: '/infomanage/notice',
    name: 'Infomanage',
    meta: { title: '信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'notice',
        name: 'notice',
        component: () => import('@/views/notice/index'),
        meta: { title: '公告管理', icon: 'table' }
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/news/index'),
        meta: { title: '志愿风采管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/create',
    name: 'activityManage',
    meta: { title: '活动管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/activity/NewActivity'),
        meta: { title: '申请活动[org admin]', icon: 'table' }
      },
      {
        path: 'charts',
        name: 'charts',
        component: () => import('@/views/activity/chart'),
        meta: { title: '活动统计', icon: 'tree' }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动管理[org admin]', icon: 'tree' }
      },
      {
        path: 'manage[admin]',
        name: 'manage[admin]',
        component: () => import('@/views/activity/index[admin]'),
        meta: { title: '活动管理[admin]', icon: 'tree' }
      },
      {
        path: 'auditPerson',
        name: 'auditPerson',
        component: () => import('@/views/activity/auditPerson'),
        meta: { title: '招募审核[org admin]', icon: 'tree' }
      }
    ]
  },
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/logManage',
  //   name: 'System',
  //   meta: { title: '系统管理', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'logManage',
  //       name: 'Log',
  //       component: () => import('@/views/system/index'),
  //       meta: { title: '日志管理', icon: 'table' }
  //     },
  //     {
  //       path: 'settings',
  //       name: 'settings',
  //       component: () => import('@/views/system/settings'),
  //       meta: { title: '系统设置', icon: 'table' }
  //     }
  //   ]
  // },
  {
    path: '/group',
    component: Layout,
    redirect: '/group/groupAudit',
    name: 'Group',
    meta: { title: '组织管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'groupAudit',
        name: 'GroupAudit',
        component: () => import('@/views/group/GroupAudit'),
        meta: { title: '申请管理[admin]', icon: 'table' }
      },
      {
        path: 'complaintManage',
        name: 'complaintManage',
        component: () => import('@/views/group/ComplaintManage'),
        meta: { title: '投诉管理[admin]', icon: 'table' }
      },
      {
        path: 'infos',
        name: 'infos',
        component: () => import('@/views/group/index'),
        meta: { title: '组织信息[org admin]', icon: 'table' }
      }
    ]
  },
  {
    path: '/storeManage',
    component: Layout,
    redirect: '/storeManage/NewGoods',
    name: 'Store',
    meta: { title: '商城管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'NewGoods',
        name: 'NewGoods',
        component: () => import('@/views/store/NewGoods'),
        meta: { title: '商品上架', icon: 'table' }
      },
      {
        path: 'GoodsManage',
        name: 'GoodsManage',
        component: () => import('@/views/store/index'),
        meta: { title: '商品管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/userManage',
    component: Layout,
    children: [
      {
        path: 'userManage',
        name: 'Form',
        component: () => import('@/views/vol/userManage'),
        meta: { title: '用户管理[admin]', icon: 'form' }
      }
    ]
  },

  {
    path: '/userManage',
    component: Layout,
    children: [
      {
        path: 'userManage[org]',
        name: 'userManage[org]',
        component: () => import('@/views/vol/userManage[org]'),
        meta: { title: '用户管理[org admin]', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


// export const asyncRoutes = [
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },

//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },

//   {
//     path: '/',
//     component: Layout,
//     redirect: '/home',
//     children: [{
//       path: 'home',
//       name: 'home',
//       component: () => import('@/views/dashboard/index'),
//       meta: { title: '首页', icon: 'dashboard',
//       roles: ['admin'] }
//     }]
//   },

//   {
//     path: '/infomanage',
//     component: Layout,
//     redirect: '/infomanage/notice',
//     name: 'Infomanage',
//     meta: { title: '信息管理', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'notice',
//         name: 'notice',
//         component: () => import('@/views/notice/index'),
//         meta: { title: '公告管理', icon: 'table' }
//       },
//       {
//         path: 'news',
//         name: 'news',
//         component: () => import('@/views/news/index'),
//         meta: { title: '志愿风采管理', icon: 'tree' }
//       }
//     ]
//   },

//   {
//     path: '/activity',
//     component: Layout,
//     redirect: '/activity/create',
//     name: 'activityManage',
//     meta: { title: '活动管理', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'create',
//         name: 'create',
//         component: () => import('@/views/activity/NewActivity'),
//         meta: { title: '申请活动[org admin]', icon: 'table' }
//       },
//       {
//         path: 'charts',
//         name: 'charts',
//         component: () => import('@/views/activity/chart'),
//         meta: { title: '活动统计', icon: 'tree' }
//       },
//       {
//         path: 'manage',
//         name: 'manage',
//         component: () => import('@/views/activity/index'),
//         meta: { title: '活动管理[org admin]', icon: 'tree' }
//       },
//       {
//         path: 'manage[admin]',
//         name: 'manage[admin]',
//         component: () => import('@/views/activity/index[admin]'),
//         meta: { title: '活动管理[admin]', icon: 'tree' }
//       },
//       {
//         path: 'auditPerson',
//         name: 'auditPerson',
//         component: () => import('@/views/activity/auditPerson'),
//         meta: { title: '招募审核[org admin]', icon: 'tree' }
//       }
//     ]
//   },
//   // {
//   //   path: '/system',
//   //   component: Layout,
//   //   redirect: '/system/logManage',
//   //   name: 'System',
//   //   meta: { title: '系统管理', icon: 'el-icon-s-help' },
//   //   children: [
//   //     {
//   //       path: 'logManage',
//   //       name: 'Log',
//   //       component: () => import('@/views/system/index'),
//   //       meta: { title: '日志管理', icon: 'table' }
//   //     },
//   //     {
//   //       path: 'settings',
//   //       name: 'settings',
//   //       component: () => import('@/views/system/settings'),
//   //       meta: { title: '系统设置', icon: 'table' }
//   //     }
//   //   ]
//   // },
//   {
//     path: '/group',
//     component: Layout,
//     redirect: '/group/groupAudit',
//     name: 'Group',
//     meta: { title: '组织管理', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'groupAudit',
//         name: 'GroupAudit',
//         component: () => import('@/views/group/GroupAudit'),
//         meta: { title: '申请管理[admin]', icon: 'table' }
//       },
//       {
//         path: 'complaintManage',
//         name: 'complaintManage',
//         component: () => import('@/views/group/ComplaintManage'),
//         meta: { title: '投诉管理[admin]', icon: 'table' }
//       },
//       {
//         path: 'infos',
//         name: 'infos',
//         component: () => import('@/views/group/index'),
//         meta: { title: '组织信息[org admin]', icon: 'table' }
//       }
//     ]
//   },
//   {
//     path: '/storeManage',
//     component: Layout,
//     redirect: '/storeManage/NewGoods',
//     name: 'Store',
//     meta: { title: '商城管理', icon: 'el-icon-s-help' },
//     children: [
//       {
//         path: 'NewGoods',
//         name: 'NewGoods',
//         component: () => import('@/views/store/NewGoods'),
//         meta: { title: '商品上架', icon: 'table' }
//       },
//       {
//         path: 'GoodsManage',
//         name: 'GoodsManage',
//         component: () => import('@/views/store/index'),
//         meta: { title: '商品管理', icon: 'table' }
//       }
//     ]
//   },

//   {
//     path: '/userManage',
//     component: Layout,
//     children: [
//       {
//         path: 'userManage',
//         name: 'Form',
//         component: () => import('@/views/vol/userManage'),
//         meta: { title: '用户管理[admin]', icon: 'form' }
//       }
//     ]
//   },

//   {
//     path: '/userManage',
//     component: Layout,
//     children: [
//       {
//         path: 'userManage[org]',
//         name: 'userManage[org]',
//         component: () => import('@/views/vol/userManage[org]'),
//         meta: { title: '用户管理[org admin]', icon: 'form' }
//       }
//     ]
//   },
//   { path: '*', redirect: '/404', hidden: true } 
// ]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes.concat(userRouter)
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
