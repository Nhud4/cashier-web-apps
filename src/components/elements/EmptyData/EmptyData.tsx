import type React from 'react'

import styles from './styles.module.css'

type Props = {
  title?: string
  desc?: string
}

export const EmptyData: React.FC<Props> = ({
  desc = 'Pesanan yang dibuat akan tampil di sini.',
  title = 'Belum Ada Pesanan',
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <div className={styles.emptyBag}>
            <div className={styles.bagSimple}>
              <div className={styles.bagSimpleHandle}></div>
              <div className={styles.bagSimpleBody}></div>
            </div>
          </div>
        </div>
        <div className={styles.emptyTitle}>{title}</div>
        <div className={styles.emptyDescription}>{desc}</div>
      </div>
    </section>
  )
}
