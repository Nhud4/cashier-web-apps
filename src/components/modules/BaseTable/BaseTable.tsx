import ICONS from '@configs/icons'
import IMAGES from '@configs/images'
import { tableStyles } from '@utils/datatable'
import { useDebounce, useWindowHeight, useWindowWidth } from '@utils/hooks'
import { clsx, formatIDR } from '@utils/index'
import { type HTMLAttributes, useEffect, useMemo, useState } from 'react'
import DataTable, {
  type ExpanderComponentProps,
  type SortOrder,
  type TableColumn,
} from 'react-data-table-component'
import Select, { type StylesConfig } from 'react-select'

import styles from './styles.module.css'

const options = [
  { label: 10, value: 10 },
  { label: 15, value: 15 },
  { label: 20, value: 20 },
  { label: 50, value: 50 },
]

const customStyles: StylesConfig = {
  control: () => ({
    display: 'flex',
    width: 40,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '8px 0',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: 12,
    padding: 5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, fontSize: 12, opacity, transition }
  },
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
}

type Props<T> = {
  actionComponent?: React.ReactElement
  bottomTotal?: number
  classBody?: string
  columns: TableColumn<T>[]
  customHeight?: string
  data: T[]
  defaultPage?: number
  defaultSearch?: string
  expandOnRowClicked?: boolean
  expandOnRowDoubleClicked?: boolean
  expandableRowDisabled?: (row: T) => boolean
  expandableRowExpanded?: (row: T) => boolean
  expandableRows?: boolean
  expandableRowsComponent?: React.FC<ExpanderComponentProps<T>>
  expandableRowsHideExpander?: boolean
  isLoading?: boolean
  meta?: PaginationMeta
  onChangePage?: (page: number) => void
  onChangeRowPerPage?: (page: number, size: number) => void
  onSearch?: (search: string) => void
  onSelectedRowsChange?: (selected: {
    allSelected: boolean
    selectedCount: number
    selectedRows: T[]
  }) => void
  onSortServer?: (
    selectedColumn: TableColumn<T>,
    sortDirection: SortOrder
  ) => void
  resetSort?: boolean
  searchValue?: string
  selectableRows?: boolean
  readonly showTotal?: boolean
  title?: string
  titleClass?: string
  totalRows?: number
} & Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>

