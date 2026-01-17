type Route = Partial<{
  children: Route[]
  component: React.ReactNode
  disabled: boolean
  icon: string | React.ReactElement
  isSidebar: boolean
  name: string
  path: string
  requireAuth: boolean
}>
