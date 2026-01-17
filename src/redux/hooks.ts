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
  const sliceState = useAppSelector((state) => {
    const stateObj = state[slice]
    return stateObj[key as keyof typeof stateObj] as unknown as SliceState<T>
  })
  const { error, success, message, data } = sliceState

  const customMessage = {
    add: 'Data berhasil ditambahkan',
    bulkMessage: 'Pesan berhasil dikirim',
    edit: 'Data berhasil diperbarui',
    editBatch: 'Data berhasil diperbarui',
    evidence: 'Pesanan berhasil diselesaikan',
    remove: 'Data berhasil dihapus',
    removeBatch: 'Data berhasil dihapus',
    removeLimitUpdate: 'Data berhasil diperbarui',
    send: 'Pesan berhasil dikirim',
    sendBulk: 'Pesan berhasil dikirim',
    sendBulkNoImg: 'Pesan berhasil dikirim',
    sendWithoutImage: 'Pesan berhasil dikirim',
    sync: 'Data berhasil disinkronisasi',
    syncMPost: 'Data berhasil disinkronisasi',
  }

  useEffect(() => {
    if (clearSlice) {
      if (error || success) {
        if (success) {
          onCloseModal()
          if (onSuccess) onSuccess(data)
          clearSlice()
        }

        setNotify({
          callback: () => {
            if (onError) onError()
            clearSlice()
          },
          color: error ? 'error' : 'success',
          isOpen: true,
          message: error ? message : customMessage[key],
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success, message, data])

  return { ...sliceState, onCloseModal }
}
