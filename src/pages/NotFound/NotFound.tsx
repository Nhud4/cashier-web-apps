import IMAGES from '@configs/images'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

export const NotFound: React.FC = () => {
  return (
    <section className={styles.root}>
      <img alt="Empty Girl" src={IMAGES.Empty} />
      <div className={styles.content}>
        <h2>
          <strong>404</strong>
        </h2>
        <p>Halaman Tidak Ditemukan</p>
      </div>
      <Link className={styles.button} to="/">
        Kembali ke Beranda
      </Link>
    </section>
  )
}
