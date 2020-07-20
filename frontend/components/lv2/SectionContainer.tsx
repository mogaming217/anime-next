import styled from "styled-components";
import { FC } from "react";

type Props = {
  withMargin?: boolean
}

const defaultProps: Props = {
  withMargin: true
}

const _SectionContainer = styled.div<Props>(p => `
  margin: ${p.withMargin ? '32px' : '0px' } 0px;
`)

export const SectionContainer: FC<Props> = ({ withMargin, children } = defaultProps) => {
  return (
    <_SectionContainer withMargin={ withMargin }>
      {children}
    </_SectionContainer>
  )
}
