import { FC } from 'react'

type Props = {
  work: any // FIXME: type
}

export const WorkCard: FC<Props> = ({ work }: Props) => {
  return (
    <div>
      <a href={ `/works/${work.annictID}` }>
        <img src={ work.imageURL } alt="アニメ画像"/>
        <div>ID: { work.annictID }</div>
        <div>Title: { work.title }</div>
      </a>
    </div>
  )
}
