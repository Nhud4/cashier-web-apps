/* eslint-disable */
import { useState, useEffect, useRef } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import FallbackPage from '@components/elements/FallbackPage'

export const RouteChangeDetector = () => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [displayLocation, setDisplayLocation] = useState(location)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Skip jika route tidak berubah
    if (location.pathname === displayLocation.pathname) {
      return
    }

    // Cleanup timeout sebelumnya jika ada
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Tampilkan loading
    setIsLoading(true)

    // Update location setelah delay singkat
    timeoutRef.current = setTimeout(() => {
      setDisplayLocation(location)
      setIsLoading(false)
    }, 300)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [location.pathname, displayLocation.pathname])

  return (
    <>
      {isLoading && <FallbackPage />}
      <Outlet />
    </>
  )
}

export default RouteChangeDetector
