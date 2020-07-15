import { FC } from "react";
import { Work } from "model";
import styled from "styled-components";
import { WorkCard } from "components/lv2/WorkCard";

type Props = {
  works: Work[]
}

const WorkListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 49%);
  row-gap: 16px;
  justify-content: space-between;
`

export const WorkList: FC<Props> = ({ works }) => {
  return (
    <WorkListContainer>
      {works.map(work => (<WorkCard key={ work.annictID } work={ work } />))}
    </WorkListContainer>
  )
}
