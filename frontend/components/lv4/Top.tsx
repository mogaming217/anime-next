import { FC } from "react";
import { SearchBar } from "components/lv2/SearchBar";
import styled from "styled-components";
import { useTrendWorks } from "hooks/work/useTrendWorks";
import { WorkList } from "components/lv3";
import { LoadingIndicator } from "components/lv1/LoadingIndicator";

const SearchBarContainer = styled.div`
  text-align: center;
  padding: 36px 0px;
`

export const Top: FC = () => {
  const { loading, works } = useTrendWorks({ count: 10 })

  return (
    <div>
      <SearchBarContainer>
        <SearchBar
          placeholder='アニメのタイトルを入力 例）鬼滅の刃'
        />
      </SearchBarContainer>

      <h2>人気の作品</h2>
      { loading ? (
        <LoadingIndicator />
      ) : (
        <WorkList works={ works } />
      )}
    </div>
  )
}
