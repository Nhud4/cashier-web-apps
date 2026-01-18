/* eslint-disable react-hooks/refs */
import ICONS from '@configs/icons'
import { clsx } from '@utils/index'
import { type InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

type Props<T extends FieldValues> = {
  areaHight?: string
  control?: Control<T, unknown>
  error?: string | FieldError
  readonly integer?: boolean
  readonly isArea?: boolean
  isLoading?: boolean
  label?: string
  labelClassname?: string
  name: Path<T>
  readonly onlyLetter?: boolean
  readonly onlyNumber?: boolean
  prefix?: string
  prefixClassName?: string
  readonly required?: boolean
  textNotes?: string
  readonly upperCase?: boolean
  readonly withoutSpecialCharacter?: boolean
} & UseControllerProps<T> &
  InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement>

export function TextInput<T extends FieldValues>({
  label,
  control,
  name,
  error,
  prefix,
  type = 'text',
  onlyNumber,
  onlyLetter,
  labelClassname,
  className,
  isArea,
  required,
  isLoading,
  integer,
  prefixClassName,
  withoutSpecialCharacter,
  areaHight,
  upperCase,
  textNotes,
  ...props
}: Props<T>) {
  const isPassword = type === 'password'
  const isRequired = required || Object.keys(props?.rules || {}).length
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(error)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!control) {
      setErrorMessage(error)
    }
  }, [error, control])

  function transFormValue<E>(event: React.ChangeEvent<E>) {
    const target = event.target as unknown as Record<string, unknown>
    const value = target.value as string
    if (onlyNumber) {
      return {
        ...event,
        target: {
          ...event.target,
          value: integer
            ? Number(value.replace(/[^0-9]/g, ''))
            : value.replace(/\D/g, ''),
        },
      }
    }
    if (onlyLetter) {
      return {
        ...event,
        target: {
          ...event.target,
          value: value.replace(/[^a-zA-Z. ]/g, ''),
        },
      }
    }
    if (withoutSpecialCharacter) {
      return {
        ...event,
        target: {
          ...event.target,
          value: value.replace(/[^a-zA-Z0-9]/g, ''),
        },
      }
    }
    if (upperCase) {
      return {
        ...event,
        target: {
          ...event.target,
          value: value.toUpperCase(),
        },
      }
    }
    return event
  }

  return (
    <div className={clsx(['space-y-1', className])}>
      {label ? (
        <label
          className={clsx(['flex items-center', labelClassname])}
          htmlFor={props.id}
        >
          {label}
          {isRequired ? (
            <span className="ml-1 font-semibold text-danger-500">*</span>
          ) : (
            ''
          )}
        </label>
      ) : null}
      {textNotes ? (
        <p className="italic text-neutral-500 text-sm">Nb: {textNotes}</p>
      ) : null}
      {isLoading && !isArea ? <Skeleton height={37} /> : null}
      {isLoading && isArea ? <Skeleton height={80} /> : null}
      {control && !isLoading ? (
        <Controller
          {...props}
          control={control}
          name={name}
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error: hookError },
          }) => {
            setErrorMessage(hookError?.message)
            return (
              <div
                className={clsx([
                  'border flex items-center justify-between rounded-lg pl-4 relative',
                  'focus-within:outline focus-within:outline-2 focus-within:outline-orange',
                  errorMessage
                    ? 'border-danger-500 focus-within:border-transparent'
                    : 'border-border',
                  prefix ? 'pl-0' : '',
                  props.disabled ? 'bg-neutral-100' : '',
                ])}
              >
                {prefix ? (
                  <div
                    className={clsx([
                      'flex items-center justify-center w-10 px-1 bg-opacity-25 rounded-l-lg h-[46px] bg-gray-3',
                      prefixClassName,
                    ])}
                  >
                    {prefix}
                  </div>
                ) : null}
                {isArea ? (
                  <textarea
                    {...props}
                    className={clsx([
                      'w-full rounded-md outline-none h-28 mt-2',
                      props.disabled ? '!bg-neutral-100' : '',
                      prefix ? 'pl-1' : '',
                      areaHight,
                    ])}
                    name={name}
                    onBlur={onBlur}
                    onChange={(event) => {
                      if (props.onChange) {
                        onChange(props.onChange(transFormValue(event)))
                      } else {
                        onChange(transFormValue(event))
                      }
                    }}
                    value={value || ''}
                  />
                ) : (
                  <input
                    {...props}
                    className={clsx([
                      'w-full rounded-md outline-none h-[46px]',
                      props.disabled ? 'bg-neutral-100' : '',
                      prefix ? 'pl-1' : '',
                    ])}
                    name={name}
                    onBlur={onBlur}
                    onChange={(event) => {
                      if (props.onChange) {
                        onChange(props.onChange(transFormValue(event)))
                      } else {
                        onChange(transFormValue(event))
                      }
                    }}
                    type={isPassword && showPassword ? 'text' : type}
                    value={value || ''}
                  />
                )}
                {isPassword ? (
                  <button
                    className="mr-2"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <ICONS.EyeSlash /> : <ICONS.Eye />}
                  </button>
                ) : null}
                {value && !props.disabled && !isPassword ? (
                  <button
                    className={clsx([
                      prefix ? 'w-8 h-8' : 'w-6 h-6',
                      '!mr-2',
                      isArea ? 'absolute top-2 right-0' : '',
                    ])}
                    onClick={() => onChange(onlyNumber ? null : '')}
                    type="button"
                  >
                    <ICONS.Close />
                  </button>
                ) : null}
              </div>
            )
          }}
        />
      ) : null}
      {!control && !isLoading ? (
        <div
          className={clsx([
            'border border-border rounded-lg focus-within:border-orange',
            'focus-within:outline focus-within:outline-1 focus-within:outline-orange',
            prefix ? 'flex items-center space-x-2 pl-0' : 'pl-4',
            isPassword ? 'flex items-center justify-between' : '',
            props.disabled ? 'bg-white' : '',
          ])}
        >
          {prefix ? (
            <div className="flex items-center justify-center w-16 px-1 bg-opacity-25 rounded-l-lg h-[46px] bg-neutral-2">
              {prefix}
            </div>
          ) : null}
          {isArea ? (
            <textarea
              {...props}
              className={clsx([
                'w-full rounded-md outline-none h-28 mt-2 ',
                props.disabled ? 'bg-white' : '',
                prefix ? 'pl-1' : '',
              ])}
              name={name}
            />
          ) : (
            <input
              {...props}
              className={clsx([
                'w-full rounded-md outline-none h-[46px]',
                prefix ? 'pl-1' : '',
              ])}
              name={name}
              type={type}
            />
          )}
          {isPassword ? (
            <button
              className="mr-2"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <ICONS.EyeSlash fill="#000" /> : <ICONS.Eye />}
            </button>
          ) : null}
          {props.value && !props.disabled && inputRef?.current ? (
            <button
              className={clsx([prefix ? 'w-8 h-8' : 'w-6 h-6', '!mr-2'])}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
              }}
              type="button"
            >
              <ICONS.Close />
            </button>
          ) : null}
        </div>
      ) : null}
      {typeof errorMessage === 'string' ? (
        <p className="text-sm text-danger-500">{errorMessage}</p>
      ) : null}
    </div>
  )
}
