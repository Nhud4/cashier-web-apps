type SelectOption = {
  icon?: string | React.ReactElement
  image?: string | React.ReactElement
  label: string | React.ReactElement
  value: string
  valueAs?: number | string
}

type SelectRow<T> = {
  allSelected: boolean
  selectedCount: number
  selectedRows: T[]
}

type BarChartData = {
  backgroundColor: string
  barPercentage?: number
  data: number[]
  hoverBackgroundColor?: string
  label: string
}

type Notify = {
  callback?: () => void
  color: 'info' | 'warning' | 'success' | 'error'
  isOpen: boolean
  message: string
}

type NotifyContextType = {
  notify: Notify
  setNotify: (notify: Notify) => void
}

type Option = {
  icon?: string | React.ReactElement
  image?: string | React.ReactElement
  label: string | React.ReactElement
  value: string
  // readonly option: readonly Option[]
}

type ErrorLogin = {
  password?: string
  username?: string
}

type ErrorRegister = ErrorLogin & {
  confirmPassword?: string
}

type BasicResponse = {
  code: number
  data: unknown
  message: string
  meta?: PaginationMeta
  success: boolean
}

type Status =
  | 'success'
  | 'pending'
  | 'canceled'
  | 'warning'
  | 'danger'
  | 'gagal'
  | 'berhasil'

type Admin = 'admin' | 'super-admin'

type LoginCredentials = {
  password: string
  userType: User
  username: string
}

type BasicState = {
  code: number
  data: unknown
  error: boolean
  loading: boolean
  message: string
} & BasicResponse

type UserToken = {
  exp: string
  token: string
}

type PaginationMeta = {
  page: number
  totalData: number
  totalDataOnPage?: number
  totalPage: number
  totalPerPage: number
}

type Meta = {
  page: number
  totalCost?: number
  totalData: number
  totalPage: number
  totalPerPage: number
  totalRevenue?: number
}

type Revenue = {
  customerValue?: string
  driverValue?: string
  merchantValue?: string
  presentaseCustomer?: string
  presentaseDriver?: string
  presentaseMerchant?: string
  presentaseRevenue?: string
  revenueValue?: string
}

type IsActiveDropDown = {
  disabledDropDown?: boolean
  isDropdown?: boolean
  path?: string
}

type ReceiptItems = {
  name: string
  qty: number
  price: number
  discount?: number
  note?: string
}

type ReceiptData = {
  customer: string
  storeName: string
  address: string
  orderNumber: string
  date: string
  time: string
  cashier: string
  items: ReceiptItems[]
  subtotal: number
  tax: number
  total: number
  cash: number
  change: number
  table: number
  orderType: string
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean
      getPrinters: () => Promise<any[]>
      printReceipt: (data: any) => Promise<{ success: boolean; error?: string }>
    }
  }
}
