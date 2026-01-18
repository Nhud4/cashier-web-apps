import ICONS from '@configs/icons'
import { setUserToken } from '@storage/index'
// import { useAppDispatch, useAppSelector } from '@redux/hooks'
// import { setIsLogIn } from '@redux/slices/auth'
// import { authLogin } from '@redux/slices/auth/action'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.css'
import { resolver } from './utils'

export const LoginForm: React.FC = (): React.ReactElement => {
  // const { loading, success, error } = useAppSelector(
  //   (state) => state.auth.login
  // )
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: 'onChange', resolver })

  const onSubmit = handleSubmit(async (data) => {
    if (data.password === 'admin123' && data.username === 'admin') {
      const date = new Date()
      date.setDate(date.getDate() + 1)
      const dataToken: UserToken = {
        exp: date.toISOString(),
        token: 'testToken',
      }
      setUserToken(dataToken)
      navigate('/', { replace: true })
    }
    // await dispatch(authLogin({ ...data, userType: 'admin' }))
    // dispatch(setIsLogIn())
  })

  // useEffect(() => {
  //   if (success) {
  //     navigate('/', { replace: true })
  //   }
  // }, [success, navigate])

  return (
    <div className="z-10">
      <div className={styles.container}>
        <div className={styles.logo}>
          <ICONS.Lock fill="#fff" style={{ color: '#fff' }} />
        </div>
        <h4 className={styles.title}>Masuk</h4>
        <p className={styles.subtitle}>Masuk untuk melanjutkan</p>
        {/* FORMS */}
        <form className={styles.form} onSubmit={onSubmit}>
          {/* {error && (
            <p className={styles.errorMessage}>Username atau password salah</p>
          )} */}
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              {...register('username')}
              autoComplete="off"
              className="w-full p-2 border border-gray-500"
              type="text"
            />
          </div>
          <p className={styles.errorMessage}>
            {errors?.username && errors.username.message}
          </p>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              {...register('password')}
              className="w-full p-2 border border-gray-500"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <ICONS.EyeSlash fill="#444" />
              ) : (
                <ICONS.Eye fill="#444" />
              )}
            </button>
          </div>
          <p className={styles.errorMessage}>
            {errors?.password && errors.password.message}
          </p>
          <button className={styles.submit} type="submit">
            Masuk
          </button>
        </form>
      </div>
    </div>
  )
}
