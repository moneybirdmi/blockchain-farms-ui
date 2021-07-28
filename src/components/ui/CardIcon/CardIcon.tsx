import React from "react";
import styled from "styled-components";

interface CardIconProps {
  children?: React.ReactNode;
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>{children}</StyledCardIcon>
);

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  // width:30px;
  // height:30%;
`;
const StyledCardIcon = styled.div`
  display: flex;
  width: 30px;
`;

export default CardIcon;
