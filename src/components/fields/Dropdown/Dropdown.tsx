import { clsx } from '@utils/index'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import Select, { type GroupBase, type Props } from 'react-select'

type CustomProps<T extends FieldValues> = {
  control?: Control<T, unknown>
  error?: string | FieldError
  isLoading?: boolean
  isRequired?: boolean
  label?: string
  labelClassname?: string
  maxWidth?: string
  minWidth?: string
  name: Path<T>
  notes?: string
} & UseControllerProps<T>

export function Dropdown<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
  T extends FieldValues = object,
>({
  styles,
  label,
  control,
  name,
  defaultValue,
  error,
  labelClassname,
  isRequired,
  maxWidth,
  isLoading,
  minWidth,
  notes,
  ...props
}: Props<Option, IsMulti, Group> & CustomProps<T>) {
  return (
    <div className="space-y-1" style={{ maxWidth }}>
      {label ? (
        <label
          className={clsx(['flex items-center', labelClassname])}
          htmlFor="services"
        >
          {label}
          {isRequired ? (
            <span className="ml-1 font-semibold text-danger-500">*</span>
          ) : (
            ''
          )}
        </label>
      ) : null}

      {notes ? <p className="text-sm italic text-gray-3">{notes}</p> : null}

      {control ? (
        <Controller
          {...props}
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => {
            if (isLoading) {
              return <Skeleton height={37} />
            }
            return (
              <Select
                {...props}
                defaultValue={defaultValue || value}
                onChange={(option) => onChange(option)}
                ref={ref}
                styles={{
                  ...styles,
                  control: (rest) => ({
                    ...rest,
                    border: error ? '1px solid #D62A24' : '',
                    cursor: 'pointer',
                    minWidth: minWidth || 175,
                  }),
                  menu: (rest) => ({ ...rest, zIndex: 9999 }),
                  option: (rest) => ({ ...rest, cursor: 'pointer' }),
                }}
                value={value}
              />
            )
          }}
        />
      ) : (
        <div>
          {isLoading ? (
            <Skeleton height={37} width={174} />
          ) : (
            <Select
              {...props}
              defaultValue={defaultValue}
              name={name}
              styles={{
                ...styles,
                control: (rest, state) => ({
                  ...rest,
                  '&:hover': {
                    borderColor: state.isFocused ? '#EA7C69' : rest.borderColor,
                  },
                  borderColor: state.isFocused ? '#EA7C69' : rest.borderColor,
                  borderRadius: 8,
                  boxShadow: state.isFocused
                    ? '0 0 0 1px #EA7C69'
                    : rest.boxShadow,
                  cursor: 'pointer',
                  minHeight: 48,
                  minWidth: minWidth || 175,
                }),
                menu: (rest) => ({ ...rest, zIndex: 9999 }),
                option: (rest, state) => ({
                  ...rest,
                  backgroundColor: state.isSelected
                    ? '#EA7C69'
                    : state.isFocused
                      ? 'rgba(234, 124, 105, 0.2)'
                      : rest.backgroundColor,
                  cursor: 'pointer',
                }),
              }}
            />
          )}
        </div>
      )}
      {typeof error === 'string' ? (
        <p className="text-sm text-danger-500">{error}</p>
      ) : null}
    </div>
  )
}
