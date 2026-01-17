import { type HTMLAttributes } from 'react'

import styles from './styles.module.css'

type Props = {
  icon?: React.ReactElement | React.ReactNode
  id?: string
  isSubmit?: boolean
  label?: string
} & HTMLAttributes<HTMLDivElement>

export const FormField: React.FC<React.PropsWithChildren<Props>> = ({
  label,
  icon,
  id,
  children,
  className,
  isSubmit,
}): React.ReactElement => {
  return (
    <div className={`${styles.main} ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={`${styles.field} ${isSubmit ? styles.submit : ''}`}>
        {icon}
        {children}
      </div>
    </div>
  )
}
