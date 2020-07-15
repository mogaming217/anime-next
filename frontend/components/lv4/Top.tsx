import { FC } from "react";
import { SearchBar } from "components/lv2/SearchBar";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  text-align: center;
  padding: 36px 16px;
`

export const Top: FC = () => (
  <div>
    <SearchBarContainer>
      <SearchBar
        placeholder='アニメのタイトルを入力 例）鬼滅の刃'
      />
    </SearchBarContainer>
  </div>
)
