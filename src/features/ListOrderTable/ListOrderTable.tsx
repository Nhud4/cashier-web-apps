import BaseTable from '@components/modules/BaseTable'
import { useState } from 'react'

import { columns } from './column'

const defaultMeta = { page: 1, totalData: 10, totalPage: 10, totalPerPage: 10 }

export const ListOrderTable = () => {
  const [meta, setMeta] = useState(defaultMeta)

  const onChangePage = (page: number) => {
    setMeta((prev) => ({ ...prev, page }))
  }

  return (
    <BaseTable
      columns={columns(false)}
      data={[]}
      meta={meta}
      onChangePage={onChangePage}
      showTotal={false}
    />
  )
}
