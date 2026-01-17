/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { clsx } from '@utils/index'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import {
  type DatePickerProps,
  default as BaseDatePicker,
} from 'react-datepicker'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from 'react-hook-form'

import CustomDatePickerInput from './CustomInput'
import styles from './styles.module.css'

type Props<T extends FieldValues> = Pick<DatePickerProps, 'placeholderText'> &
  UseControllerProps<T> & {
    className?: string
    closeClassName?: string
    control?: Control<T, unknown>
    customPlaceholder?: string
    customWidth?: string
    dateFormat?: string
    disabled?: boolean
    error?: string | FieldError
    icon?: React.ReactNode
    isLoading?: boolean
    label?: string
    labelClassname?: string
    loading?: boolean
    name: Path<T>
    onChange?: (date: Date | [Date | null, Date | null] | null) => void
    readonly required?: boolean
    selectsRange?: boolean
    success?: boolean
    value?: Date | null
  }

export function DatePicker<T extends FieldValues>({
  error,
  label,
  onChange,
  success,
  disabled,
  value,
  dateFormat = 'dd/MM/yyyy',
  className,
  icon,
  labelClassname,
  placeholderText,
  control,
  name,
  selectsRange,
  required,
  isLoading,
  customPlaceholder,
  closeClassName,
  customWidth,
  ...props
}: Props<T>) {
  const isRequired = required || Boolean(props.rules?.required)
  const [startDate, setStartDate] = useState<Date | null | undefined>(value)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [errorMessage, setErrorMessage] = useState(error)

  const handleChange = (
    date: Date | DateRange | null,
    onChangeCallback?: (date: Date | [Date | null, Date | null] | null) => void
  ) => {
    if (onChangeCallback) {
      if (selectsRange) {
        const [start, end] = date as DateRange
        setStartDate(start)
        setEndDate(end)
        onChangeCallback([start, end])
      } else {
        setStartDate(date as Date)
        onChangeCallback(date)
      }
    }
  }

  useEffect(() => {
    if (selectsRange && Array.isArray(value)) {
      const [start, end] = value as unknown as DateRange
      setStartDate(start)
      setEndDate(end)
    }
  }, [selectsRange, value])

  useEffect(() => {
    if (selectsRange && Array.isArray(props.defaultValue)) {
      const [start, end] = props.defaultValue as unknown as DateRange
      setStartDate(start)
      setEndDate(end)
    }
  }, [selectsRange, props.defaultValue])

  return (
    <div className={clsx([styles.root, className])}>
      {control ? (
        <Controller
          {...props}
          control={control}
          name={name}
          render={({
            field: { onChange: onChangeHookForm, value: currentValue, onBlur },
            fieldState: { error: hookError },
          }) => {
            setErrorMessage(hookError?.message)

            return (
              <BaseDatePicker
                {...props}
                clearButtonClassName={!disabled ? styles.clear__button : ''}
                customInput={
                  <CustomDatePickerInput
                    customWidth={customWidth}
                    error={errorMessage}
                    icon={icon}
                    isDisabled={disabled}
                    isLoading={isLoading}
                    isRequired={isRequired}
                    label={label}
                    labelClassname={labelClassname}
                    onBlur={onBlur}
                    placeholderText={placeholderText}
                    success={success}
                  />
                }
                dateFormat={dateFormat}
                dayClassName={(date) => {
                  const day = format(date, 'eeee').toLowerCase()
                  return ['sunday'].includes(day) ? '!text-red-500' : ''
                }}
                endDate={endDate}
                isClearable={disabled ? false : currentValue}
                name={name}
                onBlur={onBlur}
                onChange={(date: Date | DateRange | null) =>
                  handleChange(date, onChangeHookForm)
                }
                popperClassName={styles.popper}
                selected={selectsRange ? startDate : currentValue}
                selectsRange={selectsRange as any}
                showMonthDropdown
                showYearDropdown
                startDate={startDate}
              />
            )
          }}
        />
      ) : (
        <BaseDatePicker
          {...props}
          clearButtonClassName={clsx([styles.clear__button, closeClassName])}
          customInput={
            <CustomDatePickerInput
              control={false}
              customPlaceholder={customPlaceholder}
              customWidth={customWidth}
              error={error}
              icon={icon}
              isDisabled={disabled}
              isRequired={isRequired}
              label={label}
              labelClassname={labelClassname}
              placeholderText={placeholderText}
              success={success}
            />
          }
          dateFormat={dateFormat}
          dayClassName={(date) => {
            const day = format(date, 'eeee').toLowerCase()
            return ['sunday'].includes(day) ? '!text-red-500' : ''
          }}
          endDate={endDate}
          isClearable
          onChange={(date: Date | DateRange | null) =>
            handleChange(date, onChange)
          }
          popperClassName={styles.popper}
          selected={selectsRange ? startDate : value}
          selectsRange={selectsRange as any}
          showMonthDropdown
          showYearDropdown
          startDate={startDate}
        />
      )}
      {typeof errorMessage === 'string' ? (
        <p className="mt-1 text-sm text-danger-500">{errorMessage}</p>
      ) : null}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'
