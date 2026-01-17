import { useEffect, useState } from 'react'

function useMediaQuery(query: string): boolean {
  const getMatches = (screen: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(screen).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange)
    } else {
      matchMedia.addEventListener('change', handleChange)
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange)
      } else {
        matchMedia.removeEventListener('change', handleChange)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowWidth
}

const useWindowHeight = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowWidth
}

export { useDebounce, useMediaQuery, useWindowHeight, useWindowWidth }
