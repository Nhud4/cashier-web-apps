import TableCell from '@components/modules/TableCell'
// import { type TableColumn } from 'react-data-table-component'
import ICONS from '@configs/icons'

export const columns = (loading: boolean) => [
  {
    cell: () => <TableCell loading={loading} skeletonWidth={35} value="1" />,
    name: 'No',
    width: '70px',
  },
  {
    cell: () => (
      <TableCell loading={loading} skeletonWidth={35} value="10-01-2026" />
    ),
    name: 'Tanggal',
  },
  {
    cell: () => (
      <TableCell loading={loading} skeletonWidth={35} value="10-01-2026" />
    ),
    name: 'ID Pesanan',
  },
  {
    cell: () => (
      <TableCell loading={loading} skeletonWidth={35} value="10-01-2026" />
    ),
    name: 'Pelanggan',
  },
  {
    cell: () => (
      <TableCell loading={loading} skeletonWidth={35} value="10-01-2026" />
    ),
    name: 'Pembayaran',
  },
  {
    cell: () => (
      <TableCell
        loading={loading}
        skeletonWidth={35}
        value={
          <div className="flex items-center justify-between w-full">
            <p>Rp 12.000</p>
            <button>
              <ICONS.Arrow />
            </button>
          </div>
        }
      />
    ),
    name: 'Total',
  },
]
