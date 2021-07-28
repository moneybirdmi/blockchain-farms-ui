import React from "react";
import styled from "styled-components";

interface ModalTitleProps {
  text?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>{text}</StyledModalTitle>
);

const StyledModalTitle = styled.div`
  align-items: center;
  padding: 35px 0 17px;;
  color: rgba(16, 42, 81, 0.82);
  display: flex;
  font-size: 19px;
  font-weight: 400;
  height: ${props => props.theme.topBarSize}px;
  justify-content: center;
`;

export default ModalTitle;
