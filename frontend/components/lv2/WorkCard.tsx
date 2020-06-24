import { FC } from 'react'
import styled from 'styled-components'
import { Work } from 'model/work'
import Link from "next/link"

const WorkImage = styled.img`
  object-fit: cover;
  height: 150px;
  width: 150px;
`
const WorkCardContainer = styled.div`
  margin: 16px;
`

type Props = {
  work: Work
}

export const WorkCard: FC<Props> = ({ work }: Props) => {
  return (
    <WorkCardContainer>
      <Link href='/works/[workID]' as={ `/works/${work.annictID}` }>
        <a>
          <WorkImage src={ work.imageURL || '' } alt="アニメ画像"/>
          <div>ID: { work.annictID }</div>
          <div>Title: { work.title }</div>
        </a>
      </Link>
    </WorkCardContainer>
  )
}
