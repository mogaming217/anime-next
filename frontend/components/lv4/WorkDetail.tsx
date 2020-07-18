import { FC } from "react";
import { Work } from "model";
import styled from "styled-components";
import Constants from "styles/Constants";
import { useWorkOriginals } from "hooks/work/useWorkOriginals";
import { LoadingIndicator } from "components/lv1";
import { WorkOriginalEmpty, SectionContainer, WorkImage } from "components/lv2";
import { WorkOriginalForm } from 'components/lv3'

const WorkOriginal: FC<{ work: Work }> = ({ work }) => {
  const { loading, originals, addOriginal } = useWorkOriginals(work)

  if (loading) return (
    <LoadingIndicator />
  )

  if (originals.length === 0) return (
    <div>
      <SectionContainer>
        <WorkOriginalEmpty work={ work } />
      </SectionContainer>
      <SectionContainer>
        <WorkOriginalForm work={ work } onCreate={ addOriginal } />
      </SectionContainer>
    </div>
  )

  return (
    <div>
      {originals.map((original, i) => (
        <div key={`original_${i}`}>{JSON.stringify(original)}</div>
      ))}

      <div>原作情報を追加する</div>
    </div>
  )
}

const WorkHeader = styled.div`
  width: calc(100% + ${Constants.PADDING.SIDE * 2}px);
  margin: 0px -${Constants.PADDING.SIDE}px;
`


const WorkTitle = styled.div`
  font-size: ${Constants.FONT.LARGE}px;
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
  text-align: center;
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
        <WorkImage src={ work.imageURL } />
      </WorkHeader>
      <WorkTitle>{ work.title }</WorkTitle>
      <WorkOriginal work={ work }/>
    </div>
  )
}
