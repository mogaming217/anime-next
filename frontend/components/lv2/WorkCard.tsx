import { FC } from 'react'
import styled from 'styled-components'
import { Work } from 'model'
import Link from "next/link"
import { Image } from 'components/lv1'
import Constants from 'styles/Constants'

const WorkCardContainer = styled.div`
  background: ${Constants.COLOR.ACTIVE_BACKGROUND};
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  text-align: center;
  box-shadow: ${Constants.SHADOW.DEFAULT};

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

    div.cardImage {
      position: absolute;
      top: 45%;
      transform: translateY(-47.5%);
      width: 100%;
    }
  }

  div.title {
    font-weight: bold;
    font-size: ${Constants.FONT.MEDIUM}px;
    padding: 14px 6px;
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
            <div className='cardImage'>
              <Image src={ work.imageURL } alt="アニメ画像" width={ '100%' }/>
            </div>
          </div>
          <div className='title'>{ work.title }</div>
        </a>
      </Link>
    </WorkCardContainer>
  )
}
