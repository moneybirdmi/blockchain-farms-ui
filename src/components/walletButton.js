import React from "react";
import { useWallet } from "use-wallet";
import useModal from "../hooks/useModal";
import WalletProviderModal from "./ui/WalletProviderModal";

const WalletButton = (props) => {
  const { account } = useWallet();
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />);

  return (
    <div>
      <button
        className="connect-wallet"
        onClick={
          account
            ? () => props.logoutOfWeb3Modal()
            : () => onPresentWalletProviderModal()
        }
      >
        {account ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletButton;
