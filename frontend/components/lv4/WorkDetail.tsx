import { FC } from "react";
import { Work } from "model";
import { WorkImage } from "components/lv1/WorkImage";
import { WorkOriginalForm } from 'components/lv3/WorkOriginalForm'
import styled from "styled-components";
import Constants from "styles/Constants";
import { useWorkOriginals } from "hooks/work/useWorkOriginals";

type Props = {
  work: Work
}

const WorkTitle = styled.div`
  font-size: ${Constants.FONT.LARGE}px;
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
`

const WorkOriginal: FC<{ work: Work }> = ({ work }) => {
  const { loading, originals, addOriginal } = useWorkOriginals(work)

  if (loading) return (
    <div>...loading</div>
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

export const WorkDetail: FC<Props> = (props: Props) => {
  const work = props.work
  return (
    <div>
      <WorkImage src={ work.imageURL } width={120} height={120} />
      <WorkTitle>{ work.title }</WorkTitle>
      <WorkOriginal work={ work }/>
    </div>
  )
}
