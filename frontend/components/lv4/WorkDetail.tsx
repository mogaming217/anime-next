import { FC } from "react";
import { Work } from "model";
import { WorkOriginalForm } from 'components/lv3/WorkOriginalForm'
import styled from "styled-components";
import Constants from "styles/Constants";
import { useWorkOriginals } from "hooks/work/useWorkOriginals";
import { LoadingIndicator } from "components/lv1/LoadingIndicator";
import { WorkImage } from "components/lv2/WorkImage";
import { WorkOriginalEmpty } from "components/lv2/WorkOriginalEmpty";

const WorkOriginal: FC<{ work: Work }> = ({ work }) => {
  const { loading, originals, addOriginal } = useWorkOriginals(work)

  if (loading) return (
    <LoadingIndicator />
  )

  if (originals.length === 0) return (
    <div>
      <WorkOriginalEmpty work={ work } />
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
