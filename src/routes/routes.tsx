import PAGES from '@configs/pages'
import ICONS from '@configs/icons'

const routes: Route[] = [
  {
    icon: <ICONS.Home />,
    component: <PAGES.Dashboard />,
    name: 'Dashboard',
    path: '/',
    isSidebar: true,
  },
  {
    icon: <ICONS.Report />,
    component: <PAGES.Dashboard />,
    name: 'Daftar Pesanan',
    path: '/order',
    isSidebar: true,
  },
  {
    icon: <ICONS.Setting />,
    component: <PAGES.Dashboard />,
    name: 'Pengaturan',
    path: '/setting',
    isSidebar: true,
  },
  {
    component: <PAGES.NotFound />,
    name: 'Not Found',
    path: '*',
  },
]

// exports
export { routes }
