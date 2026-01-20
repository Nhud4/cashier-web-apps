import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/transaction',
  order: '/order',
}

// order api
export const getOrder = async () => {
  const data = await req.get<ApiResponse<OrderData>>(endpoints.order)
  return data
}

export const createOrder = async (payload: CreateOrderRequest) => {
  const data = await req.post(endpoints.order, payload)
  return data
}

// transaction
export const getTransaction = async (params: TableParams) => {
  const data = await req.get<ApiResponse<TransactionList[]>>(
    endpoints.main,
    params
  )
  return data
}

export const detailTransaction = async (code: string) => {
  const data = await req.get<ApiResponse<TransactionDetail>>(
    `${endpoints.main}/${code}`
  )
  return data
}

export const createTransaction = async (payload: TransactionCreate) => {
  const data = await req.post(endpoints.main, payload)
  return data
}
