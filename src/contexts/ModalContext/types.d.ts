type Modal = {
  confirmationType?: 'delete' | 'confirmation' | 'expired'
  content: React.ReactNode
  onConfirm?: () => void
  open: boolean
  title?: string
  type?: 'confirmation' | null
}
