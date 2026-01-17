import 'react-loading-skeleton/dist/skeleton.css'

import { type PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

export const SkeletonLoading: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <SkeletonTheme baseColor="#c3cc2" highlightColor="#f3f3f3">
      {children}
    </SkeletonTheme>
  )
}
