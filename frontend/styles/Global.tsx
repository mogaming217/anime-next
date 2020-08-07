import { createGlobalStyle } from 'styled-components'
import { resetCss } from 'styles/Reset'
import Constants from 'styles/StyleConst'

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

  h2 {
    font-size: ${Constants.FONT.XLARGE}px;
    font-weight: ${Constants.FONT_WEIGHT.BOLD};
    padding: 16px 0px;
  }

  input {
    color: ${Constants.COLOR.LABEL};
  }

  input[type=radio] {
    margin-right: 3px;
  }

  input::placeholder {
    color: ${Constants.COLOR.PLACEHOLDER};
  }

  input::-ms-input-placeholder {
    color: ${Constants.COLOR.PLACEHOLDER};
  }

  input::-webkit-input-placeholder {
     color: ${Constants.COLOR.PLACEHOLDER};
  }
`
