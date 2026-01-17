import {
  createTheme,
  type PaginationOptions,
  type TableStyles,
} from 'react-data-table-component'

createTheme(
  'solarized',
  {
    divider: {
      default: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#676D7A',
      secondary: '#2aa198',
    },
  },
  'dark'
)

export const tableStyles = (resetSort?: boolean): TableStyles => ({
  cells: {
    style: {
      // 1.5em 0
      lineHeight: '135%',
      marginBottom: '0.7rem 0', // 135%
    },
  },
  expanderButton: {
    style: {
      backgroundColor: 'white',
      color: '#dae0eb',
    },
  },
  expanderRow: {
    style: {
      '&:nth-child(even)': {
        background: 'white',
        borderBottom: '1px solid #dae0eb',
      },
      '&:nth-child(odd)': {
        background: 'white',
        borderBottom: '1px solid #dae0eb',
      },
      fontFamily: 'Poppins, sans-serif',
      fontSize: 12,
      fontWeight: 400,
    },
  },

  head: {
    style: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: 12, // 15
      fontWeight: 500,
      zIndex: 1,
    },
  },
  headRow: {
    style: {
      '.rdt_TableCol_Sortable span': {
        display: resetSort ? 'none' : 'inline-flex',
      },
      background: '#F5F5F5',
      // '#F6F6F7'
      borderRadius: 5,
    },
  },
  pagination: {
    pageButtonsStyle: {
      color: '#fff',
      fill: '#fff',
    },
    style: {
      background: 'rgba(255,255,255,0.1)',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      color: 'white',
      fontSize: '16px',
    },
  },
  rows: {
    style: {
      '&:first-child': {
        marginTop: 0,
      },
      '&:nth-child(even)': {
        background: 'white',
        borderBottom: '1px solid #dae0eb',
      },
      '&:nth-child(odd)': {
        background: 'white',
        borderBottom: '1px solid #dae0eb',
      },
      fontFamily: 'Poppins, sans-serif',
      fontSize: 12,
      fontWeight: 400,
    },
  },
  table: {
    style: {
      background: '#fff',
      fontFamily: 'Poppins, sans-serif',

      minHeight: '400px',

      // 15
      paddingBottom: 25,

      paddingLeft: 10,
      // 15
      paddingRight: 10,
      position: 'relative',
    },
  },
})

export const paginationInfo: PaginationOptions = {
  rangeSeparatorText: ' dari',
  rowsPerPageText: 'Baris setiap halaman:',
}
