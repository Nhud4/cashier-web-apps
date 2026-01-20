import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/products-categories',
}

export const ListCategory = async (params: TableParams) => {
  const data = await req.basicGet<ApiResponse<ProductsCategory[]>>(
    endpoints.main,
    params
  )
  return data
}
