import Button from '@components/elements/Button'
import React from 'react'

import styles from './styles.module.css'

export const ErrorFallback = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>
          <div className={styles.errorCircle}>
            <div className={styles.errorX}></div>
          </div>
        </div>
        <div className={styles.errorTitle}>Ups! Terjadi Kesalahan</div>
        <div className={styles.errorDescription}>
          Terjadi kesalahan saat memuat halaman.
        </div>
        <Button
          onClick={() => {
            window.location.reload()
          }}
          variant="fill"
        >
          Muat Ulang
        </Button>
      </div>
    </section>
  )
}
