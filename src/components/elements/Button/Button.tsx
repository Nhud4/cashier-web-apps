import { clsx } from '@utils/index'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import Spinner from '../Spinner'
import styles from './styles.module.css'

type Props = {
  leftIcon?: ReactNode
  loading?: boolean
  rightIcon?: ReactNode
  variant?: 'fill' | 'outline'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Partial<Props>> = ({
  children,
  className,
  leftIcon,
  rightIcon,
  loading,
  variant = 'fill',
  type = 'button',
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx([styles.button, styles[variant], className])}
      type={type}
    >
      {leftIcon ? <div className="mr-2">{leftIcon}</div> : null}
      {children}
      {rightIcon && !loading ? <div className="ml-2">{rightIcon}</div> : null}
      {loading ? <Spinner /> : null}
    </button>
  )
}
