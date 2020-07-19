import { FC, useState } from "react";
import { PlusCircle } from 'react-feather'
import { Work } from "model";
import styled from "styled-components";
import Constants from "styles/Constants";
import { useWorkOriginals } from "hooks/work/useWorkOriginals";
import { LoadingIndicator, SectionTitle, SectionDescription, Center } from "components/lv1";
import { WorkOriginalEmpty, SectionContainer, WorkImage, OriginalCard } from "components/lv2";
import { WorkOriginalForm } from 'components/lv3'
import { LabelButton } from "components/lv1/LabelButton";

const WorkOriginal: FC<{ work: Work }> = ({ work }) => {
  const { loading, originals, addOriginal } = useWorkOriginals(work)
  const [isFormExpanded, setExpanded] = useState(false)

  if (loading) return (
    <LoadingIndicator />
  )

  if (originals.length === 0) return (
    <>
      <SectionContainer withMargin>
        <WorkOriginalEmpty work={ work } />
      </SectionContainer>
      <SectionContainer withMargin>
        <WorkOriginalForm work={ work } onCreate={ addOriginal } />
      </SectionContainer>
    </>
  )

  return (
    <>
      <SectionContainer withMargin>
        <SectionTitle>原作情報</SectionTitle>
        <SectionDescription>
          アニメの続きを👇から確認しよう👍
        </SectionDescription>
        {originals.map(original => (
          <OriginalCard key={ original.id } original={ original } />
        ))}
      </SectionContainer>
      <SectionContainer withMargin>
        {isFormExpanded ? (
          <WorkOriginalForm work={ work } onCreate={ addOriginal } />
        ) : (
          <Center>
            <LabelButton label='原作情報を追加する' onClick={ () => setExpanded(true) } />
          </Center>
        )}
      </SectionContainer>
    </>
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
