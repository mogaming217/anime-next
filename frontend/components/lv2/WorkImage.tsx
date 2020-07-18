import { FC } from "react";
import styled from "styled-components";
import { Image } from "components/lv1";

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  ::before {
    content: '';
    display: block;
    padding-top: 45%; /* div.imageContainerの幅の50％ */
  }

  div.cardImage {
    position: absolute;
    top: 45%;
    transform: translateY(-47.5%);
    width: 100%;

    img {
      width: 100%;
    }
  }
`

type Props = {
  src: string | null | undefined
}

export const WorkImage: FC<Props> = (props: Props) => {
  return (
    <Container>
      <div className='cardImage'>
        <Image src={ props.src } alt="アニメ画像"/>
      </div>
    </Container>
  )
}
