import styled from "styled-components"
import Constants from "styles/Constants"
import { FC } from "react"

type Props = {
  width?: string,
  height?: string,
  src: string | null | undefined,
  alt?: string
}

const _Image = styled.img<Props>`
  object-fit: cover;
  /* height: ${(p: Props) => p.height || 'auto'};
  width: ${(p: Props) => p.width || 'auto'}; */
  background-color: ${Constants.COLOR.IMAGE_BACKGROUND};
`

export const Image: FC<Props> = (props) => {
  const onError = (e: any) => {
    console.log('on error', props.src, e)
  }

  return (
    <_Image
      width={ props.width }
      height={ props.height }
      src={ props.src || '/noimage.png' }
      onError={ onError }
      alt={ props.alt || '画像' }
    />
  )

}
