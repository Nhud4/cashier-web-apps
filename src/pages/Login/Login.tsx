import LoginForm from '@components/forms/Login'

// import IMAGES from '@configs/images'
import styles from './styles.module.css'

const Login: React.FC = () => {
  return (
    <section className={styles.container}>
      {/* <div className="absolute top-0 left-0 ml-4 mt-4">
        <img alt="logo tepi bojonegoro" src={IMAGES.TepiLogoFull} />
      </div> */}
      <LoginForm />
    </section>
  )
}

export { Login }
