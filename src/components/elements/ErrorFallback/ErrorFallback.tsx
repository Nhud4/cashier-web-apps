import Button from '@components/elements/Button'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import React from 'react'

export const ErrorFallback = (): React.JSX.Element => {
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
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Kembali ke Beranda
          </Button>
          <Button
            className="!bg-white !border !border-primary !text-primary"
            leftIcon={<ICONS.Reload />}
            onClick={() => {
              window.location.reload()
            }}
          >
            Muat Ulang
          </Button>
        </div>
      </div>
    </div>
  )
}
