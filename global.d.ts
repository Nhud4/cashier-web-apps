declare module '*.module.scss'
declare module '*.module.css'
declare module '*.svg'
declare module '*.svg?url'
declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
declare module '*.webp'
declare module '*.svg' {
  import * as React from 'react'
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}

declare module '*.svg?react' {
  import * as React from 'react'
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default SVGComponent
}

declare module '*.svg?url' {
  const content: string
  export default content
}

declare module '*.svg?raw' {
  const content: string
  export default content
}
