import styled from "styled-components";
import Constants from "styles/Constants";

export const TextInput = styled.input`
  border-radius: 4px;
  border: solid 1px ${Constants.COLOR.TEXT_INPUT_BORDER};
  outline-color: ${Constants.COLOR.TEXT_INPUT_FOCUS_BORDER};
  padding: 6px 8px;
  width: 100%;
`