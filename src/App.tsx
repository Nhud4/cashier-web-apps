import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

import ErrorFallback from '@components/elements/ErrorFallback'
import FallbackPage from '@components/elements/FallbackPage'
import RouteChangeDetector from '@components/modules/RouteChangeDetector'
import { store } from '@redux/store'
import routes from '@routes/index'
import React, { type ReactNode, Suspense } from 'react'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import ContextProvider from './contexts'
import { getUserToken } from './storage'

const RequireAuth = React.memo<{
  children: React.ReactNode
  redirectTo?: string
}>(({ children, redirectTo = '/login' }) => {
  const isLoggedIn = getUserToken()
  return isLoggedIn ? (
    (children as ReactNode)
  ) : (
    <Navigate replace to={redirectTo} />
  )
})

// Auth loader function for protected routes
const authLoader = () => {
  const isLoggedIn = getUserToken()
  if (!isLoggedIn) {
    return redirect('/login')
  }
  return null
}

// Login redirect loader
const loginLoader = () => {
  const isLoggedIn = getUserToken()
  if (isLoggedIn) {
    return redirect('/')
  }
  return null
}

// Build routes configuration for v7
const buildRoutes = () => {
  return routes.map((route) => {
    return {
      element: route.requireAuth ? (
        <RequireAuth redirectTo="/login">{route.component}</RequireAuth>
      ) : (
        route.component
      ),
      loader: route.requireAuth
        ? authLoader
        : route.path === '/login'
          ? loginLoader
          : undefined,
      path: route.path,
    }
  })
}

// Create router instance
const router = createBrowserRouter([
  {
    children: buildRoutes(),
    element: <RouteChangeDetector />,
    errorElement: <ErrorFallback />,
  },
])

const App = () => {
  return (
    <Provider store={store}>
      <ContextProvider>
        <Suspense fallback={<FallbackPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </ContextProvider>
    </Provider>
  )
}

export default App
