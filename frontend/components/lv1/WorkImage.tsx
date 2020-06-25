import styled from "styled-components"
import Constants from "styles/Constants"
import { FC } from "react"

type Props = {
  width: number,
  height: number,
  src: string | null | undefined,
  alt?: string
}

const Image = styled.img<Props>`
  object-fit: cover;
  height: ${(p: Props) => p.height}px;
  width: ${(p: Props) => p.width}px;
  background-color: ${Constants.COLOR.IMAGE_BACKGROUND};
`

export const WorkImage: FC<Props> = (props) => (
  <Image
    width={ props.width }
    height={ props.height }
    src={ props.src || '/icon.png' }
    alt={ props.alt || 'アニメ画像' }
  />
)
