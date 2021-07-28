import React from "react";
import styled from "styled-components";

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background: #FFFFFF;
  border: 0.5px solid #e0e7ee78;
  box-sizing: border-box;
  border-radius: 9px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex: 1;
`;

export default Card;
