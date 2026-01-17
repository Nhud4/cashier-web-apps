import { type JSX } from 'react'
import Skeleton from 'react-loading-skeleton'

import styles from './styles.module.css'

type Props = {
  clampLine?: number
  loading: boolean
  skeletonWidth?: number
  value: string | JSX.Element
}

export const TableCell: React.FC<Props> = ({
  value,
  loading,
  clampLine,
  skeletonWidth = 100,
}) => {
  if (loading) {
    return <Skeleton className="!z-0" width={skeletonWidth} />
  }

  if (typeof value === 'string') {
    return (
      <span
        className={styles.clampText}
        style={{ '--clamp-line': clampLine } as React.CSSProperties}
        title={value}
      >
        <p className="text-xs">{value}</p>
      </span>
    )
  }

  return value || ''
}
