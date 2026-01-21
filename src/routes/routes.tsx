import PAGES from '@configs/pages'

const routes: Route[] = [
  {
    component: <PAGES.Dashboard />,
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
    isSidebar: true,
    name: 'Daftar Pesanan',
    path: '/order',
    requireAuth: true,
  },
  {
    component: <PAGES.DetailOrder />,
    isSidebar: true,
    name: 'Detail Pesanan',
    path: '/order/:id',
    requireAuth: true,
  },
  {
    component: <PAGES.Settings />,
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
