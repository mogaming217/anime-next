import styled from "styled-components"
import Constants from "styles/Constants"
import { FC } from "react"

type Props = {
  src: string | null | undefined,
  alt?: string
}

const _Image = styled.img<Props>`
  object-fit: cover;
  background-color: ${Constants.COLOR.IMAGE_BACKGROUND};
`

export const Image: FC<Props> = (props) => {
  const onError = (e: any) => {
    console.log('on error', props.src, e)
  }

  return (
    <_Image
      src={ props.src || '/assets/noimage.png' }
      onError={ onError }
      alt={ props.alt || '画像' }
    />
  )

}
