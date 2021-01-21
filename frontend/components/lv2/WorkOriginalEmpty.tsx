import { FC } from 'react'
import styled from 'styled-components'
import { Button } from 'components/lv1'
import { Work } from 'model'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

type Props = {
  work: Work
}

export const WorkOriginalEmpty: FC<Props> = (props: Props) => {
  return (
    <Container>
      まだ原作情報が登録されていません😫
      <br />
      アニメの続きは原作の何巻からなのかを調べて登録してみませんか…？
      <Button style={{ marginTop: 16 }} as="a" href={`https://google.co.jp/search?q=${props.work.title}+アニメ+続き+何巻`} target="_blank">
        原作情報を調べてあげる
      </Button>
    </Container>
  )
}
