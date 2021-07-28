import React, { useEffect } from 'react';
import './index.css';
import Balances from '../Farms/components/Balances';
import Main from '../../components/main';
import { CircularProgress } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import { initWeb3 } from '../../utils/web3Modal';

const OracleAnalytics = (props: {
  web3Obj: any;
  provider: any;
  logoutOfWeb3Modal: any;
  loadWeb3Modal: any;
}) => {
  const { account } = useWallet();
  const [testNetwork, setTestNetwork] = React.useState(0);
  useEffect(() => {
    const fetchTestNetwork = async () => {
      const web3 = await initWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      setTestNetwork(networkId);
    };
    fetchTestNetwork();
  });

  return (
    <div className='oracle-analytics'>
      {/* <Alert severity="warning">
                  Beta testing on Kovan: Contract
                  <Link
                    target="_blank"
                    href={
                      "https://kovan.etherscan.io/address/" + addresses.kovan
                    }
                  >
                    ({addresses.kovan})
                  </Link>{" "}
                </Alert> */}
      <h3>Oracle Analytics</h3>
      <h5>Off-Chain Oracle Analytics and ID</h5>
      <Balances
        provider={props.provider}
        logoutOfWeb3Modal={props.logoutOfWeb3Modal}
        loadWeb3Modal={props.loadWeb3Modal}
      />

      {account && Number(testNetwork) === 42 ? (
        <Main account={account} web3Obj={props.web3Obj} />
      ) : (
        <div className="loading" style={{
              textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'rgb(87, 101, 121)',
        }}>
          <CircularProgress />
          Please use connect wallet button and conect to KOVAN network
        </div>
      )}
    </div>
  );
};

export default OracleAnalytics;
