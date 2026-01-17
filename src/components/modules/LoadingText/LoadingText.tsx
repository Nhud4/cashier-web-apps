import { type HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  data: string | React.ReactElement | React.ReactNode
  loading?: boolean
  width?: number
} & HTMLAttributes<HTMLDivElement>

export const LoadingText: React.FC<Props> = ({
  loading,
  data,
  width = 100,
  ...props
}) => {
  if (loading) return <Skeleton width={width} />
  return <div {...props}>{data}</div>
}
