import ICONS from '@configs/icons'
import { useWindowWidth } from '@utils/hooks'
import { clsx } from '@utils/index'
import { type PropsWithChildren, useEffect } from 'react'

type Props = {
  onClose: () => void
  onConfirm?: () => void
  open: boolean
  title?: string
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  onClose,
  open,
}) => {
  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress)
    return () => {
      document.removeEventListener('keydown', handleEscPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (open) {
    return (
      <div
        className={clsx([
          'absolute inset-0 z-50 flex bg-opacity-25 bg-black',
          isMobile ? 'items-end' : 'items-center justify-end',
        ])}
      >
        <div
          className={clsx([
            'py-4 bg-white rounded-l-xl',
            isMobile ? 'h-2/5' : 'h-screen',
          ])}
          style={{ minWidth: isMobile ? `${windowWidth}px` : '500px' }}
        >
          <div className="flex items-center gap-4 px-6 pb-6">
            <button onClick={onClose}>
              <ICONS.Back />
            </button>
            {title ? (
              <h5 className="mt-1 ml-2 font-semibold">{title}</h5>
            ) : null}
          </div>
          <div className="px-6 h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    )
  }

  return null
}
