import React from 'react'

const NotFound = React.lazy(() => import('@pages/NotFound'))
const Dashboard = React.lazy(() => import('@pages/Dashboard'))
const Orders = React.lazy(() => import('@pages/Orders'))
const Settings = React.lazy(() => import('@pages/Settings'))
const Login = React.lazy(() => import('@pages/Login'))
const DetailOrder = React.lazy(() => import('@pages/DetailOrder'))
const OrderCart = React.lazy(() => import('@pages/OrderCart'))

const PAGES = {
  Dashboard,
  DetailOrder,
  Login,
  NotFound,
  OrderCart,
  Orders,
  Settings,
}

export default PAGES
