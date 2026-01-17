import Button from '@components/elements/Button'
import IMAGES from '@configs/images'
import { clearStorage } from '@storage/index'
import { useWindowWidth } from '@utils/hooks'
import { type PropsWithChildren, useState } from 'react'

import Spinner from '../Spinner'

type Props = {
  confirmationType?: 'delete' | 'confirmation' | 'expired'
  onClose: () => void
  onConfirm?: () => void
  open: boolean
}

export const ConfirmationModal: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClose,
  open,
  onConfirm,
  confirmationType,
}) => {
  const [loading, setLoading] = useState(false)

  const onLogin = () => {
    clearStorage()
    window.location.href = '/'
  }

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640
  const maxWidth = isMobile ? `${windowWidth - 32}px` : ''
  const minWidth = isMobile ? `${windowWidth - 32}px` : '500px'

  if (open) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-25 bg-gray-3">
        <div
          className="py-4 bg-white rounded-2xl"
          style={{ maxWidth, minWidth }}
        >
          <div className="px-4">{children}</div>
          {onConfirm && confirmationType === 'delete' ? (
            <div className="flex justify-center items-center space-x-2">
              <Button
                className="flex justify-center items-center !bg-white !border !border-primary !text-primary w-[7rem] h-[2.75rem]"
                onClick={() => {
                  setLoading(true)
                  onConfirm()
                }}
              >
                {loading ? (
                  <Spinner customColor="!border-b-primary" />
                ) : (
                  'Ya, Hapus'
                )}
              </Button>
              <Button
                className="flex justify-center items-center bg-white border border-primary text-primary w-[7rem] h-[2.75rem]"
                onClick={onClose}
              >
                Batal
              </Button>
            </div>
          ) : null}

          {onConfirm && confirmationType === 'confirmation' ? (
            <div className="flex justify-center items-center space-x-2">
              <Button
                className="flex justify-center items-center bg-white border border-primary text-primary w-[7rem] h-[2.75rem]"
                onClick={onClose}
              >
                Batal
              </Button>
              <Button
                className="flex justify-center items-center !bg-white !border !border-primary !text-primary w-[7rem] h-[2.75rem]"
                onClick={() => {
                  setLoading(true)
                  onConfirm()
                }}
              >
                {loading ? (
                  <Spinner customColor="!border-b-primary" />
                ) : (
                  'Konfirmasi'
                )}
              </Button>
            </div>
          ) : null}

          {confirmationType === 'expired' ? (
            <div className="w-[500px]">
              <div className="grid justify-items-center gap-y-4 px-4">
                <img
                  alt="warning"
                  height={96}
                  src={IMAGES.QuestionWarning}
                  width={96}
                />
                <h1 className="text-xl font-semibold">Sesi Login Berakhir</h1>
                <p className="text-center text-neutral-500">
                  Maaf, sesi login Anda telah berakhir. Demi keamanan, Anda
                  perlu masuk kembali ke akun Anda untuk melanjutkan. Silakan
                  klik tombol di bawah ini untuk login ulang.
                </p>
              </div>

              <div className="flex justify-center items-center pt-8">
                <Button
                  className="flex justify-center items-center"
                  onClick={onLogin}
                >
                  Login Ulang
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return null
}
