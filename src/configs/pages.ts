import React from 'react'

const NotFound = React.lazy(() => import('@pages/NotFound'))
const Dashboard = React.lazy(() => import('@pages/Dashboard'))
const Orders = React.lazy(() => import('@pages/Orders'))
const Settings = React.lazy(() => import('@pages/Settings'))
const Login = React.lazy(() => import('@pages/Login'))

const PAGES = {
  Dashboard,
  Login,
  NotFound,
  Orders,
  Settings,
}

export default PAGES
