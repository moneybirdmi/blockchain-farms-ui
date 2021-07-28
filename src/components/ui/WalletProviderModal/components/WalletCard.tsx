import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'
import WalletArrow from '../../../../../src/assets/svgs/card-arrow-neutral.svg'

interface WalletCardProps {
  icon: React.ReactNode;
  onConnect: () => void;
  title: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <CardContent>
      <button className="wallet-type-btn" onClick={() => onConnect()}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CardIcon>{icon}</CardIcon>
          <CardTitle text={title} />
        </div>
        {/* <Button onClick={onConnect} text="Connect" /> */}
        <button className="btn arrow-btn">
          <img src={WalletArrow} alt="arrow" />
        </button>
      </button>
    </CardContent>
  </Card>
);

export default WalletCard;
