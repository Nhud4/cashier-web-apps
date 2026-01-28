import { clsx } from '@utils/index'

import styles from './styles.module.css'

export const FallbackPage: React.FC = () => {
  return (
    <section className={styles.body}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}></div>
          <div className={styles.bagCircle}>
            <div className={styles.bagIcon}>
              <div className={styles.bagHandle}></div>
              <div className={styles.bagBody}>
                <div className={styles.smile}>
                  <div className={clsx([styles.eye, styles.eyeLeft])}></div>
                  <div className={clsx([styles.eye, styles.eyeRight])}></div>
                  <div className={styles.mouth}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.loadingText}>
          Menuat Halaman<span className={styles.dots}></span>
        </div>
      </div>
    </section>
  )
}
