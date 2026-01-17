import ConfirmationModal from '@components/elements/ConfirmationModal'
import Modal from '@components/elements/Modal'
import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react'

const defaultValue: Modal = {
  content: null,
  open: false,
  type: null,
}
export const ModalContext = createContext<{
  modal: Modal
  onClose: () => void
  setModal: React.Dispatch<React.SetStateAction<Modal>>
}>({
  modal: defaultValue,
  onClose: () => {},
  setModal: () => {},
})

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [modal, setModal] = useState(defaultValue)
  const onClose = () => setModal(defaultValue)
  const initialValue = useMemo(() => ({ modal, onClose, setModal }), [modal])

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [modal.open])

  return (
    <ModalContext.Provider value={initialValue}>
      {children}
      {modal.type === 'confirmation' ? (
        <ConfirmationModal {...modal} onClose={onClose}>
          {modal.content}
        </ConfirmationModal>
      ) : (
        <Modal {...modal} onClose={onClose}>
          {modal.content}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}
