type ApiResponse<T> = {
  code: number
  data: T
  message: string
  meta?: Meta
  success: boolean
}

type TableParams = {
  filterBy?: string
  order?: 'asc' | 'desc' | string
  page: number | string
  search?: string
  size: number | string
  sort?: string
  status?: string
}
