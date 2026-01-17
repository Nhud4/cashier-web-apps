import { format, isValid } from 'date-fns'
import { id } from 'date-fns/locale'

export const getLocalDay = () => {
  return format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })
}

export const dateOfBirthFormat = (date: string) => {
  return format(new Date(date), 'dd-MM-yy')
}

export const dateOfTransactionFormat = (date?: string) => {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy, HH:mm', { locale: id })
}

export const dateFilterTable = (filterValue: string) => {
  const date = new Date()
  const years = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(years, month, 1)
  const lastDay = new Date(years, month + 1, 1)

  let filter
  if (filterValue === 'thisMonth') {
    filter = {
      endDate: `${format(new Date(lastDay), 'yyy-MM-dd')}T00:00:00%2B07:00`,
      startDate: `${format(new Date(firstDay), 'yyy-MM-dd')}T00:00:00%2B07:00`,
    }
  }
  if (filterValue === 'lastMonth') {
    filter = {
      endDate: `${format(
        new Date(years, month, 1),
        'yyy-MM-dd'
      )}T00:00:00%2B07:00`,
      startDate: `${format(
        new Date(years, month - 1, 1),
        'yyy-MM-dd'
      )}T00:00:00%2B07:00`,
    }
  }
  if (filterValue === 'years') {
    filter = {
      endDate: `${years + 1}-01-01T00:00:00%2B07:00`,
      startDate: `${years}-01-01T00:00:00%2B07:00`,
    }
  }
  return filter
}

export const customDateFormat = (
  date?: string,
  dateFormat?: string,
  timeZone?: string,
  isoTimeZone?: boolean
) => {
  if (!date) return ''
  if (!isValid(new Date(date))) return ''

  const convert = format(new Date(date), dateFormat || 'dd MMMM yyyy, HH:mm', {
    locale: id,
  })

  if (timeZone) {
    return `${convert} ${timeZone}`
  }

  if (isoTimeZone) {
    return `${convert}T00:00:00%2B07:00`
  }

  return convert
}

export const TimeOption = () => {
  const hour = [...Array(24).keys()]
  const minutes = [...Array(60).keys()]
  const options = []
  for (let i = 0; i < hour.length; i++) {
    const newHour = hour[i] < 10 ? `0${hour[i]}` : hour[i]
    for (let j = 0; j < minutes.length; j++) {
      const countTime = minutes[j]
      const newTime = countTime < 10 ? `0${countTime}` : countTime
      options.push({
        label: `${newHour}:${newTime} WIB`,
        value: `${newHour}:${newTime}`,
      })
    }
  }

  return options
}

function isToday(date: Date) {
  const today = new Date()

  const givenDate = date.toISOString().split('T')[0]
  const todayDate = today.toISOString().split('T')[0]

  return givenDate === todayDate
}

export const rangeDateFilterFormat = (startDate?: string, endDate?: string) => {
  const start = startDate?.split('T')[0]
  const end = endDate?.split('T')[0]

  if (isToday(new Date(start as string)) && isToday(new Date(end as string))) {
    return null
  }

  return [new Date(start as string), new Date(end as string)]
}

export const differenceDate = (
  startDate: Date | string,
  endDate: Date | string
) => {
  const date1 = new Date(startDate)
  const date2 = new Date(endDate)
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays || 0
}
