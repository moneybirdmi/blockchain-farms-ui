import React from "react";
import styled from "styled-components";

const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
);

const StyledCardContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  // padding: 10px 13px;
`

export default CardContent;
