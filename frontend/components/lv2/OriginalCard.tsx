import { FC } from "react";
import { Original } from "model";
import styled from "styled-components";
import { Image, AmazonButton } from "components/lv1";
import Constants from "styles/Constants";

const Container = styled.div`
  padding: 16px;
  background-color: ${Constants.COLOR.HIGHLIGHT_BACKGROUND};
  border-radius: ${Constants.CORNER_RADIUS.DEFAULT}px;
  display: flex;
`

const ImageContainer = styled.div`
  width: 120px;
  height: auto;
  border-radius: ${Constants.CORNER_RADIUS.DEFAULT}px;
  overflow: hidden;
`

const TextContainer = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .title {
    font-weight: ${Constants.FONT_WEIGHT.BOLD};
  }
`

const PurchaseButtonContainer = styled.div`
  margin-top: 8px;
`

type Props = {
  original: Original
}

export const OriginalCard: FC<Props> = ({ original }) => {
  if (!original.title) return (
    <Container>
      原作の詳細な情報を取得中です…
    </Container>
  )
  return (
    <Container>
      <ImageContainer>
        <Image src={ original.imageURL } />
      </ImageContainer>
      <TextContainer>
        <div>
          <div className='title'>{original.title}</div>
          { original.animeEpisodeNo && (
            <div>アニメ{original.animeEpisodeNo}時点</div>
          )}
        </div>
          { !!original.link && (
            <PurchaseButtonContainer>
              <AmazonButton as="a" href={ original.link.amazon } target="_blank" style={{ display: 'inline-block' }}>Amazonで確認する</AmazonButton>
            </PurchaseButtonContainer>
          )}
      </TextContainer>
    </Container>
  )
}
