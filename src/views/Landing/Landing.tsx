import React from "react";
import { Switch } from "react-router-dom";
import Page from "../../components/ui/Page";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../../components/ui/PageHeader";
import "./index.css";
import Bird from "../../assets/svgs/bird.svg";
import metamaskLogo from "../../assets/svgs/metamask-icon.svg";
import walletConnectLogo from "../../assets/img/wallet-connect.svg";
import { ArrowForward } from "@material-ui/icons";
import { useWallet } from "use-wallet";
import useModal from "../../hooks/useModal";
import WalletProviderModal from "../../components/ui/WalletProviderModal";

const Landing = (props: {
  provider: any;
  onPresentWalletProviderModal: any;
}) => {
  const { account, connect } = useWallet();

  return (
    <div className="landing">
      <div className="heading-text">
        <div className="text">
          <h2>Home</h2>
          <span>Get Started</span>
        </div>
      </div>

      <div className="connector-card">
        <h4>Get started by connecting your wallet</h4>
        <div className="wallet-list-card">
          <p className="avatar">
            <img src={Bird} className="img-fluid" />
          </p>
          {account ? (
            <>
              <button className="network-option disconnect">
                <p className="networkname">
                  <span>Disconnect Wallet</span>
                </p>
                <ArrowForward />
              </button>
            </>
          ) : (
            <>
              <button
                className="network-option"
                onClick={() => props.onPresentWalletProviderModal()}
              >
                <p className="networkname">
                  <span>Connect Wallet</span>
                </p>
                <ArrowForward />
              </button>
            </>
          )}

          <div className="cardfooter">
            <p>
              By connecting i accept Bird Money{" "}
              <span className="terms">Terms of service</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
