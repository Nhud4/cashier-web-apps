import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/products',
}

export const ListProduct = async (params: TableParams) => {
  const data = await req.basicGet<ApiResponse<Product[]>>(
    endpoints.main,
    params
  )
  return data
}
