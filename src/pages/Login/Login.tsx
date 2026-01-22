import LoginForm from '@components/forms/Login'

import styles from './styles.module.css'

const Login: React.FC = () => {
  return (
    <section className={styles.container}>
      <LoginForm />
    </section>
  )
}

export { Login }
