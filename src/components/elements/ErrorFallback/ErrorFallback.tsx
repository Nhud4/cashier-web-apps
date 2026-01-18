import Button from '@components/elements/Button'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorFallback = (): React.JSX.Element => {
  const navigate = useNavigate()
  return (
    <div className="grid min-h-screen place-items-center" role="alert">
      <div className="flex flex-col items-center space-y-6">
        <img alt="icon" src={IMAGES.FatalError} />
        <p className="text-3xl">
          <strong className="font-semibold">
            Terjadi kesalahan saat memuat halaman
          </strong>
        </p>
        <div className="flex items-center space-x-4">
          <Button
            leftIcon={<ICONS.Home />}
            onClick={() => navigate('/')}
            variant="outline"
          >
            Kembali ke Beranda
          </Button>
          <Button
            leftIcon={<ICONS.Reload height={20} width={20} />}
            onClick={() => {
              window.location.reload()
            }}
            variant="fill"
          >
            Muat Ulang
          </Button>
        </div>
      </div>
    </div>
  )
}
