import Button from '@components/elements/Button'
import Spinner from '@components/elements/Spinner'
import TextInput from '@components/fields/TextInput'
import Layout from '@components/layout'
import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { useAppDispatch, useMutationSlice, useQuerySlice } from '@redux/hooks'
import { clearTransaction } from '@redux/slices/transaction'
import {
  fetchTransactionDetail,
  fetchTransactionUpdate,
} from '@redux/slices/transaction/action'
import { customDateFormat } from '@utils/date'
import { formatIDR } from '@utils/index'
import { clsx } from '@utils/index'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

export const DetailOrder = () => {
  const { id = '' } = useParams()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [paymentMethod, setPaymentMethod] = useState('tunai')
  const [payment, setPayment] = useState(0)

  const { data } = useQuerySlice<TransactionDetail | null, { id: string }>({
    clearSlice: clearTransaction('detail'),
    initial: id,
    key: 'detail',
    slice: 'transaction',
    thunk: fetchTransactionDetail(id),
  })

  const deliveryOps = [
    { label: 'Dine In', value: 'dineIn' },
    { label: 'Take Way', value: 'takeWay' },
    { label: 'Reservasi', value: 'reservation' },
  ]
  const transactionType = deliveryOps.filter(
    (item) => item.value === data?.deliveryType
  )[0]

  const activePaymentMethod = (val: string) => {
    return paymentMethod === val ? styles.paymentActive : ''
  }

  const handlePaymentMethod = (val: string) => {
    setPaymentMethod(val)
  }

  const handleUpdate = () => {
    const payload: TransactionUpdate = {
      payment,
      paymentMethod,
      paymentStatus: 'success',
      paymentType: data?.paymentType || '',
      transactionType: data?.transactionType || '',
    }
    dispatch(fetchTransactionUpdate({ code: id, payload }))
  }

  const { loading: editLoad } = useMutationSlice({
    clearSlice: () => dispatch(clearTransaction('edit')),
    key: 'edit',
    onSuccess: () => {
      dispatch(fetchTransactionDetail(id))
    },
    slice: 'transaction',
  })

  return (
    <Layout orderCard={false} subTitle={code || ''} title="Detail Transaksi">
      <section className="layout page">
        <div>
          <div className="pb-8">
            <button
              className="flex items-center space-x-4 bg-orange rounded-full px-6 py-3 text-white"
              onClick={() => navigate('/order')}
            >
              <ICONS.Back />
              <p>Kembali</p>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white shadow-card p-8 rounded-lg h-fit space-y-8">
              <div className="space-y-4">
                <h1 className="text-lg font-semibold text-orange">
                  Informasi Pesanan
                </h1>
                <table>
                  <tbody className={styles.customer}>
                    <tr>
                      <th>Kode Transaksi</th>
                      <td className="capitalize">{data?.code}</td>
                    </tr>
                    <tr>
                      <th>Pelanggan</th>
                      <td className="capitalize">{data?.customerName}</td>
                    </tr>
                    <tr>
                      <th>No Meja</th>
                      <td>{data?.tableNumber}</td>
                    </tr>
                    <tr>
                      <th>Jenis Transaksi</th>
                      <td>{transactionType?.label}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Pesanan</th>
                      <td>{data?.transactionDate}</td>
                    </tr>
                    <tr>
                      <th>Waktu Pesanan</th>
                      <td>
                        {customDateFormat(data?.createdAt, 'HH.mm', 'WIB')}
                      </td>
                    </tr>
                    <tr>
                      <th>Kasir</th>
                      <td>{data?.user?.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <h1 className="text-lg font-semibold text-orange">
                  Informasi Menu
                </h1>
                {data?.items?.map((item, index) => (
                  <div
                    className={clsx([
                      'space-y-4',
                      index !== 0 ? 'border-t border-t-border pt-4' : '',
                    ])}
                    key={index}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        alt="product"
                        className="object-cover h-20 w-20 rounded-lg bg-primary-3"
                        src={IMAGES.RestoLogo}
                      />
                      <div className="space-y-2">
                        <h1 className="capitalize font-semibold">
                          {item.name}
                        </h1>
                        <h2 className="text-sm text-neutral-5">
                          Qty: {item.qty}
                        </h2>
                        <p className="text-sm font-semibold text-orange">
                          {item.subtotal}
                        </p>
                      </div>
                    </div>
                    {item.note ? (
                      <div className="p-4 border border-border rounded-lg">
                        Pedes banget ya
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="bg-white shadow-card p-8 rounded-lg h-fit space-y-8">
                <div className="space-y-4">
                  <h1 className="text-lg font-semibold text-orange">
                    Informasi Pembayaran
                  </h1>
                  <div className="grid grid-cols-2 gap-8">
                    <table>
                      <tbody className={styles.customer}>
                        <tr>
                          <th>Metode Pembayaran</th>
                          <td className="capitalize">
                            {['finish', 'success'].includes(
                              data?.paymentStatus || ''
                            )
                              ? data?.paymentMethod
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <th>Status pembayaran</th>
                          <td className="capitalize">{data?.paymentStatus}</td>
                        </tr>
                        <tr>
                          <th>Subtotal</th>
                          <td>{formatIDR(data?.subtotal || 0)}</td>
                        </tr>
                        <tr>
                          <th>Diskon</th>
                          <td>{formatIDR(data?.totalDiscount || 0)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody className={styles.customer}>
                        <tr>
                          <th>PPN</th>
                          <td>{formatIDR(data?.ppn || 0)}</td>
                        </tr>
                        <tr>
                          <th>Total Tagihan</th>
                          <td>{formatIDR(data?.bill || 0)}</td>
                        </tr>
                        <tr>
                          <th>Total Bayar</th>
                          <td>{formatIDR(data?.payment || data?.bill || 0)}</td>
                        </tr>
                        <tr>
                          <th>kembalian</th>
                          <td>
                            {formatIDR(
                              data?.paymentMethod === 'tunai' &&
                                ['finish', 'success'].includes(
                                  data?.paymentStatus || ''
                                )
                                ? (data?.payment || 0) - (data?.bill || 0)
                                : 0
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {!['finish', 'success'].includes(data?.paymentStatus || '') ? (
                <div className="bg-white shadow-card p-8 rounded-lg h-fit space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-lg font-semibold text-orange">
                      Selesaikan Pembayaran
                    </h1>

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
                        value={payment > 0 ? payment - (data?.bill || 0) : 0}
                      />
                    </div>

                    <Button
                      className="!w-full justify-center"
                      onClick={handleUpdate}
                    >
                      {editLoad ? <Spinner /> : 'Selesaikan Pembayaran'}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
