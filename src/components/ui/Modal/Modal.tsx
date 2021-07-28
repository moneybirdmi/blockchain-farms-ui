import React from "react";
import styled, { keyframes } from "styled-components";

export interface ModalProps {
  onDismiss?: () => void;
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>{children}</StyledModal>
    </StyledResponsiveWrapper>
  );
};

export const ConnectModal: React.FC = ({ children }) => {
  return (
    <ConnectStyledResponsiveWrapper>
      <StyledModal>{children}</StyledModal>
    </ConnectStyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 550px;
  margin-left: 40%;
  margin-right: auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`;

const ConnectStyledResponsiveWrapper = styled(StyledResponsiveWrapper)`
  max-width: 400px;
  margin-left: 47%;
  margin-right: auto;
`

const StyledModal = styled.div`
  padding: 0 20px;
  // background: ${(props) => props.theme.color.grey[200]};
  background: white;
  border: none;
  border-radius: 12px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
`;

const StyledModalContent = styled.div``;

export default Modal;
