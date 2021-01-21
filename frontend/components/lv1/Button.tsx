import styled from 'styled-components'
import { StyleConst } from 'styles/const'

export const Button = styled.button`
  padding: 12px 24px;
  font-weight: ${StyleConst.FONT_WEIGHT.BOLD};
  font-size: ${StyleConst.FONT.MEDIUM};
  background-color: ${StyleConst.COLOR.PRIMARY};
  color: white;
  border-radius: ${StyleConst.CORNER_RADIUS.DEFAULT}px;
  border-width: 0px;
`
