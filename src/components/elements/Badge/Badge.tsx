import { clsx } from '@utils/index'
import { type HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  backgroundColor?: string
  color?: string
  loading?: boolean
} & HTMLAttributes<HTMLParagraphElement>

export const Badge: React.FC<Props> = ({
  children,
  color,
  backgroundColor,
  className,
  style,
  loading,
  ...props
}): React.ReactElement => {
  if (loading) {
    return <Skeleton height={40} width={120} />
  }

  return (
    <p
      {...props}
      className={clsx([
        'inline-block px-4 py-2 font-medium rounded-md',
        className,
      ])}
      style={{ ...style, backgroundColor, color }}
    >
      {children}
    </p>
  )
}
