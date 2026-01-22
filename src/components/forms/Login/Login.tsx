import Spinner from '@components/elements/Spinner'
import ICONS from '@configs/icons'
import { useAppDispatch, useMutationSlice } from '@redux/hooks'
import { authLogin } from '@redux/slices/auth/action'
import { setUserData, setUserToken } from '@storage/index'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import styles from './styles.module.css'
import { resolver } from './utils'

export const LoginForm: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: 'onChange', resolver })

  const onSubmit = handleSubmit(async (data) => {
    const payload: LoginRequest = {
      password: data.password,
      username: data.username,
    }
    dispatch(authLogin(payload))
  })

  const { data, loading, error } = useMutationSlice<LoginResponse>({
    key: 'add',
    slice: 'auth',
  })

  useEffect(() => {
    if (data) {
      setUserToken({
        exp: data.expiredAt,
        token: data.token,
      })
      setUserData(data.user)
      window.location.href = '/'
    }
  }, [data])

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
          {error ? (
            <p className={styles.errorMessage}>Username atau password salah</p>
          ) : null}
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
            {loading ? <Spinner /> : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
