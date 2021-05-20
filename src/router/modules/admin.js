/* Layout */
import Layout from '@/views/user/layout'
const adminRouter = {
  path: '/admin',
  component: Layout,
  children: [
    {
      path: 'home',
      component: resolve => require(['@/views/user/home'], resolve),
      name: 'userhome',
      meta: { title: '首页' }
    }
  ]
}
export default userRouter