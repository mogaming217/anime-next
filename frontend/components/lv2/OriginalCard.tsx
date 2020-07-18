import { FC } from "react";
import { Original } from "model";
import styled from "styled-components";
import { Image } from "components/lv1";

const Container = styled.div`
  padding: 12px;
  border: soild 1px gray;
  border-radius: 12px;
  display: flex;
  justify-content: start;
`

const ImageContainer = styled.div`
  width: 100px;
  height: auto;
`

const TextContainer = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
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
        <div>{original.title}</div>
        <a href={ original.link?.amazon } target="_blank">Amazonで見る</a>
      </TextContainer>
    </Container>
  )
}
