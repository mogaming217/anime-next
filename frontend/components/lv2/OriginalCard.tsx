import { FC } from "react";
import { Original } from "model";
import styled from "styled-components";
import { Image } from "components/lv1";
import Constants from "styles/Constants";

const Container = styled.div`
  padding: 16px;
  background-color: ${Constants.COLOR.HIGHLIGHT_BACKGROUND};
  border-radius: 12px;
  display: flex;
  justify-content: start;
`

const ImageContainer = styled.div`
  width: 120px;
  height: auto;
`

const TextContainer = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: ${Constants.FONT_WEIGHT.BOLD};
  }
`

type Props = {
  original: Original
}

export const OriginalCard: FC<Props> = ({ original }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={ original.imageURL } />
      </ImageContainer>
      <TextContainer>
        <div className='title'>{original.title}</div>
        <a href={ original.link?.amazon } target="_blank">Amazonで見る</a>
      </TextContainer>
    </Container>
  )
}
