type OrderProduct = {
  productId: number
  qty: number
  subtotal: number
  notes?: string
  discount: number
}

type CreateOrderRequest = {
  transactionDate: string
  transactionType: string
  deliveryType: string
  subtotal: number
  totalDiscount: number
  ppn: number
  bill: number
  items: OrderProduct[]
}

type OrderData = {
  id: string
  code: string
  transactionDate: string
  createdBy: string
  transactionType: string
  deliveryType?: string
  paymentType?: string
  subtotal: number
  totalDiscount: number
  ppn: number
  bill: number
  items: OrderProduct[]
}

type TransactionList = {
  no: number
  id: string
  code: string
  transactionDate: string
  customerName?: string
  paymentMethod: string
  bill: number
  createdAt: string
  tableNumber: string
}

type TransactionProducts = {
  id: string
  name: string
  price: number
  discount: number
  note?: string
  qty: number
  subtotal: number
}

type TransactionUser = {
  code: string
  name: string
}

type TransactionDetail = {
  id: string
  code: string
  transactionDate: string
  createdBy: string
  transactionType: string
  customerName?: string
  deliveryType?: string
  tableNumber: number
  paymentType: string
  paymentMethod?: string
  paymentStatus: string
  subtotal: number
  totalDiscount: number
  ppn: number
  bill: number
  payment?: number
  createdAt: string
  user: TransactionUser
  items: TransactionProducts[]
}

type TransactionCreate = CreateOrderRequest & {
  createdBy?: string
  transactionType: string
  customerName: string
  tableNumber: number
  paymentType: string
  paymentMethod: string
  paymentStatus: string
  payment: number
}
