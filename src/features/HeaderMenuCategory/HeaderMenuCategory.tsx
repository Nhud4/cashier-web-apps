import LoadingText from '@components/modules/LoadingText'
import { useQuerySlice } from '@redux/hooks'
import { clearCategory } from '@redux/slices/category'
import { fetchListCategory } from '@redux/slices/category/action'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import styles from './styles.module.css'

export const HeaderMenuCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialParams = {
    page: 1,
    size: 10,
  }

  const { data, loading } = useQuerySlice<ProductsCategory[], TableParams>({
    clearSlice: clearCategory('list'),
    initial: initialParams,
    key: 'list',
    slice: 'category',
    thunk: fetchListCategory(initialParams),
  })

  const categoryOps = data.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const handleMenu = (val: string) => {
    setSearchParams({ cat: val })
  }

  const isActive = (val: string) => {
    const params = searchParams.get('cat')
    return params === val ? styles.active : ''
  }

  const defaultOps = categoryOps[0]
  useEffect(() => {
    if (defaultOps) {
      setSearchParams({ cat: defaultOps.value })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {categoryOps.map((item, index) => (
          <button
            className={isActive(item?.value)}
            key={index}
            onClick={() => handleMenu(item?.value)}
          >
            <LoadingText data={item?.label} loading={loading} />
          </button>
        ))}
      </div>
    </div>
  )
}
