#### if you want to run on local host:

1.  git clone https://github.com/bird-money/bird-frontend-react
2.  cd bird-frontend-react
3.  yarn
4.  git checkout get-active-node-from-smart-contract
5.  yarn start

#### on VS Code press Ctrl+P to find file constants.js or addresses.js to add pools or change lpaddress

for example example you can add a pool:
{
pid: 1, // you should create a pool on masterchef contract thats id will be 1
lpAddresses: {
3: '0x09aA896D52e540F13227d717Efd21C04a52921aC',
42: 'Put LP address here',
},
tokenAddresses: {
3: '0x56704aA00Fa292A8DC713aa165306359299c92F8',
42: '0x3Da9E82d842b6343e1b6b452C5bbBa8B994b1D7C',
},
name: 'Aviary',
symbol: 'BIRD-ETH UNI-V2 LP',
tokenSymbol: 'BIRD',
icon: '⧫',
},

#### just for info: BIRD STAKING, ORACLE contracts addresses on kovan are:

MasterChef.address: 0x26eAd6Ef963D2F87e0201d3F25a9394fe41fec84

LP Token MockERC20.address: 0xC64Bf0079856333FfBE39546Bc7524e6b19d20A7

USDT Token: 0x3Da9E82d842b6343e1b6b452C5bbBa8B994b1D7C

BirdOracle: 0xd666840ecd7c643f7bf441e6cbbd0bc91588737a

MasterChef https://kovan.etherscan.io/address/0x26eAd6Ef963D2F87e0201d3F25a9394fe41fec84#contracts

LP MockERC20 https://kovan.etherscan.io/address/0xC64Bf0079856333FfBE39546Bc7524e6b19d20A7#contracts

BirdOracle: https://kovan.etherscan.io/address/0xd666840ecd7c643f7bf441e6cbbd0bc91588737a#code
