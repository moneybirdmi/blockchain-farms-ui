import BigNumber from "bignumber.js";
import React, { useCallback, useMemo, useState } from "react";
import Button from "../../../components/ui/Button";
import Modal, { ModalProps } from "../../../components/ui/Modal";
import ModalActions from "../../../components/ui/ModalActions";
import ModalTitle from "../../../components/ui/ModalTitle";
import TokenInput from "../../../components/ui/TokenInput";
import { getFullDisplayBalance } from "../../../utils/formatBalance";

interface WithdrawModalProps extends ModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  tokenName?: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = "",
}) => {
  const [val, setVal] = useState("");
  const [pendingTx, setPendingTx] = useState(false);

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max);
  }, [max]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value);
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <Modal>
      <ModalTitle text={`Withdraw ${tokenName}`} />
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        {/* <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        /> */}
        <button className="btn" onClick={() => onDismiss()}>
          Cancel
        </button>
        <button
          className="btn"
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true);
            await onConfirm(val);
            setPendingTx(false);
            onDismiss();
          }}
        >
          {pendingTx ? "Pending Confirmation" : "Confirm"}
        </button>
      </ModalActions>
    </Modal>
  );
};

export default WithdrawModal;
