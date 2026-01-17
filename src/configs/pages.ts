import React from 'react'

const NotFound = React.lazy(() => import('@pages/NotFound'))
const Dashboard = React.lazy(() => import('@pages/Dashboard'))

const PAGES = {
  NotFound,
  Dashboard
}

export default PAGES
