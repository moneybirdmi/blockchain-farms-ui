import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import useAllEarnings from '../../../hooks/useAllEarnings';
import useAllStakedValue from '../../../hooks/useAllStakedValue';
import useFarms from '../../../hooks/useFarms';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useEgg from '../../../hooks/useEgg';
import {
  getEggAddress,
  getEggSupply,
  getMasterChefAddress,
  getMasterChefContract,
  getRewardPerBlock,
} from '../../../egg/utils';
import { getBalanceNumber } from '../../../utils/formatBalance';
import SearchComponent from '../../../components/search';
import WalletButton from '../../../components/walletButton';

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [scale, setScale] = useState(1);

  const allEarnings = useAllEarnings();
  let sumEarning = 0;
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber();
  }

  const [farms] = useFarms();
  const allStakedValue = useAllStakedValue();

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0
    );
  }

  useEffect(() => {
    setStart(end);
    setEnd(sumEarning);
  }, [sumEarning]);

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25);
          setTimeout(() => setScale(1), 600);
        }}
        separator=','
      />
    </span>
  );
};

const Balances = (props: {
  provider: any;
  logoutOfWeb3Modal: any;
  loadWeb3Modal: any;
}) => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [rewardPerBlock, setRewardPerBlock] = useState<BigNumber>();

  const egg = useEgg();
  const eggBalance = useTokenBalance(getEggAddress(egg));
  const masterChefAddress = getMasterChefAddress(egg);
  const masterChefContract = getMasterChefContract(egg);
  const { account, ethereum }: { account: any; ethereum: any } = useWallet();

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getEggSupply(egg, masterChefAddress);
      setTotalSupply(supply);
    }
    if (egg) {
      fetchTotalSupply();
    }
  }, [egg, setTotalSupply]);

  useEffect(() => {
    async function fetchRewardPerBlock() {
      const reward = await getRewardPerBlock(masterChefContract);
      setRewardPerBlock(reward);
    }
    if (egg) {
      fetchRewardPerBlock();
    }
  }, [egg, setRewardPerBlock]);

  return (
    <div className='total-balance'>
      <div className='balance-details'>
        Total USDT Supply:{' '}
        <span style={{ color: '#ce6667' }}>
          {totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
        </span>{' '}
        | Reward Per Block:{' '}
        <span style={{ color: '#ce6667' }}>
          {rewardPerBlock ? getBalanceNumber(rewardPerBlock) : 'Locked'} USDT
        </span>{' '}
        | USDT Balance:{' '}
        <span style={{ color: '#ce6667' }}>
          {!!account ? getBalanceNumber(eggBalance) : 'Locked'}
        </span>
      </div>
      {/* <SearchComponent /> */}
      <WalletButton
        provider={props.provider}
        logoutOfWeb3Modal={props.logoutOfWeb3Modal}
        loadWeb3Modal={props.loadWeb3Modal}
      />
    </div>

    // <TotalBalanceSpan>
    // <>
    //   <div>
    //     Total EGG Supply: <span style={{ color: '#ce6667' }}>{totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}</span>|
    //   </div>
    // & nbsp;
    //   <div>
    //     Reward Per Block: <span style={{ color: '#ce6667' }}>0.5 EGGS</span> |
    //   </div>
    // & nbsp;
    //   <div>
    //     BIRD Balance: <span style={{ color: '#ce6667' }}>{!!account ? getBalanceNumber(eggBalance) : 'Locked'}</span>
    //   </div>
    // </>
    // </TotalBalanceSpan>
  );
};
const TotalBalanceSpan = styled.span`
  position: absolute;
  width: 993px;
  height: 23px;
  left: 346px;
  top: 153px;
  display: flex;
  font-family: brown;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  color: #102a51;
`;
export default Balances;
