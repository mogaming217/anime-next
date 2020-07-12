import { FC, FormEvent } from "react";
import { Work } from "model";
import { WorkImage } from "components/lv1/WorkImage";
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

const WorkOriginalInput: FC<{ work: Work }> = ({ work }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('on submit')
  }

  return (
    <form onSubmit={ onSubmit }>
      <input type="text" placeholder="原作種別"/>
      <input type="number" placeholder="何巻？"/>
      <input type="text" placeholder="アニメ何話時点？"/>
      <button type="submit">送信</button>
    </form>
  )
}

const WorkOriginal: FC<{ work: Work }> = ({ work }) => {
  const { loading, originals } = useWorkOriginals(work)
  if (loading) return (
    <div>...loading</div>
  )

  if (originals.length === 0) return (
    <div>
      no data
      <WorkOriginalInput work={ work } />
    </div>
  )

  return (
    <div>
      {originals.map((original, i) => (
        <div key={`original_${i}`}>{JSON.stringify(original)}</div>
      ))}

      <WorkOriginalInput work={ work } />
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
