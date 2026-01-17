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
  ({
    children,
    className,
    icon,
    bgColorIcon,
    title,
    subtitle,
    topRightComponent,
    variant = 'base',
    responsive = false,
    ...props
  }) => {
    return (
      <div {...props} className={clsx([styles.main, className])}>
        <div
          className={clsx([styles.header, responsive ? styles.responsive : ''])}
        >
          <div
            className={clsx([
              styles.headerLeft,
              responsive ? styles.responsive : '',
            ])}
          >
            {icon && (
              <div
                className={`${styles.icon} ${bgColorIcon}`}
                style={{ backgroundColor: bgColorIcon }}
              >
                {icon}
              </div>
            )}
            <div>
              {typeof title === 'string' ? (
                <h4
                  className={styles.title}
                  style={{ fontSize: variant === 'big' ? '1.5rem' : '1rem' }}
                >
                  {title}
                </h4>
              ) : (
                title
              )}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          </div>
          {topRightComponent && <div>{topRightComponent}</div>}
        </div>
        {children}
      </div>
    )
  }
)
