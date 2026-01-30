import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import Dropdown from '@components/fields/Dropdown'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'
import { ModalContext } from '@contexts/ModalContext'
import OrderItems from '@features/OrderItems'
import { useAppDispatch, useMutationSlice } from '@redux/hooks'
import { clearTransaction } from '@redux/slices/transaction'
import { fetchTransactionCreate } from '@redux/slices/transaction/action'
import { getUserData } from '@storage/index'
import { firestore } from '@utils/firebase'
import { clsx, formatIDR } from '@utils/index'
import { format } from 'date-fns'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useContext, useState } from 'react'

import styles from './styles.module.css'

type Props = {
  products: CartProduct[]
  onSuccess: (receipt: ReceiptData) => void
}

const collectionName = import.meta.env.REACT_APP_COLLECTION

export const CheckoutOrder: React.FC<Props> = ({ products, onSuccess }) => {
  const { onClose } = useContext(ModalContext)
  const user = getUserData()
  const dispatch = useAppDispatch()
  const date = format(new Date(), 'yyyy-MM-dd')
  const hour = format(new Date(), 'HH.mm')

  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState(0)
  const [paymentStatus, setPaymentStatus] = useState('now')
  const [paymentMethod, setPaymentMethod] = useState('tunai')
  const [payment, setPayment] = useState(0)
  const [deliveryType, setDeliveryType] = useState('dineIn')

  const subtotal = products
    .map((item) => item.subtotal)
    .reduce((a, b) => a + b, 0)
  // const textRate = subtotal * 0.1

  const summary = [
    { label: 'Subtotal', value: subtotal },
    // { label: 'Pajak 10%', value: textRate },
  ]
  const bill = subtotal

  const deliveryOps = [
    { label: 'Dine In', value: 'dineIn' },
    { label: 'Take Way', value: 'takeWay' },
    { label: 'Reservasi', value: 'reservation' },
  ]

  const selectedDelivery = deliveryOps.filter(
    (item) => item.value === deliveryType
  )

  const handlePaymentStatus = (val: string) => {
    setPaymentStatus(val)
  }

  const handlePaymentMethod = (val: string) => {
    setPaymentMethod(val)
  }

  const activePaymentMethod = (val: string) => {
    return paymentMethod === val ? styles.paymentActive : ''
  }

  const printerJob = (code: string) => {
    const doc = {
      cashier: user.name,
      createdAt: serverTimestamp(),
      customer: customerName,
      date,
      items: products.map((item) => ({
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      kembalian: payment > 0 ? payment - bill : 0,
      orderNo: code,
      printed: false,
      subtotal,
      table: tableNumber,
      tax: 0,
      time: `${hour} WIB`,
      total: bill,
      tunai: payment,
    }
    addDoc(collection(firestore, collectionName), doc)
  }

  const handleSubmit = () => {
    const payload: TransactionCreate = {
      bill,
      customerName,
      deliveryType,
      items: products,
      payment,
      paymentMethod,
      paymentStatus: paymentStatus === 'now' ? 'success' : 'pending',
      paymentType: paymentStatus,
      ppn: 0,
      subtotal,
      tableNumber,
      totalDiscount: 0,
      transactionDate: date,
      transactionType: 'transaction',
    }

    dispatch(fetchTransactionCreate(payload))
  }

  const { loading } = useMutationSlice({
    clearSlice: () => dispatch(clearTransaction('add')),
    key: 'add',
    onSuccess: (data: { code: string }) => {
      onSuccess({
        address: 'Gandrirojo, Kec. Sedan, Kabupaten Rembang, Jawa Tengah',
        cash: payment,
        cashier: user.name,
        change: payment > 0 ? payment - bill : 0,
        customer: customerName,
        date,
        items: products.map((item) => ({
          name: item.name,
          note: item.notes,
          price: item.price,
          qty: item.qty,
        })),
        orderNumber: data.code,
        storeName: 'SaR-1 Cafe and Resto',
        subtotal,
        table: tableNumber,
        tax: 0,
        time: `${hour} WIB`,
        total: bill,
      })
      printerJob(data.code)
    },
    slice: 'transaction',
  })

  return (
    <div className="flex">
      <div className="flex flex-col justify-between w-[425px]">
        <div className="relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border bg-white">
            <h1 className="text-lg font-semibold text-primary-3">
              Daftar Pesanan
            </h1>
            <Button className="!h-11" onClick={onClose}>
              <ICONS.Plus />
            </Button>
          </div>

          <div className="overflow-y-auto h-[60vh] p-4 -m-4 space-y-4">
            {products.map((item, i) => (
              <OrderItems data={item} key={i} notes={item.notes} />
            ))}
          </div>

          <div className="absolute -top-[64px] -right-6 w-[1px] h-screen bg-border" />
        </div>

        <div className="py-8 mt-4 border-t border-border">
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
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nama pelanggan"
            value={customerName}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Nomor Menja"
              name="table"
              onChange={(e) => setTableNumber(Number(e.target.value))}
              onlyNumber
              placeholder="Nomor meja"
              value={tableNumber}
            />
            <Dropdown
              label="Jenis Transaksi"
              name="type"
              onChange={(ops) => setDeliveryType(ops === null ? '' : ops.value)}
              options={deliveryOps}
              value={selectedDelivery}
            />
          </div>

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
            paymentStatus === 'later' ? 'opacity-0' : 'opacity-110',
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

          <div className="space-y-4">
            <TextInput
              label="Total Bayar"
              name="payment"
              onChange={(e) => setPayment(Number(e.target.value))}
              onlyNumber
              placeholder="0"
              prefix="Rp"
              value={payment}
            />
            <TextInput
              disabled
              label="Kembalian"
              name="cashback"
              onlyNumber
              placeholder="0"
              prefix="Rp"
              value={payment > 0 ? payment - bill : 0}
            />
          </div>
        </div>

        <div className="flex gap-4 w-full pb-20">
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
