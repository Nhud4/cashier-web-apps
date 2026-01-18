export const getStatusColor = (status: string) => {
  const colors = {
    berhasil: '#EAF7EA',
    canceled: '#F26464',
    danger: '#F26464',
    gagal: '#FBEAE9',
    pending: '#FFB648',
    success: '#29AB91',
    warning: '#FFB648',
  }

  return colors[status as keyof typeof colors]
}

export const generateNoColumn = (
  meta: PaginationMeta | undefined,
  index: number,
  size: number
): number => {
  if (!meta) return 1
  const page = meta?.page as number
  const no = page === 1 ? index + 1 : size * (page - 1) + index + 1
  return no
}

export const formatIDR = (number: number): string => {
  return (
    new Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      style: 'currency',
    })
      .format(number)
      .replace(',00', '') || 'Rp 0'
  )
}

export const clsx = (classes: (string | undefined)[]) => classes.join(' ')

export const toUpperFirst = (value?: string) => {
  if (value) {
    return `${value.charAt(0).toUpperCase()}${value.substring(1)}`
  }
  return ''
}

export const toCapitalize = (value: string) => {
  const str = value.toLowerCase().split(' ')
  const upper = []
  for (let i = 0; i < str.length; i++) {
    upper.push(`${str[i].charAt(0).toUpperCase()}${str[i].substring(1)}`)
  }

  return upper.join(' ')
}

export const base64ToBlob = (base64: string) => {
  const base64WithoutHeader = base64.includes(',')
    ? base64.split(',')[1]
    : base64

  const byteCharacters = atob(base64WithoutHeader)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: 'image/png' })
}

export const splitUrl = (pathname: string, menuPath?: string) => {
  const splitPath = pathname.split('/').filter((item) => ![''].includes(item))

  if (splitPath.includes('add')) {
    const path = pathname.split('/add')[0]
    return path === menuPath
  }

  if (splitPath.includes('edit')) {
    const path = pathname.split('/edit')[0]
    return path === menuPath
  }

  if (splitPath.includes('detail')) {
    const path = pathname.split('/detail')[0]
    return path === menuPath
  }

  if (splitPath.includes('send')) {
    const path = pathname.split('/send')[0]
    return path === menuPath
  }

  if (splitPath.includes('tambah')) {
    const path = pathname.split('/tambah')[0]
    return path === menuPath
  }

  if (splitPath.includes('wilayah-penanganan')) {
    return `/${splitPath[0]}` === menuPath
  }

  return pathname === menuPath
}

export const urlToBlob = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    return blob
  } catch (_error) {
    return null
  }
}

export const formatDynamicDesc = (
  totalKey: number,
  desc: string,
  value: string[]
) => {
  let text = desc

  new Array(totalKey).fill('').forEach((_item, index) => {
    text = text.replace(`{{${index + 1}}}`, value[index])
  })

  return text
}

export function getVisiblePages(
  currentPage?: number,
  totalPage?: number
): number[] {
  if (currentPage && totalPage) {
    if (totalPage <= 3) {
      return Array.from({ length: totalPage }, (_, i) => i + 1)
    }

    if (currentPage <= 2) {
      return [1, 2, 3]
    }

    if (currentPage >= totalPage - 1) {
      return [totalPage - 2, totalPage - 1, totalPage]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }

  return []
}
