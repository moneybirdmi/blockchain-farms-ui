import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import CardContent from '../../../components/ui/CardContent'
import CardIcon from '../../../components/ui/CardIcon'
import IconButton from '../../../components/ui/IconButton'
import { AddIcon } from '../../../components/ui/icons'
import Label from '../../../components/ui/Label'
import Value from '../../../components/ui/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { AddSharp } from '@material-ui/icons'
import Bird from '../../../assets/svgs/bird.svg'

interface StakeProps {
  lpContract: Contract;
  pid: number;
  tokenName: string;
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName }) => {
  const [requestedApproval, setRequestedApproval] = useState(false);

  const allowance = useAllowance(lpContract);
  const { onApprove } = useApprove(lpContract);

  const tokenBalance = useTokenBalance(lpContract.options.address);
  const stakedBalance = useStakedBalance(pid);

  const { onStake } = useStake(pid);
  const { onUnstake } = useUnstake(pid);

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />
  );

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
    />
  );

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);

  return (
    // <Card>
    //   <CardContent>
    //     <StyledCardContentInner>
    //       <StyledCardHeader>
    //         <CardIcon>👨🏻‍🍳</CardIcon>
    //         <Value value={getBalanceNumber(stakedBalance)} />
    //         <Label text={`${tokenName} Tokens Staked`} />
    //       </StyledCardHeader>
    //       <StyledCardActions>
    //         {!allowance.toNumber() ? (
    //           <Button
    //             disabled={requestedApproval}
    //             onClick={handleApprove}
    //             text={`Approve ${tokenName}`}
    //           />
    //         ) : (
    //           <>
    //             <Button
    //               disabled={stakedBalance.eq(new BigNumber(0))}
    //               text="Unstake"
    //               onClick={onPresentWithdraw}
    //             />
    //             <StyledActionSpacer />
    //             <IconButton onClick={onPresentDeposit}>
    //               <AddIcon />
    //             </IconButton>
    //           </>
    //         )}
    //       </StyledCardActions>
    //     </StyledCardContentInner>
    //   </CardContent>
    // </Card>
    <>
      <img src={Bird} alt="card-avi" />
      <p className="price">{getBalanceNumber(stakedBalance)}</p>
      <p className="note">
        <span>{tokenName.toUpperCase()}</span> Tokens Staked{' '}
      </p>
      {!allowance.toNumber() ? (
        <button disabled={requestedApproval} onClick={() => handleApprove()}>
          Approve {tokenName.toUpperCase()}
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
      )}
    </>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
