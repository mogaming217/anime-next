declare module 'nextjs-progressbar' {
  import { FC } from 'react'

  type Props = {
    color?: string
    height?: string
    options?: {
      showSpinner?: boolean
    }
  }

  const ProgressBar: FC<Props>
  export default ProgressBar
}
