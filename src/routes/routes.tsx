import PAGES from '@configs/pages'

const routes: Route[] = [
  {
    component: <PAGES.Dashboard />,
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
    name: 'Daftar Pesanan',
    path: '/order',
    requireAuth: true,
  },
  {
    component: <PAGES.DetailOrder />,
    name: 'Detail Pesanan',
    path: '/order/:id',
    requireAuth: true,
  },
  {
    component: <PAGES.OrderCart />,
    name: 'Keranjang',
    path: '/keranjang',
    requireAuth: true,
  },
  {
    component: <PAGES.Settings />,
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
