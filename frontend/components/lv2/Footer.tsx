import { FC } from "react";
import styled from "styled-components";
import Link from 'next/link'
import Constants from "styles/Constants";

const _Footer = styled.footer`
  padding: 16px 0px;
  font-size: ${Constants.FONT.SMALL}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CopyRight = styled.div`
  font-size: 12px;
`

const FlexRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  margin: 16px;
`

export const Footer: FC = () => {
  return (
    <_Footer>
      <FlexRowContainer>
        <Content>
          <Link href='/terms'><a>利用規約</a></Link>
        </Content>
        <Content>
          <Link href='/privacy_policy'><a>プライバシーポリシー</a></Link>
        </Content>
      </FlexRowContainer>
      <CopyRight>© アニオリ</CopyRight>
    </_Footer>
  )
}
