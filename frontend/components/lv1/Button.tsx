import styled from "styled-components";
import Constants from "styles/Constants";

export const Button = styled.button`
  padding: 12px 24px;
  font-weight: ${Constants.FONT_WEIGHT.BOLD};
  font-size: ${Constants.FONT.MEDIUM};
  background-color: ${Constants.COLOR.PRIMARY};
  color: white;
  border-radius: ${Constants.CORNER_RADIUS.DEFAULT}px;
  border-width: 0px;
`
