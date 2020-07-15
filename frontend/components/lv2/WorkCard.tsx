import { FC } from 'react'
import styled from 'styled-components'
import { Work } from 'model'
import Link from "next/link"
// import { WorkImage } from 'components/lv1/WorkImage'
import Constants from 'styles/Constants'

const WorkCardContainer = styled.div`
  background: ${Constants.COLOR.ACTIVE_BACKGROUND};
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  text-align: center;

  a {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  div.imageContainer {
    width: 100%;
    position: relative;
    overflow: hidden;

    ::before {
      content: '';
      display: block;
      padding-top: 45%; /* div.imageContainerの幅の50％ */
    }

    img {
      position: absolute;
      top: 45%;
      transform: translateY(-47.5%);
      width: 100%;
    }
  }

  div.title {
    font-weight: bold;
    padding: 8px 6px;
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
          <div className='imageContainer'>
            <img src={ work.imageURL || '' } alt="アニメ画像"/>
          </div>
          <div className='title'>{ work.title }</div>
        </a>
      </Link>
    </WorkCardContainer>
  )
}
