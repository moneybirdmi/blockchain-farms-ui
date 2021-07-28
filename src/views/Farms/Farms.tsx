import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import chef from '../../assets/img/chef.png';

import Button from '../../components/ui/Button';
import Page from '../../components/ui/Page';
import PageHeader from '../../components/ui/PageHeader';
import WalletProviderModal from '../../components/ui/WalletProviderModal';

import useModal from '../../hooks/useModal';

import Farm from '../Farm';

import FarmCards from './components/FarmCards';
import Balances from './components/Balances';
import Landing from '../Landing/Landing';
import './index.css';

const Farms = (props: {
  provider: any;
  logoutOfWeb3Modal: any;
  loadWeb3Modal: any;
  account: String;
}) => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  console.log({ account, props: props.account })
  return (
    <>
      {!!account ? (
        <>
          {' '}
          <div className='farms'>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={chef} height='120' />}
                subtitle='Earn USDT tokens by staking Uniswap V2 LP Tokens.'
                title='Select Your Favorite Dishes'
              />
              <Balances
                provider={props.provider}
                logoutOfWeb3Modal={props.logoutOfWeb3Modal}
                loadWeb3Modal={props.loadWeb3Modal}
              />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </div>
        </>
      ) : (
        <Landing
          provider={props.provider}
          onPresentWalletProviderModal={onPresentWalletProviderModal}
        />
        // <Landing provider={props.provider} logoutOfWeb3Modal={props.logoutOfWeb3Modal} loadWeb3Modal={props.loadWeb3Modal} />
      )}
    </>
  );
};

export default Farms;
