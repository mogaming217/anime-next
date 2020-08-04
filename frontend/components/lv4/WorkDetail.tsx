import { FC, useState } from "react";
import { Work, Original } from "model";
import styled from "styled-components";
import Constants from "styles/StyleConst";
import { useWorkOriginals } from "hooks/work/useWorkOriginals";
import { LoadingIndicator, SectionDescription, Center, SectionTitle } from "components/lv1";
import { WorkOriginalEmpty, SectionContainer, WorkImage, OriginalCard } from "components/lv2";
import { WorkOriginalForm, WorkList } from 'components/lv3'
import { LabelButton } from "components/lv1/LabelButton";
import { useRelatedWorks } from "hooks/work/useRelatedWorks";

const WorkOriginal: FC<{ work: Work, defaultOriginals?: Original[] }> = ({ work, defaultOriginals }) => {
  const { loading, originals, addOriginal } = useWorkOriginals(work, defaultOriginals)
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
        <SectionDescription>
          アニメの続きはこちら👇
        </SectionDescription>
        <div style={{ marginTop: 16 }}>
          {originals.map(original => (
            <OriginalCard key={ original.id } original={ original } />
          ))}
        </div>
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
  margin: 24px 0px;
`

type Props = {
  work: Work
  originals?: Original[]
}

export const WorkDetail: FC<Props> = (props: Props) => {
  const work = props.work
  const relatedWorksState = useRelatedWorks(work)

  return (
    <div>
      <WorkHeader>
        <WorkImage src={ work.imageURL } />
      </WorkHeader>
      <WorkTitle>{ work.title }</WorkTitle>
      <WorkOriginal work={ work } defaultOriginals={ props.originals } />

      <SectionContainer withMargin>
        <SectionTitle>関連する作品</SectionTitle>
        { relatedWorksState.loading ? (
          <LoadingIndicator />
        ) : relatedWorksState.relatedWorks.length === 0 ? (
          <div>関連する作品が見つかりませんでした</div>
        ) : (
          <WorkList works={ relatedWorksState.relatedWorks } />
        )}
      </SectionContainer>
    </div>
  )
}
