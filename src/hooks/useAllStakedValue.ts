import { useCallback, useEffect, useState } from "react";

import { provider } from "web3-core";

import BigNumber from "bignumber.js";

import { useWallet } from "use-wallet";

import { Contract } from "web3-eth-contract";

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from "../egg/utils";

import useBlock from "./useBlock";
import useEgg from "./useEgg";

export interface StakedValue {
  tokenAmount: BigNumber;
  wethAmount: BigNumber;
  totalWethValue: BigNumber;
  tokenPriceInWeth: BigNumber;
  poolWeight: BigNumber;
}

const useAllStakedValue = (account: String = null) => {
  const [balances, setBalance] = useState([] as Array<StakedValue>);
  // const { account }: { account: string; ethereum: provider } = useWallet();
  const egg = useEgg();

  const farms = getFarms(egg);
  const masterChefContract = getMasterChefContract(egg);
  const wethContact = getWethContract(egg);
  const block = useBlock();

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number;
          lpContract: Contract;
          tokenContract: Contract;
        }) =>
          getTotalLPWethValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
            pid
          )
      )
    );

    setBalance(balances);
  }, [masterChefContract, egg]);

  useEffect(() => {
    if (account && masterChefContract && egg) {
      fetchAllStakedValue();
    }
  }, [account, block, masterChefContract, setBalance, egg]);

  return balances;
};

export default useAllStakedValue;
