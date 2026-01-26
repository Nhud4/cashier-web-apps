import { CartContext } from '@contexts/CartContext/context'
import { ModalContext } from '@contexts/ModalContext'
import { NotifyContext } from '@contexts/NotifyContext'
import { useContext, useEffect } from 'react'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'

import type { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useQuerySlice = <T, P>({
  slice,
  key,
  clearSlice,
  onSuccess,
  thunk,
  initial,
}: QuerySliceParams<RootState, T>) => {
  const { setNotify } = useContext(NotifyContext)
  const dispatch = useAppDispatch()
  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice]
    return stateObj[key as keyof typeof stateObj] as unknown as SliceState<T>
  })
  const { error, message, success, data } = sliceState

  useEffect(() => {
    if (clearSlice) {
      if (error) {
        setNotify({
          callback: () => dispatch(clearSlice),
          color: 'error',
          isOpen: true,
          message,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message])

  useEffect(() => {
    if (onSuccess) {
      if (success) {
        onSuccess(data)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, data])

  useEffect(() => {
    if (initial) {
      dispatch(thunk)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])

  return { ...sliceState, refetch: (_args?: P) => dispatch(thunk) }
}

export const useMutationSlice = <T>({
  slice,
  key,
  onSuccess,
  onError,
  clearSlice,
}: MutationSliceParams<RootState, T>) => {
  const { onClose: onCloseModal } = useContext(ModalContext)
  const { setNotify } = useContext(NotifyContext)
  const { clearCart } = useContext(CartContext)
  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice]
    return stateObj[key as keyof typeof stateObj] as unknown as SliceState<T>
  })
  const { error, success, message, data } = sliceState

  const customMessage = {
    add: 'Data berhasil ditambahkan',
    edit: 'Data berhasil diperbarui',
    remove: 'Data berhasil dihapus',
  }

  useEffect(() => {
    if (clearSlice) {
      if (success) {
        if (onSuccess) onSuccess(data)
        onCloseModal()
        clearSlice()
        clearCart()

        setNotify({
          callback: () => {
            if (onError) onError()
            clearSlice()
          },
          color: 'success',
          isOpen: true,
          message: customMessage[key],
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, data])

  useEffect(() => {
    if (clearSlice) {
      if (error) {
        setNotify({
          callback: () => {
            if (onError) onError()
            clearSlice()
          },
          color: 'error',
          isOpen: true,
          message: message,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message])

  return { ...sliceState, onCloseModal }
}
