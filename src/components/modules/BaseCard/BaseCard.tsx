import { clsx } from '@utils/index'
import React, { type HTMLAttributes } from 'react'

import styles from './styles.module.css'

type Props = {
  bgColorIcon?: string
  icon?: React.ReactElement
  responsive?: boolean
  subtitle?: string
  title?: string | React.ReactElement
  topRightComponent?: React.ReactElement
  variant?: 'base' | 'big'
} & HTMLAttributes<HTMLDivElement>

export const BaseCard: React.FC<Props> = React.memo(
  ({ children, className, ...props }) => {
    return (
      <div {...props} className={clsx([styles.main, className])}>
        {children}
      </div>
    )
  }
)
