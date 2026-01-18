import ICONS from '@configs/icons'
import PAGES from '@configs/pages'

const routes: Route[] = [
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Home />,
    isSidebar: true,
    name: 'Dashboard',
    path: '/',
    requireAuth: true,
  },
  {
    component: <PAGES.Login />,
    name: 'Login',
    path: '/login',
  },
  {
    component: <PAGES.Orders />,
    icon: <ICONS.Report />,
    isSidebar: true,
    name: 'Daftar Pesanan',
    path: '/order',
    requireAuth: true,
  },
  {
    component: <PAGES.Settings />,
    icon: <ICONS.Setting />,
    isSidebar: true,
    name: 'Pengaturan',
    path: '/setting',
    requireAuth: true,
  },
  {
    component: <PAGES.NotFound />,
    name: 'Not Found',
    path: '*',
  },
]

// exports
export { routes }
