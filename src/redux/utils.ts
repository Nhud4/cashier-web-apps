import {
  type ActionReducerMapBuilder,
  type AsyncThunk,
  type Draft,
  type PayloadAction,
} from '@reduxjs/toolkit'

export const meta: Meta = {
  page: 1,
  totalData: 0,
  totalPage: 0,
  totalPerPage: 0,
}

export const basicState = {
  code: 500,
  data: [],
  error: false,
  loading: false,
  message: '',
  success: false,
}

export const isTimeout = (
  payload: unknown
): { code: number; message: string } => {
  if (payload instanceof DOMException) {
    if (payload.code === DOMException.ABORT_ERR) {
      return { code: 408, message: 'Fetch timeout, please try again later' }
    }
  }
  return { code: 200, message: '' }
}

export const handleError = (payload: {
  code: number
  data: unknown
  message: string
}) => {
  const { code, message, data } = payload
  if (code === 409) return 'Data sudah pernah dibuat'
  if (payload instanceof DOMException) {
    if (code === DOMException.ABORT_ERR) {
      return 'Fetch timeout, please try again later'
    }
  }
  if (code === 422 && Array.isArray(data)) {
    const fieldErrors = data as FieldError[]
    return fieldErrors
      .map(({ field, message: msgField }) => `${field}: ${msgField}`)
      .join('~')
  }
  return message
}

export const sliceReducer = <S, T>({
  state,
  action,
  type,
  key,
}: SliceReducer<S>) => {
  const nextState = { ...state } as Record<string, SliceState<T>>
  const payload = action ? (action.payload as SliceState<T>) : null
  const stateKey = key as keyof typeof nextState

  if (type === 'fulfilled' && payload) {
    nextState[stateKey] = { ...payload, error: false, loading: false }
  }

  if (type === 'pending') {
    nextState[stateKey] = {
      ...nextState[stateKey],
      error: false,
      loading: true,
      message: '',
    }
  }

  if (type === 'rejected' && payload) {
    const { message, code, data } = payload
    nextState[stateKey] = {
      ...nextState[stateKey],
      code,
      error: true,
      loading: false,
      message: handleError({ code, data, message }),
      success: false,
    }
  }

  return nextState as unknown as Draft<S>
}

export const thunkBuilder = <S, T, P>({
  builder,
  thunk,
  key,
}: {
  builder: ActionReducerMapBuilder<S>
  key: keyof Draft<S>
  thunk: AsyncThunk<T, P, object>
}) => {
  builder.addCase(thunk.fulfilled, (state, action) => {
    const nextState = sliceReducer<S, T>({
      action,
      key,
      state,
      type: 'fulfilled',
    })
    state[key] = nextState[key]
  })
  builder.addCase(thunk.pending, (state) => {
    const nextState = sliceReducer<S, T>({
      key,
      state,
      type: 'pending',
    })
    state[key] = nextState[key]
  })
  builder.addCase(thunk.rejected, (state, action) => {
    const nextState = sliceReducer<S, T>({
      action,
      key,
      state,
      type: 'rejected',
    })
    state[key] = nextState[key]
  })
}

export const clearReducer = <S>(
  state: Draft<S>,
  action: PayloadAction<keyof S, string, never>
) => {
  const nextState = state as unknown as Record<string, SliceState<unknown>>
  const key = action.payload as keyof typeof nextState

  nextState[key].error = false
  nextState[key].message = ''
  nextState[key].success = false
}
