import { FC } from 'react'
import { Original, originalTypeLabel } from 'model'
import styled from 'styled-components'
import { Image, AmazonButton } from 'components/lv1'
import { StyleConst } from 'styles/const'

const Container = styled.div`
  padding: 16px;
  background-color: ${StyleConst.COLOR.HIGHLIGHT_BACKGROUND};
  border-radius: ${StyleConst.CORNER_RADIUS.DEFAULT}px;
  display: flex;

  & + & {
    margin-top: 16px;
  }
`

const ImageContainer = styled.div`
  width: 120px;
  height: 100%;
  border-radius: ${StyleConst.CORNER_RADIUS.DEFAULT}px;
  overflow: hidden;
`

const TextContainer = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .title {
    font-weight: ${StyleConst.FONT_WEIGHT.BOLD};
  }
`

const PurchaseButtonContainer = styled.div`
  margin-top: 8px;
`

// FIXME: だいぶ雑だけどいいアイデアがないので一旦これで
const makeAnimeEpisodeNoLabel = (animeEpisodeNo: string): string => {
  if (animeEpisodeNo.includes('話')) return animeEpisodeNo
  return animeEpisodeNo + '話'
}

type Props = {
  original: Original
}

export const OriginalCard: FC<Props> = ({ original }) => {
  if (!original.title) return <Container>原作の詳細な情報を取得中です…</Container>

  const animeEpisodeLabel = original.animeEpisodeNo ? makeAnimeEpisodeNoLabel(original.animeEpisodeNo) : ''

  return (
    <Container>
      <ImageContainer>
        <Image src={original.imageURL} />
      </ImageContainer>
      <TextContainer>
        <div>
          <div className="title">{original.title}</div>
          <div>
            アニメ{animeEpisodeLabel}の続きは{originalTypeLabel(original.originalType)}の{original.originalNo}から👇
          </div>
        </div>
        {!!original.link && (
          <PurchaseButtonContainer>
            <AmazonButton as="a" href={original.link.amazon} target="_blank" style={{ display: 'inline-block' }}>
              Amazonで確認する
            </AmazonButton>
          </PurchaseButtonContainer>
        )}
      </TextContainer>
    </Container>
  )
}
