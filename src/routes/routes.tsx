import ICONS from '@configs/icons'
import PAGES from '@configs/pages'

const routes: Route[] = [
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Home />,
    isSidebar: true,
    name: 'Dashboard',
    path: '/',
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Report />,
    isSidebar: true,
    name: 'Daftar Pesanan',
    path: '/order',
  },
  {
    component: <PAGES.Dashboard />,
    icon: <ICONS.Setting />,
    isSidebar: true,
    name: 'Pengaturan',
    path: '/setting',
  },
  {
    component: <PAGES.NotFound />,
    name: 'Not Found',
    path: '*',
  },
]

// exports
export { routes }
