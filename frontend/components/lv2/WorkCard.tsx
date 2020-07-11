import { FC } from 'react'
import styled from 'styled-components'
import { Work } from 'model'
import Link from "next/link"
import { WorkImage } from 'components/lv1/WorkImage'

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
          <WorkImage width={150} height={150} src={ work.imageURL || '' } alt="アニメ画像"/>
          <div>ID: { work.annictID }</div>
          <div>Title: { work.title }</div>
        </a>
      </Link>
    </WorkCardContainer>
  )
}
