import { FC } from 'react'
import { SearchBar } from 'components/lv2/SearchBar'
import styled from 'styled-components'
import { useTrendWorks } from 'hooks/work/useTrendWorks'
import { WorkList } from 'components/lv3'
import { LoadingIndicator } from 'components/lv1/LoadingIndicator'
import { Center } from 'components/lv1'

const SearchBarContainer = styled.div`
  text-align: center;
  margin: 36px 0px;
`

const PromotionContainer = styled.div`
  margin: 36px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Top: FC = () => {
  const { loading, works } = useTrendWorks({ count: 10 })
  return (
    <>
      <PromotionContainer>
        <div style={{ marginRight: 16 }}>\</div>
        <Center>
          アニメの続きは原作の何巻から
          <br />
          なのかをさっそく調べてみよう👀
        </Center>
        <div style={{ marginLeft: 16 }}>/</div>
      </PromotionContainer>
      <SearchBarContainer>
        <SearchBar placeholder="アニメのタイトルを入力 例）鬼滅の刃" height={48} />
      </SearchBarContainer>

      <h2>人気の作品</h2>
      {loading ? <LoadingIndicator /> : <WorkList works={works} />}
    </>
  )
}
