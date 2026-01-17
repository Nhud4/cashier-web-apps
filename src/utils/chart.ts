/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChartOptions } from 'chart.js'

export const labels = {
  month: ['1', '2', '3', '4', '5', '6'],
  years: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Des',
  ],
}
// export const labelMonth = {
//   month
// }

export const baseChartOptions: ChartOptions = {
  layout: {
    padding: {
      top: 40,
    },
  },
  maintainAspectRatio: false,
  onHover: (event, element) => {
    const canvas: any = event.native?.target
    canvas.style.cursor = element[0] ? 'pointer' : 'default'
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        tickBorderDash: [15],
      },
    },
  },
}

export const getGradient = (
  ctx: {
    createLinearGradient: (
      arg0: number,
      arg1: any,
      arg2: number,
      arg3: any
    ) => any
  },
  chartArea: { bottom: number; left: number; right: number; top: number }
) => {
  let width
  let height
  let gradient

  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top
  if (gradient === null || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, '#EBF9FF')
    // gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow)
    gradient.addColorStop(1, '#247BA0')
  }

  return gradient
}
