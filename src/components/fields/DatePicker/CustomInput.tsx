import { clsx } from '@utils/index'
import { forwardRef } from 'react'
import { type FieldError } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

type Props = {
  control?: boolean
  customPlaceholder?: string
  customWidth?: string
  error?: string | FieldError
  icon?: React.ReactNode
  isDisabled?: boolean
  isLoading?: boolean
  isRequired?: boolean
  label?: string
  labelClassname?: string
  onBlur?: () => void
  onClear?: () => void
  onClick?: () => void
  placeholderText?: string
  success?: boolean
  value?: string
}

const CustomDatePickerInput = forwardRef<HTMLButtonElement, Props>(
  (
    {
      value,
      onClick,
      isDisabled,
      label,
      icon,
      labelClassname,
      placeholderText,
      onBlur,
      error,
      isRequired,
      isLoading,
      customPlaceholder,
      customWidth,
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        {label ? (
          <p
            className={clsx([
              'flex items-center',
              labelClassname || 'font-semibold',
            ])}
          >
            {label}
            {isRequired ? (
              <span className="ml-1 font-semibold text-danger-500">*</span>
            ) : (
              ''
            )}
          </p>
        ) : null}
        {isLoading ? (
          <Skeleton height={37} />
        ) : (
          <button
            className={clsx([
              'flex items-center justify-between p-2 text-base border rounded-md text-left w-[17rem]',
              value || placeholderText ? 'pb-1' : '',
              error ? 'border-danger-500' : '',
              isDisabled
                ? 'bg-gray-100 pointer-events-none cursor-not-allowed'
                : '',
              customWidth,
            ])}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            type="button"
          >
            <p
              className={clsx([
                'w-full',
                placeholderText && !customPlaceholder && !value
                  ? 'opacity-50'
                  : '',
              ])}
            >
              {value || customPlaceholder || placeholderText}
            </p>
            <div className="-mt-1 ml-1">{icon}</div>
          </button>
        )}
      </div>
    )
  }
)

CustomDatePickerInput.displayName = 'CustomDatePickerInput'

export default CustomDatePickerInput
