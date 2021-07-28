import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import { provider } from 'web3-core';
import useFarm from '../../hooks/useFarm';
import useRedeem from '../../hooks/useRedeem';
import useEgg from '../../hooks/useEgg';
import { getMasterChefContract } from '../../egg/utils';
import { getContract } from '../../utils/erc20';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import Bird from '../../assets/svgs/bird.svg';

const Farm: React.FC = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const { pid, lpToken, lpTokenAddress, earnToken } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const egg = useEgg();
  const { ethereum } = useWallet();

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress);
  }, [ethereum, lpTokenAddress]);

  const { onRedeem } = useRedeem(getMasterChefContract(egg));

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase();
  }, [lpToken]);

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase();
  }, [earnToken]);

  return (
    <>
      {/* <PageHeader
        icon={icon}
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={name}
      /> */}
      {/* <StyledFarm>
        <img src={Logo}></img>
        <BirdFarmSpan>Deposit BIRD-ETH LP Tokens and earn EGGS</BirdFarmSpan>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <Spacer size="lg" />
      </StyledFarm> */}
      <div className="d-flex justify-content-center align-items-center">
          <span className="avatar">
            <img src={Bird} className="img-fluid" />
          </span>
        </div>
      <h3>Bird Farm</h3>
      <h5>Deposit BIRD-ETH LP Tokens and earn EGGS</h5>
      <div className='cards'>
        <div className='farm-card'>
          {/* <img src={USDTIcon} alt="card-avi" />
          <p className="price">{getBalanceNumber(earnings)}</p>
          <p className="note"> USDT Earned </p>
          <button
            disabled={!earnings.toNumber() || pendingTx}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
          >
            {pendingTx ? (
              <span>
                Collecting Reward<CircularProgress className="loading" />
              </span>
            ) : (
              'Harvest'
            )}
          </button> */}
          <Harvest pid={pid} />
        </div>

        <div className='farm-card'>
          {/* <img src={Bird} alt="card-avi" />
          <p className="price">{getBalanceNumber(stakedBalance)}</p>
          <p className="note">
            <span>{lpToken.toUpperCase()}</span> Tokens Staked{' '}
          </p>
          {!allowance.toNumber() ? (
            <button
              disabled={requestedApproval}
              onClick={() => handleApprove()}
            >
              Approve {lpTokenName.toUpperCase()}
            </button>
          ) : (
            <div className="unstake">
              <button
                disabled={stakedBalance.eq(new BigNumber(0))}
                onClick={() => onPresentWithdraw()}
              >
                Unstake
              </button>
              <p onClick={onPresentDeposit}>
                <AddSharp />
              </p>
            </div>
          )} */}
          <Stake
            lpContract={lpContract}
            pid={pid}
            tokenName={lpToken.toUpperCase()}
          />
        </div>
      </div>
    </>
  );
};

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const BirdFarmSpan = styled.span`
  font-family: brown;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #102a51;
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
  margin-top: 40px;
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export default Farm;
