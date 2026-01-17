import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react'

const defaultValue: Notify = {
  color: 'info',
  isOpen: false,
  message: 'Hello World',
}
export const NotifyContext = createContext<NotifyContextType>({
  notify: defaultValue,
  setNotify: () => {},
})

export const NotifyContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notify, setNotify] = useState(defaultValue)
  const initialValue = useMemo(() => ({ notify, setNotify }), [notify])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (notify.isOpen) {
      timeout = setTimeout(() => {
        setNotify(defaultValue)
        if (notify.callback) notify.callback()
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [notify])

  return (
    <NotifyContext.Provider value={initialValue}>
      {children}
    </NotifyContext.Provider>
  )
}
