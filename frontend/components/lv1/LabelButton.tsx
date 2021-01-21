import styled from 'styled-components'
import { FC } from 'react'
import { StyleConst } from 'styles/const'

const _Button = styled.button`
  color: ${StyleConst.COLOR.PRIMARY};
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
`

type Props = {
  label: string
  disabled?: boolean
  onClick?: () => void
}

export const LabelButton: FC<Props> = props => {
  return (
    <_Button disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </_Button>
  )
}
