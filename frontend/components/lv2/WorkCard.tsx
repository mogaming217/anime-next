import { FC } from 'react'
import styled from 'styled-components'


const WorkImage = styled.img`
  object-fit: cover;
  height: 150px;
  width: 150px;
`
const WorkCardContainer = styled.div`
  margin: 16px;
`

type Props = {
  work: any // FIXME: type
}

export const WorkCard: FC<Props> = ({ work }: Props) => {
  return (
    <WorkCardContainer>
      <a href={ `/works/${work.annictID}` }>
        <WorkImage src={ work.imageURL } alt="アニメ画像"/>
        <div>ID: { work.annictID }</div>
        <div>Title: { work.title }</div>
      </a>
    </WorkCardContainer>
  )
}
