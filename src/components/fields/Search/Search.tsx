import ICONS from '@configs/icons'
import { useDebounce } from '@utils/hooks'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'

type Props = {
  defaultSearch?: string
  onSearch?: (search: string) => void
  searchValue?: string
  placeholder?: string
}

export const Search: React.FC<Props> = ({
  onSearch,
  defaultSearch,
  searchValue,
  placeholder,
}) => {
  const [search, setSearch] = useState<string | null>(null)
  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    if (onSearch) {
      onSearch(debounceSearch as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  useEffect(() => {
    setSearch(searchValue || null)
  }, [searchValue])

  return (
    <div className={styles.search}>
      <ICONS.Search />
      <input
        className="text-sm bg-transparent"
        defaultValue={defaultSearch || ''}
        onChange={({ target: { value } }) => setSearch(value)}
        placeholder={placeholder || 'Cari disini...'}
        type="text"
        value={search as string}
      />
    </div>
  )
}
