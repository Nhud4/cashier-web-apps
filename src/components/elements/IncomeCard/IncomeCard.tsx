import LoadingText from '@components/modules/LoadingText'
import { clsx, formatIDR } from '@utils/index'

import styles from './styles.module.css'

type Props = {
  deductionCommission: number
  deductionPaymentFee: number
  deductionProductFee: number
  deductionVoucherFee: number
  incomeAdminFee: number
  incomeCommission: number
  incomeGross: number
  incomeNet: number
  incomeProduct: number
  incomeServiceFee: number
}

export const IncomeCard: React.FC<Props> = ({
  incomeGross,
  deductionPaymentFee,
  deductionProductFee,
  deductionCommission,
  deductionVoucherFee,
  incomeNet,
  incomeAdminFee,
  incomeProduct,
  incomeCommission,
  incomeServiceFee,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1>Potensi Keuntungan</h1>

      <div className={incomeGross < 0 ? styles.negativePrice : styles.price}>
        <h2 className="font-semibold !text-title">Pendapatan Kotor</h2>
        <LoadingText
          className="font-semibold text-title"
          data={formatIDR(incomeGross)}
        />
      </div>

      <div className={styles.negativePrice}>
        <h2>Biaya Pembayaran</h2>
        <LoadingText data={formatIDR(deductionPaymentFee)} />
      </div>

      <div className={styles.negativePrice}>
        <h2>Harga Seller</h2>
        <LoadingText data={formatIDR(deductionProductFee)} />
      </div>

      <div className={styles.negativePrice}>
        <h2>Komisi Seller</h2>
        <LoadingText data={formatIDR(deductionCommission)} />
      </div>

      <div className={styles.negativePrice}>
        <h2>Harga Diskon</h2>
        <LoadingText data={formatIDR(deductionVoucherFee)} />
      </div>

      <div className="space-y-2">
        <div className={incomeNet < 0 ? styles.negativePrice : styles.price}>
          <h2 className="font-semibold !text-title">Pendapatan Bersih</h2>
          <LoadingText
            className="font-semibold text-title"
            data={formatIDR(incomeNet)}
          />
        </div>

        <div className="space-y-2">
          <div
            className={clsx([
              'relative',
              styles.subMenu,
              incomeAdminFee < 0 ? styles.negativePrice : styles.price,
            ])}
          >
            <h2>Biaya Sistem</h2>
            <LoadingText data={formatIDR(incomeAdminFee)} />
          </div>

          <div className={clsx(['relative', styles.subMenu, styles.price])}>
            <h2>Profit Produk</h2>
            <LoadingText data={formatIDR(incomeProduct)} />
          </div>

          <div
            className={clsx([
              'relative',
              styles.subMenu,
              incomeCommission < 0 ? styles.negativePrice : styles.price,
            ])}
          >
            <h2>Total Komisi</h2>
            <LoadingText data={formatIDR(incomeCommission)} />
          </div>

          <div
            className={clsx([
              'relative',
              styles.subMenu,
              incomeServiceFee < 0 ? styles.negativePrice : styles.price,
            ])}
          >
            <h2>Biaya Layanan</h2>
            <LoadingText data={formatIDR(incomeServiceFee)} />
          </div>
        </div>
      </div>
    </div>
  )
}
