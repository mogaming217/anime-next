import { createGlobalStyle } from 'styled-components'
import { resetCss } from 'styles/Reset'
import Constants from 'styles/Constants'

export const GlobalStyle = createGlobalStyle`
  ${resetCss}

  body {
    color: ${Constants.COLOR.LABEL};
    background-color: ${Constants.COLOR.SYSTEM_BACKGROUND};
    font-size: ${Constants.FONT.BASE}px;
    font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "ヒラギノ角ゴシック", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  }

  a {
    color: ${Constants.COLOR.LABEL};
    text-decoration: none;
  }
`
