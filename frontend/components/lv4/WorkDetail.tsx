import { FC } from "react";
import { Work } from "model/work";
import { WorkImage } from "components/lv1/WorkImage";
import styled from "styled-components";
import Constants from "styles/Constants";

type Props = {
  work: Work
}

const WorkTitle = styled.div`
  font-size: ${Constants.FONT.LARGE}px;
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
`

export const WorkDetail: FC<Props> = (props: Props) => {
  const work = props.work
  return (
    <div>
      <WorkImage src={ work.imageURL } width={120} height={120} />
      <WorkTitle>{work.title}</WorkTitle>
    </div>
  )
}
