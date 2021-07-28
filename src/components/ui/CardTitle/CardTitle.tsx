import React from "react";
import styled from "styled-components";

interface CardTitleProps {
  text?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
);

const StyledCardTitle = styled.div`
    color: #495F7F;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    margin-left: 10px;
`

export default CardTitle;
