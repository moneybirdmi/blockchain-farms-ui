import React, { useEffect } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";

import metamaskLogo from "../../../assets/img/metamask-fox.svg";
import walletConnectLogo from "../../../assets/img/wallet-connect.svg";

import Button from '../Button'
import { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

import WalletCard from './components/WalletCard'
import { ConnectModal } from '../Modal/Modal'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      onDismiss();
    }
  }, [account, onDismiss]);

  return (
    <ConnectModal>
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={metamaskLogo} style={{ width: '100%' }} />}
              onConnect={() => connect('injected')}
              title="Metamask"
            />
          </StyledWalletCard>
          <StyledWalletCard>
            <WalletCard
              icon={<img src={walletConnectLogo} style={{ width: '100%' }} />}
              onConnect={() => connect('walletconnect')}
              title="WalletConnect ---"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>
      <ModalActions>
        {/* <Button text="Cancel" variant="default" onClick={onDismiss} /> */}
        <button className="btn btn-dismiss" onClick={() => onDismiss()}>
          Cancel
        </button>
      </ModalActions>
    </ConnectModal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: grid;
  gap: 20px 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex-wrap: none;
  }
`;
const ButtonSpan = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;
const StyledWalletCard = styled.div`
  flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`;

export default WalletProviderModal;
