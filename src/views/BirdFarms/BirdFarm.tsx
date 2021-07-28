import React from 'react';
import PageHeader from '../../components/ui/PageHeader';
import chef from '../../assets/img/chef.png';
import './index.css';
import '../Farms/index.css';
import WalletButton from '../../components/walletButton';
import { CircularProgress } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import { Route, useRouteMatch } from 'react-router-dom';
import Balances from '../Farms/components/Balances';
import FarmCards from '../Farms/components/FarmCards';
import Farm from '../Farm';

const BirdFarmCards = (props: {
  provider: any;
  logoutOfWeb3Modal: any;
  loadWeb3Modal: any;
}) => {
  const { path } = useRouteMatch();

  const { account } = useWallet();

  return (
    <div className='bird-farm-component farms'>
      <div className='header'>
        <Route exact path={path}>
          <PageHeader
            icon={<img src={chef} height='120' />}
            subtitle=''
            title=''
          />

          {/* <SearchComponent /> */}
        </Route>
        <WalletButton
          logoutOfWeb3Modal={props.logoutOfWeb3Modal}
          provider={props.provider}
          loadWeb3Modal={props.loadWeb3Modal}
        />
      </div>

      {account ? (
        <>
          <Route exact path={path}>
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
        </>
      ) : (
        <div className=''>
          <CircularProgress />
          <h5
            style={{
                  marginTop: '1rem',
    fontWeight: 400,
    color: 'rgb(87, 101, 121)',
    fontSize: '16px',
            }}
          >
            Please use connect wallet button to view this page
          </h5>
        </div>
      )}
    </div>
  );
};

export default BirdFarmCards;
