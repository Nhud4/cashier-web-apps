import * as req from '@utils/httpRequest'

const endpoints = {
  main: '/products',
}

export const ListProduct = async (params: ProductListParams) => {
  const data = await req.basicGet<ApiResponse<ProductList[]>>(
    endpoints.main,
    params
  )
  return data
}
