import { type FC, type PropsWithChildren } from 'react'

import { ModalContextProvider } from './ModalContext'
import { NotifyContextProvider } from './NotifyContext'

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NotifyContextProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </NotifyContextProvider>
  )
}

export default ContextProvider
