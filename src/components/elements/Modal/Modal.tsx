import Button from '@components/elements/Button'
import ICONS from '@configs/icons'
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
  onConfirm,
}) => {
  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscPress)
    return () => {
      document.removeEventListener('keydown', handleEscPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (open) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-end bg-opacity-25 bg-black">
        <div
          className="py-4 bg-white rounded-l-xl h-screen"
          style={{ minWidth: '500px' }}
        >
          <div className="flex items-center gap-4 px-4 pb-4">
            <button onClick={onClose}>
              <ICONS.Close fill="#000" height="28" width="28" />
            </button>
            {title ? (
              <h5 className="mt-1 ml-2 font-semibold">{title}</h5>
            ) : null}
          </div>
          <div className="px-4 mt-4">{children}</div>
          {onConfirm ? (
            <div className="flex items-center ml-auto space-x-2 w-fit">
              <Button
                className="bg-white border border-primary text-primary"
                onClick={onClose}
              >
                Tutup
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  onConfirm()
                }}
              >
                Konfirmasi
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return null
}
