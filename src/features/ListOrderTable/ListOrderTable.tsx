import BaseTable from '@components/modules/BaseTable'

import { columns } from './column'

export const ListOrderTable = () => {
  return <BaseTable columns={columns(false)} data={[]} />
}
