import Button from '@components/elements/Button'
import { useQuerySlice } from '@redux/hooks'
import { clearCategory } from '@redux/slices/category'
import { fetchListCategory } from '@redux/slices/category/action'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import styles from './styles.module.css'

export const HeaderMenuCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialParams = {
    page: 1,
    size: 10,
  }

  const { data } = useQuerySlice<ProductsCategory[], TableParams>({
    clearSlice: clearCategory('list'),
    initial: initialParams,
    key: 'list',
    slice: 'category',
    thunk: fetchListCategory(initialParams),
  })

  const categoryOps = useMemo(() => {
    const cat = [{ label: 'Semua', value: '' }]
    if (data) {
      const category = data.map((item) => ({
        label: item.name,
        value: item.id,
      }))

      return [...cat, ...category]
    }

    return cat
  }, [data])

  const handleMenu = (val: string) => {
    setSearchParams({ cat: val })
  }

  const isActive = (val: string) => {
    const params = searchParams.get('cat')
    return params === val ? 'fill' : 'outline'
  }

  useEffect(() => {
    setSearchParams({ cat: '' })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {categoryOps.map((item, index) => (
          <Button
            className="capitalize !rounded-full !px-4 !h-fit"
            key={index}
            onClick={() => handleMenu(item?.value)}
            variant={isActive(item?.value)}
          >
            {item?.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
