import { type FC, type PropsWithChildren } from 'react'

import { CartContextProvider } from './CartContext/context'
import { ModalContextProvider } from './ModalContext'
import { NotifyContextProvider } from './NotifyContext'

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NotifyContextProvider>
      <ModalContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </ModalContextProvider>
    </NotifyContextProvider>
  )
}

export default ContextProvider
