import { clsx } from '@utils/index'

import styles from './styles.module.css'

type Props = {
  customColor?: string
  size?: 'small' | 'medium' | 'large'
}

export const Spinner = ({ size = 'small', customColor }: Props) => {
  return <span className={clsx([styles[size], customColor])} />
}
