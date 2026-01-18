import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { ModalContext } from '@contexts/ModalContext'
import { NotifyContext } from '@contexts/NotifyContext'
import OrderItems from '@features/OrderItems'
import { clsx, formatIDR } from '@utils/index'
import { useContext, useState } from 'react'

import styles from './styles.module.css'

export const CheckoutOrder = () => {
  const { onClose } = useContext(ModalContext)
  const { setNotify } = useContext(NotifyContext)
  const [paymentStatus, setPaymentStatus] = useState('now')
  const [paymentMethod, setPaymentMethod] = useState('tunai')
  const [loading, setLoading] = useState(false)

  const summary = [
    { label: 'Subtotal', value: 12000 },
    { label: 'Diskon', value: 0 },
    { label: 'Pajak', value: 1200 },
  ]
  const bill = summary.map((val) => val.value).reduce((a, b) => a + b, 0)

  const handlePaymentStatus = (val: string) => {
    setPaymentStatus(val)
  }

  const handlePaymentMethod = (val: string) => {
    setPaymentMethod(val)
  }

  const activePaymentMethod = (val: string) => {
    return paymentMethod === val ? styles.paymentActive : ''
  }

  const handleSubmit = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setNotify({
        color: 'success',
        isOpen: true,
        message: 'Berhasil menambah pesanan',
      })
      onClose()
    }, 2000)
  }

  return (
    <div className="flex h-full">
      <div className="flex flex-col justify-between h-full w-[425px]">
        <div className="relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border bg-white">
            <div>
              <h1 className="text-lg font-semibold text-primary-3">
                Daftar Pesanan
              </h1>
              <p className="text-sm text-neutral-5">
                No Pesanan: TRX-290110001
              </p>
            </div>
            <Button className="!h-11">
              <ICONS.Plus />
            </Button>
          </div>

          <div className="overflow-y-auto h-[65vh] p-4 -m-4 space-y-4">
            {new Array(10).fill('').map((_, i) => (
              <OrderItems key={i} />
            ))}
          </div>

          <div className="absolute -top-[64px] -right-6 w-[1px] h-screen bg-border" />
        </div>

        <div className="py-8 border-t border-border">
          <div className="flex flex-col gap-3 pb-8">
            {summary.map((item, index) => (
              <div className="flex justify-between text-sm" key={index}>
                <p className="text-neutral-5">{item.label}</p>
                <p>{formatIDR(item.value)}</p>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold text-orange">
              <p>Total Tagihan</p>
              <p>{formatIDR(bill)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-[425px] ml-14 space-y-8">
        <div className="space-y-4">
          <div className="pb-4 mb-4 border-b border-border bg-white">
            <h1 className="text-lg font-semibold text-primary-3">
              Data Pelanggan
            </h1>
            <p className="text-sm text-neutral-5">
              Informasi pelanggan untuk pesanan ini
            </p>
          </div>

          <TextInput
            label="Nama Pelanggan"
            name="name"
            placeholder="Nama pelanggan"
          />
          <TextInput
            label="Nomor Menja"
            name="table"
            onlyNumber
            placeholder="Nomor meja"
          />

          <div>
            <p className="pb-1">Status Pembayaran</p>
            <div className="flex items-center gap-4 w-full">
              <Button
                className="!w-full justify-center"
                onClick={() => handlePaymentStatus('now')}
                variant={paymentStatus === 'now' ? 'fill' : 'outline'}
              >
                Bayar Sekarang
              </Button>
              <Button
                className="!w-full justify-center"
                onClick={() => handlePaymentStatus('later')}
                variant={paymentStatus === 'later' ? 'fill' : 'outline'}
              >
                Bayar Nanti
              </Button>
            </div>
          </div>
        </div>

        <div
          className={clsx([
            'space-y-4',
            paymentStatus === 'later' ? 'hidden' : '',
          ])}
        >
          <div className="pb-4 mb-4 border-b border-border bg-white">
            <h1 className="text-lg font-semibold text-primary-3">Pembayaran</h1>
            <p className="text-sm text-neutral-5">Pilih metode pembayaran</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              className={clsx([
                styles.paymentButton,
                activePaymentMethod('tunai'),
              ])}
              onClick={() => handlePaymentMethod('tunai')}
            >
              <ICONS.Wallet />
              <p>Tunai</p>
              {activePaymentMethod('tunai') ? (
                <div className="absolute top-2 right-2">
                  <ICONS.CheckCircle height={18} width={18} />
                </div>
              ) : null}
            </button>

            <button
              className={clsx([
                styles.paymentButton,
                activePaymentMethod('debit'),
              ])}
              onClick={() => handlePaymentMethod('debit')}
            >
              <ICONS.Card />
              <p>Debit</p>
              {activePaymentMethod('debit') ? (
                <div className="absolute top-2 right-2">
                  <ICONS.CheckCircle height={18} width={18} />
                </div>
              ) : null}
            </button>

            <button
              className={clsx([
                styles.paymentButton,
                activePaymentMethod('qris'),
              ])}
              onClick={() => handlePaymentMethod('qris')}
            >
              <ICONS.Qris height={24} width={24} />
              <p>QRIS</p>
              {activePaymentMethod('qris') ? (
                <div className="absolute top-2 right-2">
                  <ICONS.CheckCircle height={18} width={18} />
                </div>
              ) : null}
            </button>
          </div>

          <div
            className={clsx([
              'space-y-4',
              paymentMethod === 'tunai' ? '' : 'hidden',
            ])}
          >
            <TextInput
              label="Total Bayar"
              name="payment"
              onlyNumber
              placeholder="0"
              prefix="Rp"
            />
            <TextInput
              disabled
              label="Kembalian"
              name="cashback"
              onlyNumber
              placeholder="0"
              prefix="Rp"
            />
          </div>
        </div>

        <div className="absolute bottom-16 flex gap-4 w-full">
          <Button
            className="!w-full justify-center"
            onClick={onClose}
            variant="outline"
          >
            Batal
          </Button>
          <Button className="!w-full justify-center" onClick={handleSubmit}>
            {loading ? <Spinner /> : 'Proses Pesanan'}
          </Button>
        </div>
      </div>
    </div>
  )
}