export const BaseTable: <T>(props: Props<T>) => React.ReactElement = ({
  columns,
  data,
  title,
  actionComponent,
  meta,
  defaultPage,
  onSearch,
  onSortServer,
  onChangePage,
  onChangeRowPerPage,
  showTotal = true,
  resetSort,
  className,
  isLoading,
  searchValue,
  titleClass,
  customHeight,
  classBody,
  selectableRows,
  onSelectedRowsChange,
  defaultSearch,
  totalRows = 10,
  bottomTotal,
  // Expanded row properties
  expandableRows,
  expandableRowsComponent,
  expandableRowExpanded,
  expandableRowDisabled,
  expandOnRowClicked,
  expandOnRowDoubleClicked,
  expandableRowsHideExpander,
}) => {
  const [search, setSearch] = useState<string | null>(null)
  const debounceSearch = useDebounce(search, 500)
  const windowHeight = useWindowHeight()
  const windowWidth = useWindowWidth()
  const isMobile = windowWidth <= 640

  const showingInfo = useMemo(() => {
    const start =
      Number(meta?.page) === 1
        ? 1
        : Number(totalRows) * (Number(meta?.page) - 1) + 1
    const end = Number(meta?.page) * Number(totalRows)

    return Number(meta?.totalData)
      ? `${start}-${
          end > Number(meta?.totalData) ? Number(meta?.totalData) : end
        }`
      : '0'
  }, [meta?.page, totalRows, meta?.totalData])

  useEffect(() => {
    if (onSearch) {
      onSearch(debounceSearch as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch])

  useEffect(() => {
    setSearch(searchValue || null)
  }, [searchValue])

  return (
    <div
      className={clsx([styles.main, className])}
      style={{ maxWidth: `${windowWidth - 32}px` }}
    >
      <div className={clsx([styles.header, !title ? '!pb-0' : ''])}>
        <div className={styles.name}>
          {title ? <h4 className={titleClass}>{title}</h4> : null}
          {meta?.totalData && showTotal ? (
            <span className="bg-cyan-100">{meta?.totalData}</span>
          ) : null}
        </div>
        <form className={styles.tools}>
          {onSearch ? (
            <div className={styles.search}>
              <ICONS.Search />
              <input
                className="text-sm"
                defaultValue={defaultSearch || ''}
                onChange={({ target: { value } }) => setSearch(value)}
                placeholder="Cari disini..."
                type="text"
                value={search as string}
              />
            </div>
          ) : null}
          {actionComponent && (
            <div className={styles.action}>{actionComponent}</div>
          )}
        </form>
      </div>
      <div
        className={clsx([
          styles.container,
          isLoading ? styles.loading : '',
          classBody,
        ])}
      >
        <DataTable
          columns={columns}
          customStyles={tableStyles(resetSort)}
          data={isLoading ? new Array(10).fill({}) : data}
          expandOnRowClicked={expandOnRowClicked}
          expandOnRowDoubleClicked={expandOnRowDoubleClicked}
          expandableRowDisabled={expandableRowDisabled}
          expandableRowExpanded={expandableRowExpanded}
          expandableRows={expandableRows}
          expandableRowsComponent={expandableRowsComponent}
          expandableRowsHideExpander={expandableRowsHideExpander}
          fixedHeader
          fixedHeaderScrollHeight={customHeight || `${windowHeight - 300}px`}
          noDataComponent={
            <div className="grid w-full min-h-full bg-white place-items-center">
              <div className="flex flex-col items-center">
                <img alt="Empty" className="w-[70%]" src={IMAGES.Empty} />
                <p className="font-semibold text-center text-black/80">
                  Data tidak ditemukan.
                </p>
              </div>
            </div>
          }
          // Expanded row properties
          onSelectedRowsChange={onSelectedRowsChange}
          onSort={onSortServer}
          paginationDefaultPage={defaultPage}
          persistTableHead={true}
          selectableRows={selectableRows}
          sortServer={Boolean(onSortServer)}
          theme="solarized"
        />
      </div>
      {meta ? (
        <div className={styles.pagination}>
          <div>
            <span>
              {showingInfo} dari {meta?.totalData}
            </span>
          </div>
          <div className={styles.paginationControl}>
            <div className={styles.paginationInfo}>
              <span>Menampilkan baris dalam perhalaman</span>
              <Select
                defaultValue={
                  totalRows
                    ? options.filter((item) => item.value === totalRows)
                    : options[0]
                }
                isSearchable={!isMobile}
                menuPlacement="auto"
                onChange={(newValue) => {
                  const option = newValue as Option
                  const currentPage = meta?.page as number
                  if (onChangeRowPerPage) {
                    onChangeRowPerPage(currentPage, Number(option.value))
                  }
                }}
                options={options}
                styles={customStyles}
              />
            </div>

            <div className={styles.paginationNavs}>
              <button
                className={`transform rotate-180 ${
                  meta?.page === 1 && 'pointer-events-none opacity-60'
                }`}
                disabled={meta?.page === 1}
                onClick={() => {
                  const currentPage = meta?.page as number
                  if (onChangePage) {
                    onChangePage(currentPage - 1)
                  }
                }}
              >
                <ICONS.Arrow />
              </button>
              <span className="text-xs text-medium">
                {meta?.page}/{' '}
                <span className="opacity-70">
                  {meta?.totalPage === 0 ? 1 : meta?.totalPage}
                </span>{' '}
              </span>
              <button
                className={`${
                  Boolean(
                    meta?.page === meta?.totalPage || meta?.totalPage === 0
                  ) && 'pointer-events-none opacity-60'
                }`}
                disabled={Boolean(
                  meta?.page === meta?.totalPage || meta?.totalPage === 0
                )}
                onClick={() => {
                  const currentPage = meta?.page as number
                  if (onChangePage) {
                    onChangePage(currentPage + 1)
                  }
                }}
              >
                <ICONS.Arrow />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {bottomTotal ? (
        <div className="flex justify-end items-center space-x-8">
          <h1>Total:</h1>
          <p className="font-semibold">{formatIDR(bottomTotal)}</p>
        </div>
      ) : null}
    </div>
  )
}
