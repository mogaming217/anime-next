import styled from 'styled-components'
import { StyleConst } from 'styles/const'

export const TextInput = styled.input`
  border-radius: ${StyleConst.CORNER_RADIUS.DEFAULT}px;
  border: solid 1px ${StyleConst.COLOR.TEXT_INPUT_BORDER};
  outline-color: ${StyleConst.COLOR.TEXT_INPUT_FOCUS_BORDER};
  padding: 6px 8px;
  width: 100%;
  font-size: 16px;
  -webkit-appearance: none;
`
