import { NextPage } from "next";
import { Const } from "lib/const";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import StyleConst from "styles/StyleConst";
import { FC } from "react";

const Container = styled.div`
  padding: 0px 0px 32px;
`

const SectionTitle = styled.div`
  font-weight: ${StyleConst.FONT_WEIGHT.BOLD};
  font-size: ${StyleConst.FONT.MEDIUM}px;
  margin: 32px 0px 16px;
`

const Body = styled.div`
  line-height: 1.8;
`

const ATag = styled.a`
  text-decoration: underline;
`

const BlankA: FC<{ href: string }> = ({ href, children }) => {
  return <ATag href={ href } target='blank'>{children}</ATag>
}

const AboutPage: NextPage = () => {
  return (
    <Container>
      <NextSeo
        title={'このサービスについて'}
      />

      <SectionTitle>{Const.SERVICE_NAME}について</SectionTitle>
      <Body>
        アニメやマンガなどを愛してやまない<BlankA href='https://twitter.com/_mogaming'>管理人のmoga</BlankA>が常々感じていた「このアニメの続きは一体何巻から読めるんだ！？」という不満をほんの少し和らげられたらいいなと思って開発されたサービスです。
        <BlankA href='https://annict.jp/'>Annict様</BlankA>のご厚意によりご提供いただいたアニメのデータ、管理人や利用者の皆様が入力した原作情報により支えられています。このサービスによって、少しでも物語を創り出す方々に貢献できれば嬉しいです。
      </Body>

      <SectionTitle>収益について</SectionTitle>
      <Body>
        このサービスによって得られれた収益はすべて、サービス運用費と原作購入費にあてられます。
      </Body>

      <SectionTitle>Amazonアソシエイトについて</SectionTitle>
      <Body>
        {Const.SERVICE_NAME}は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
      </Body>
    </Container>
  )
}

export default AboutPage
