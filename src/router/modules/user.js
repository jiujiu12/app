/* Layout */
import userLayout from '@/views/user/layout'
const userRouter = {
  path: '/user',
  component: userLayout,
  children: [
    {
      path: 'userhome',
      component: resolve => require(['@/views/user/home'], resolve),
      name: 'userhome',
      meta: { title: '首页' }
    },
    {
      path: 'activity',
      component: resolve => require(['@/views/user/activity'], resolve),
      name: 'activity',
      meta: { title: '活动' }
    },
    {
      path: 'shop',
      component: resolve => require(['@/views/user/shop'], resolve),
      name: 'shop',
      meta: { title: '兑换商城' }
    },
    {
      path: 'createGroup',
      component: resolve => require(['@/views/user/createGroup'], resolve),
      name: 'createGroup',
      meta: { title: '创建组织' }
    },
    {
      path: 'actHis',
      component: resolve => require(['@/views/user/actHis'], resolve),
      name: 'actHis',
      meta: { title: '活动记录' }
    }
  ]
}
export default userRouter