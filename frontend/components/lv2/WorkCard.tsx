import { FC } from 'react'
import styled from 'styled-components'
import { Work } from 'model'
import Link from "next/link"
import Constants from 'styles/Constants'
import { WorkImage } from './WorkImage'

const WorkCardContainer = styled.div`
  border-radius: ${Constants.CORNER_RADIUS.DEFAULT}px;
  overflow: hidden;
  width: 100%;
  text-align: center;
  box-shadow: ${Constants.SHADOW.DEFAULT};

  a {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  div.title {
    font-weight: bold;
    font-size: ${Constants.FONT.BASE}px;
    padding: 12px 6px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

type Props = {
  work: Work
}

export const WorkCard: FC<Props> = ({ work }: Props) => {
  return (
    <WorkCardContainer>
      <Link href='/works/[workID]' as={ `/works/${work.annictID}` }>
        <a>
          <WorkImage src={ work.imageURL } />
          <div className='title'>{ work.title }</div>
        </a>
      </Link>
    </WorkCardContainer>
  )
}
