import IMAGES from '@configs/images'

import styles from './styles.module.css'

export const FallbackPage: React.FC = () => {
  return (
    <section className={styles.root}>
      <img
        alt="A man waiting with really big hourglass"
        src={IMAGES.Hourglass}
      />
      <h2>Please wait...</h2>
    </section>
  )
}
