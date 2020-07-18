import { FC } from "react";
import { Work } from "model";
import { WorkOriginalForm } from 'components/lv3/WorkOriginalForm'
import styled from "styled-components";
import Constants from "styles/Constants";
import { useWorkOriginals } from "hooks/work/useWorkOriginals";
import { LoadingIndicator } from "components/lv1/LoadingIndicator";
import { WorkImage } from "components/lv2/WorkImage";

const WorkOriginal: FC<{ work: Work }> = ({ work }) => {
  const { loading, originals, addOriginal } = useWorkOriginals(work)

  if (loading) return (
    <LoadingIndicator />
  )

  if (originals.length === 0) return (
    <div>
      原作情報がまだないよ…情報お待ちしてます！
      <WorkOriginalForm work={ work } onCreate={ addOriginal } />
    </div>
  )

  return (
    <div>
      {originals.map((original, i) => (
        <div key={`original_${i}`}>{JSON.stringify(original)}</div>
      ))}

      <WorkOriginalForm work={ work } onCreate={ addOriginal } />
    </div>
  )
}

const WorkHeader = styled.div`
  position: relative;
  width: calc(100% + ${Constants.PADDING.SIDE * 2}px);
  height: 200px;
  margin: 0px -${Constants.PADDING.SIDE}px;
`

const WorkBackgroundContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`

const blurSize = 10
const WorkImageBackground = styled.div<{work: Work}>`
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(${blurSize}px);
  width: calc(100% + ${blurSize * 2}px);
  margin: -${blurSize}px;
`

const ImageBackgroundMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.2;
`

const WorkHeaderContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const WorkHeaderContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const WorkTitle = styled.div`
  font-size: ${Constants.FONT.LARGE}px;
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
  color: ${Constants.COLOR.STRONG_LABEL};
  padding: 16px 0px;
`

type Props = {
  work: Work
}

export const WorkDetail: FC<Props> = (props: Props) => {
  const work = props.work
  return (
    <div>
      <WorkHeader>
        <WorkBackgroundContainer>
          <WorkImageBackground work={ props.work }>
            <WorkImage src={ work.imageURL } />
          </WorkImageBackground>
          <ImageBackgroundMask />
        </WorkBackgroundContainer>
        <WorkHeaderContentContainer>
          <WorkHeaderContent>
            <WorkImage src={ work.imageURL } />
            <WorkTitle>{ work.title }</WorkTitle>
          </WorkHeaderContent>
        </WorkHeaderContentContainer>
      </WorkHeader>
      <WorkOriginal work={ work }/>
    </div>
  )
}
